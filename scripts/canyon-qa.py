"""Verify the focused C proof and produce its review contact sheet."""
from pathlib import Path
import hashlib,json,subprocess,sys
import numpy as np
from PIL import Image,ImageDraw

morning='--morning' in sys.argv
dense='--approach' in sys.argv or morning
root=Path('assets/milestone11')/('morning-routines' if morning else 'canyon-approach' if dense else 'canyon-proof'); review=root/'review'
video=review/'canyon-opening-20s.mp4'
def run(*args): return subprocess.check_output(args)
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()
meta=json.loads(run('ffprobe','-v','error','-show_streams','-show_format','-of','json',str(video)))
v=next(s for s in meta['streams'] if s['codec_type']=='video')
assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',600)
assert abs(float(meta['format']['duration'])-20)<.05
subprocess.run(['ffmpeg','-v','error','-i',str(video),'-f','null','-'],check=True)
black=run('ffmpeg','-v','error','-i',str(video),'-frames:v','45','-vf','format=rgb24,scale=48:27','-pix_fmt','rgb24','-f','rawvideo','-')
assert max(black)==0
def pcm(path): return np.frombuffer(run('ffmpeg','-v','error','-i',str(path),'-t','20','-vn','-ac','1','-ar','8000','-f','s16le','-'),dtype='<i2').astype(float)
a=pcm(video);b=pcm('assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav'); n=min(len(a),len(b)); corr=float(np.corrcoef(a[:n],b[:n])[0,1]);assert corr>.99
preserved=json.loads(Path('assets/milestone11/preserved-inputs-v2.json').read_text())
if dense:
 old='assets/milestone11/canyon-proof/review/canyon-opening-20s.mp4'
 preserved[old]=hashlib.sha256(run('git','show',f'6060213:{old}')).hexdigest()
if morning:
 old='assets/milestone11/canyon-approach/review/canyon-opening-20s.mp4'
 preserved[old]=hashlib.sha256(run('git','show',f'd58ae11:{old}')).hexdigest()
assert all(sha(p)==expected for p,expected in preserved.items())
manifest=json.loads((root/'manifest.json').read_text())
for name,item in manifest.items():
 assert sha(root/'masters'/f'{name}.png')==item['sha256']==sha(Path('public/milestone11')/('morning' if morning else 'canyon-approach' if dense else 'canyon')/f'{name}.png')
report={'video':str(video),'frames':600,'dimensions':[1920,1080],'fps':30,'durationSeconds':float(meta['format']['duration']),'fullDecode':'pass','first45FramesRGBMax':max(black),'audioCorrelationWithMaster':corr,'preservedInputHashes':len(preserved),'nativeAndProductionAssetHashes':'pass','automatedChecksDoNotConstitutePlaybackApproval':True}
(root/'QA.json').write_text(json.dumps(report,indent=2)+'\n')
times=[10800,14000,15200,17400,18200,19000] if morning else [3400,7000,9800,10800,13000,16000]; sheet=Image.new('RGB',(1280,1140),'#10162a'); draw=ImageDraw.Draw(sheet)
for i,ms in enumerate(times):
 im=Image.open(review/f'{ms}.png').convert('RGB');im.thumbnail((640,360));x=(i%2)*640;y=(i//2)*380;sheet.paste(im,(x,y));draw.text((x+12,y+363),f'{ms/1000:g}s master',fill='#f4dfa5')
sheet.save(review/'contact.jpg',quality=93)
(review/'index.html').write_text('''<!doctype html><meta charset="utf-8"><title>Swarm Song — C canyon proof</title><style>body{margin:32px auto;max-width:1200px;background:#10162a;color:#f4dfa5;font:18px system-ui}video,img{width:100%;display:block;margin:20px 0}p{line-height:1.5}</style><h1>C — the city opens like a playset</h1><p>Focused 0–20s candidate · original master audio · 1080p / 30fps. Eight-storey hero, fifth floor from the top. Full-screen city and one sliding facade. Previous films preserved; awaiting director playback review.</p><video controls src="canyon-opening-20s.mp4"></video><img src="contact.jpg"><p>Independent review was of frames/source, not continuous audiovisual playback. See ../README.md and ../QA.json for provenance, reproduction and limits.</p>''',encoding='utf-8')
print(json.dumps(report,indent=2))
if dense:
 gallery=review/'index.html'
 gallery.write_text(gallery.read_text(encoding='utf-8').replace('C canyon proof','A elevated approach proof').replace('C — the city opens like a playset','A — elevated approach to the facing apartment').replace('Full-screen city and one sliding facade.','Mid-building altitude, no visible ground, dense blue-hazed rows and one sliding facade.'),encoding='utf-8')
if morning:
 gallery.write_text(gallery.read_text(encoding='utf-8').replace('A — elevated approach to the facing apartment','The apartments wake up').replace('A elevated approach proof','Morning routines').replace('Mid-building altitude, no visible ground, dense blue-hazed rows and one sliding facade.','Approved elevated camera; staggered waking, news, coffee, sweeping and task-list reading. Caption placement adjusted for the supporting performances.'),encoding='utf-8')
