import json,hashlib,subprocess
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1];base=ROOT/'assets/milestone7';review=base/'review-v3'
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
j=read(base/'timeline.json');master=ROOT/j['master'];movie=review/'swarm-song-v3.mp4'
assert sha(master)==j['masterSha256']
for row in read(ROOT/'assets/characters/agent407/concepts/core-quality-report.json'):
 if 'sha256' in row:assert sha(ROOT/'assets/characters/agent407/concepts'/row['file'])==row['sha256']
assert sha(review/'song-55000.png')==sha(review/'song-55000-repeat.png')
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(movie)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',7884)
assert abs(float(probe['format']['duration'])-262.8)<.04
assert int(a['sample_rate'])==48000 and a['channels']==2
comparisons=[]
for name in ['verse','registry','chorus','goodbye']:
 for mode in ['word','read','slap']:
  cp=base/'review'/f'{name}-{mode}.mp4'
  info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(cp)]))
  assert abs(float(info['format']['duration'])-8)<.04
  assert any(x['codec_type']=='audio' for x in info['streams'])
  comparisons.append(dict(file=str(cp.relative_to(base)).replace('\\','/'),duration=info['format']['duration'],audioPresent=True))
rows=[]
for t in [13,55,128,208,247]:
 def samples(p):return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-ss',str(t),'-t','1','-vn','-ac','1','-ar','48000','-f','f32le','-']),dtype='<f4')
 ref=samples(master);out=samples(movie);n=min(len(ref),len(out));corr=float(np.corrcoef(ref[:n],out[:n])[0,1]);assert corr>.98,(t,corr)
 rows.append(dict(masterStartSeconds=t,correlation=corr,note='AAC decoded signal agrees without lag correction; lossy audio is not PCM-identical.'))
frames=[14000,55000,92500,128500,154500,208500,244500,248000]
sheet=Image.new('RGB',(1280,4*390),'#eee4ce');draw=ImageDraw.Draw(sheet)
for i,ms in enumerate(frames):
 out=review/f'compressed-{ms}.png'
 subprocess.run(['ffmpeg','-v','error','-y','-ss',str(ms/1000),'-i',str(movie),'-frames:v','1','-update','1',str(out)],check=True)
 im=Image.open(out).convert('RGB');im.thumbnail((640,360));x=(i%2)*640;y=(i//2)*390;sheet.paste(im,(x,y));draw.text((x+12,y+365),f'{ms/1000:.1f}s | H.264 at 640px',fill='#3e362c')
sheet.save(review/'compressed-contact-sheet.jpg',quality=92)
clippedPerformance=[dict(phrase=p['id'],word=w['id'],onsetMs=w['startMs'],presentationClearMs=p['presentation']['endMs']+j['presentationDefaults']['exitMs']) for p in j['phrases'] for w in p['words'] if w['startMs']>=p['presentation']['endMs']+j['presentationDefaults']['exitMs']]
assert not clippedPerformance,clippedPerformance
result=dict(masterHashPreserved=True,approvedCharacterMastersPreserved=True,comparisons=comparisons,repeatFrameHash=sha(review/'song-55000.png'),video=dict(width=v['width'],height=v['height'],fps=v['r_frame_rate'],frames=v['nb_frames'],duration=probe['format']['duration']),audio=dict(codec=a['codec_name'],sampleRate=a['sample_rate'],channels=a['channels'],checks=rows),editorialLines=len(set(p['sourceLine'] for p in j['phrases'])),phrases=len(j['phrases']),words=sum(len(p['words']) for p in j['phrases']),unresolvedWords=sum(w['status']=='unresolved' for p in j['phrases'] for w in p['words']),performanceOnsetsAfterCaptionClear=clippedPerformance,continuousAudiovisualReview='unverified',limitations=['Acoustic coverage differs from verified editorial text coverage; see ALIGNMENT.md.','Compression contact sheet is static evidence, not continuous playback review.'])
(base/'qa-report-v3.json').write_text(json.dumps(result,indent=2)+'\n')
manifest={str(p.relative_to(base)).replace('\\','/'):dict(bytes=p.stat().st_size,sha256=sha(p)) for p in base.rglob('*') if p.is_file() and p.name!='manifest.json'}
(base/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(result,indent=2))
