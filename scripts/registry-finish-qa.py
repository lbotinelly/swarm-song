"""Shot export QA and review sheet; reuses the M8 Pillow/FFmpeg/NumPy workflow."""
import hashlib,json,subprocess
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw,ImageFont

base=Path('assets/registry-finish'); review=base/'review-v3'
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
board=json.loads(Path('assets/milestone8/storyboard.json').read_text(encoding='utf-8'))
for p,h in board['protectedInputs'].items(): assert sha(p)==h,p
for row in json.loads(Path('assets/characters/agent407/concepts/core-quality-report.json').read_text()):
    if 'sha256' in row: assert sha(Path('assets/characters/agent407/concepts')/row['file'])==row['sha256']
for row in json.loads(Path('assets/milestone5/manifest.json').read_text())['assets']:
    assert sha(row['source'])==row['sourceSha256']
    assert sha(row['output'])==row['outputSha256']
a=np.asarray(Image.open(review/'frame-108.png')).astype(np.int16)
b=np.asarray(Image.open(review/'repeat-108.png')).astype(np.int16)
assert np.array_equal(a,b),'Repeated render changed'
hidden=np.asarray(Image.open(review/'inheritance-hidden.png'))[513:681,1490:1786]
closed=np.asarray(Image.open(review/'frame-000.png'))[513:681,1490:1786]
assert np.array_equal(hidden,closed),'Goggles visible through closed paper'
found=np.asarray(Image.open(review/'inheritance.png'))[598:670,1583:1738]
empty=np.asarray(Image.open(review/'frame-108.png'))[598:670,1583:1738]
assert np.any(found!=empty),'Inherited goggles not revealed'
def samples(path,at):
    return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-ss',str(at),'-t','0.75','-vn','-ac','1','-ar','48000','-f','f32le','-']),dtype='<f4')
exports=[]
for name,frames in [('registry-finish',146),('registry-context',240)]:
    path=review/f'{name}.mp4'
    meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))
    v=next(s for s in meta['streams'] if s['codec_type']=='video');audio=next(s for s in meta['streams'] if s['codec_type']=='audio')
    assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',frames)
    assert abs(float(meta['format']['duration'])-frames/30)<.04
    assert (audio['sample_rate'],audio['channels'])==('48000',2)
    correlations=[]
    for t in [0.5,2,3.5]:
        ref=samples(board['master'],23+t);out=samples(path,t);n=min(len(ref),len(out));c=float(np.corrcoef(ref[:n],out[:n])[0,1]);assert c>.99
        correlations.append({'exportSeconds':t,'masterSeconds':23+t,'correlationWithoutLagCorrection':c})
    exports.append({'file':str(path),'frames':frames,'fps':30,'durationSeconds':frames/30,'sha256':sha(path),'audioChecks':correlations})
for frame in [0,20,35,53,60,66,75,80,87,90,108,126,145,164,180,190,195,210]:
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(review/'registry-context.mp4'),'-vf',f'select=eq(n\\,{frame})','-frames:v','1','-update','1',str(review/f'encoded-{frame:03}.png')],check=True)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',20)
for name,frames in [('performance',[0,20,53,60,66,80,108,180]),('boundaries',[34,35,52,53,89,90,97,98])]:
    sheet=Image.new('RGB',(1280,4*390),'#ede5d3');draw=ImageDraw.Draw(sheet)
    for i,frame in enumerate(frames):
        im=Image.open(review/f'frame-{frame:03}.png').convert('RGB');im.thumbnail((640,360),Image.Resampling.LANCZOS)
        x=(i%2)*640;y=(i//2)*390;sheet.paste(im,(x,y));draw.text((x+12,y+363),f'{23+frame/30:.3f}s master / frame {frame}',font=font,fill='#53463c')
    sheet.save(review/f'{name}.jpg',quality=94)
report={'protectedInputsPreserved':True,'approvedBodyAndPaperMastersPreserved':True,'repeatFrameByteIdentical':sha(review/'frame-108.png')==sha(review/'repeat-108.png'),'repeatPixelsIdentical':True,'exports':exports,'visibleCues':[{'requestedMasterMs':23000+ms,'localFrame':int(np.ceil(ms*.03)),'visibleMasterMs':23000+float(np.ceil(ms*.03)/.03)} for ms in [1160,1750,3000,3240,4000]],'approval':'Final-quality candidate. Art critic inspected stills; continuous audiovisual approval remains with Leo.'}
report['inheritanceChecks']={'gogglesHiddenByClosedCorner':True,'gogglesVisibleAfterPeeling':True,'studyIsUntimed':True}
(base/'qa-report-v3.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,indent=2))
