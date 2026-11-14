"""M8 export checks, adapted from song-qa.py. Not a listening or art approval."""
import hashlib,json,subprocess
from pathlib import Path
import numpy as np
from PIL import Image

base=Path('assets/milestone10');review=base/'review-v2'
b=json.loads(Path('assets/milestone8/storyboard.json').read_text(encoding='utf-8'))
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
for p,h in json.loads((base/'preserved-inputs.json').read_text()).items():assert sha(p)==h,p
castle=json.loads(Path('assets/milestone8/castle-asset.json').read_text())
assert sha(castle['master'])==castle['sha256']==sha(Path('public')/castle['src'])
assert Image.open(castle['master']).mode=='RGBA'
for row in json.loads(Path('assets/characters/agent407/concepts/core-quality-report.json').read_text()):
    if 'sha256' in row:assert sha(Path('assets/characters/agent407/concepts')/row['file'])==row['sha256']
repeat_a=np.asarray(Image.open(review/'beat-96100.png').convert('RGB')).astype(np.int16)
repeat_b=np.asarray(Image.open(review/'repeat-96100.png').convert('RGB')).astype(np.int16)
repeat_delta=np.abs(repeat_a-repeat_b)
repeat_rmse=float(np.sqrt(np.mean(repeat_delta.astype(float)**2)))
assert repeat_delta.max()<=3 and repeat_rmse<.1, 'Repeat-frame visual state changed'
repeat_evidence={'hashA':sha(review/'beat-96100.png'),'hashB':sha(review/'repeat-96100.png'),'byteIdentical':sha(review/'beat-96100.png')==sha(review/'repeat-96100.png'),'maximumChannelDelta':int(repeat_delta.max()),'changedPixels':int(np.any(repeat_delta,axis=2).sum()),'rmseOn255Scale':repeat_rmse,'acceptance':'max channel delta <=3/255 and RMSE <0.1/255; no claim of byte-identical raster output'}
def probe(p):return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
def samples(p,t,duration=1):return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-ss',str(t),'-t',str(duration),'-vn','-ac','1','-ar','48000','-f','f32le','-']),dtype='<f4')
exports=[]
for name,duration,frames,offset,checks in [('full',262.8,7884,0,[13,55,128,208,247]),('middle',29,870,83,[1,9,15,25]),('goggles-invention',13,390,42,[1,6,11]),('goodbye-blackout',32.8,984,120.2,[2,10,24]),('awakening-inheritance',55,1650,153,[1,25,44]),('reunion',32,960,208,[2,15,29])]:
    p=review/f'{name}.mp4';meta=probe(p);v=next(s for s in meta['streams'] if s['codec_type']=='video');a=next(s for s in meta['streams'] if s['codec_type']=='audio')
    assert (v['width'],v['height'],v['r_frame_rate'])==(1920,1080,'30/1');assert int(v['nb_frames'])==frames
    assert abs(float(meta['format']['duration'])-duration)<.04
    assert (int(a['sample_rate']),a['channels'])==(48000,2)
    correlations=[]
    for t in checks:
        ref=samples(b['master'],t+offset);out=samples(p,t);n=min(len(ref),len(out));corr=float(np.corrcoef(ref[:n],out[:n])[0,1]);assert corr>.98,(name,t,corr)
        correlations.append({'masterSeconds':t+offset,'exportSeconds':t,'correlationWithoutLagCorrection':corr})
    exports.append({'file':str(p),'duration':duration,'frames':frames,'fps':30,'audio':'AAC 320k stereo 48kHz; original master, no remix/time warp','audioChecks':correlations,'bytes':p.stat().st_size,'sha256':sha(p)})
decoded_count=int(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-count_frames','-show_entries','stream=nb_read_frames','-of','csv=p=0',str(review/'full.mp4')]).decode().strip().strip(','));assert decoded_count==7884
full_ref=samples(b['master'],0,262.8);full_out=samples(review/'full.mp4',0,262.8);n=min(len(full_ref),len(full_out));whole_corr=float(np.corrcoef(full_ref[:n],full_out[:n])[0,1]);assert whole_corr>.98
black=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-ss','142','-i',str(review/'full.mp4'),'-t','2','-vf','scale=160:90','-pix_fmt','gray','-f','rawvideo','-']),dtype=np.uint8)
assert len(black)==60*160*90 and black.max()<=1 and black.mean()<.02
assert np.asarray(Image.open(review/'beat-143000.png').convert('RGB')).max()==0
for ms in [24750,43300,57500,87000,89900,96100,110300,128500,141500,143000,153500,164000,197000,210000,259000]:
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(ms/1000),'-i',str(review/'full.mp4'),'-frames:v','1','-update','1',str(review/f'encoded-{ms}.jpg')],check=True)
events=[24160,24750,26000,26240,44900,90700,91400,92000,94500,95860,96820,104940,106860,107660,108380,127300,128500,142000,144000,196000,197600,208000,210000,247200,255000]
report={'decodedFullFrameCount':decoded_count,'wholeMasterAudioCorrelationWithoutLagCorrection':whole_corr,'protectedInputsPreserved':True,'approvedBodyMastersPreserved':True,'repeatFrameComparison':repeat_evidence,'blackout':{'startMs':142000,'endMs':144000,'decodedBlackFrames':60,'maximumGrayValue':int(black.max()),'meanGrayValue':float(black.mean()),'sourceFrameExactlyBlack':True,'note':'Lossless still is all zero; H.264 export permits <=1/255 residual with mean <0.02/255.'},'exports':exports,'frameQuantization':[{'requestedMs':ms,'visibleFrame':int(np.ceil(ms*.03)),'visibleMs':float(np.ceil(ms*.03)/.03)} for ms in events],'continuousAudiovisualReview':'Not performed by automated QA. Leo approval pending.','reviewScope':'Static frames, source, exact coverage, preserved hashes, decoded audio correlation, technical video inspection.'}



# Small temporal strips from the encoded film: motion evidence, not audiovisual approval.
from PIL import ImageDraw
for name,start,end in [('craft',42,45.2),('flag',108.4,111.6),('set-down',127.2,128.8),('inherit',195.8,197.8),('blackout',141.5,144.5)]:
    times=np.linspace(start,end,12);sheet=Image.new('RGB',(1280,3*205),'#eee4ce');draw=ImageDraw.Draw(sheet)
    for i,t in enumerate(times):
        raw=subprocess.check_output(['ffmpeg','-v','error','-ss',str(float(t)),'-i',str(review/'full.mp4'),'-frames:v','1','-vf','scale=320:180','-pix_fmt','rgb24','-f','rawvideo','-'])
        im=Image.frombytes('RGB',(320,180),raw);x=i%4*320;y=i//4*205;sheet.paste(im,(x,y));draw.text((x+6,y+184),f'{t:.3f}s',fill='black')
    sheet.save(review/f'motion-{name}.jpg',quality=90)
# Every local gallery target exists.
import re
page=(review/'index.html').read_text(encoding='utf8')
for link in re.findall(r'(?:href|src)="([^"#]+)',page):
    if '://' not in link and link!='../qa-report.json':assert (review/link.split('#')[0]).exists(),link
print('Encoded temporal strips and gallery links verified')

report['motionStrips']={'count':5,'samplesPerStrip':12,'source':'final encoded full film','scope':'temporal still samples, not audiovisual approval'}
report['galleryLinksVerified']=True
(base/'qa-report.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'result':'PASS','exports':len(exports),'wholeMasterAudioCorrelation':whole_corr,'blackFrames':60,'galleryLinksVerified':True},indent=2))
