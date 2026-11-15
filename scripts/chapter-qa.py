"""M12 frame/audio/asset checks and review sheets; not an artistic playback approval."""
from pathlib import Path
import subprocess,json,hashlib
import numpy as np
from PIL import Image,ImageDraw,ImageChops
root=Path('assets/milestone12');review=root/'review'
def run(*args):return subprocess.check_output(args)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
protected=json.loads((root/'preserved-inputs.json').read_text())
extensions={'src/Storyboard.tsx','src/RegistryFinish.tsx'}
assert all(sha(p)==h for p,h in protected.items() if p not in extensions)
# These two existing components gained opt-in entry points, documented in README.
# Preserve their recorded baseline too; do not silently rebaseline their hashes.
assert all(hashlib.sha256(run('git','show',f'1d9ce57:{p}').replace(b'\r\n',b'\n').replace(b'\n',b'\r\n')).hexdigest()==protected[p] for p in extensions)
def pcm(path,start,duration):return np.frombuffer(run('ffmpeg','-v','error','-ss',str(start),'-i',str(path),'-t',str(duration),'-vn','-ac','1','-ar','8000','-f','s16le','-'),dtype='<i2').astype(float)
master='assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav'
videos={}
for name,start,duration in [('first-chapter-42s',0,42),('continuity-18-36',18,18),('connection-28-42',28,14),('aroll-only-42s',0,42)]:
 p=review/f'{name}.mp4';meta=json.loads(run('ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)))
 v=next(x for x in meta['streams'] if x['codec_type']=='video')
 assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',duration*30)
 assert abs(float(meta['format']['duration'])-duration)<.05
 subprocess.run(['ffmpeg','-v','error','-i',str(p),'-f','null','-'],check=True)
 a=pcm(p,0,duration);b=pcm(master,start,duration);n=min(len(a),len(b));corr=float(np.corrcoef(a[:n],b[:n])[0,1]);assert corr>.995
 videos[name]={'frames':duration*30,'masterStartSeconds':start,'audioCorrelation':corr,'fullDecode':'pass'}
 if start==0:
  black=run('ffmpeg','-v','error','-i',str(p),'-frames:v','45','-vf','scale=48:27,format=rgb24','-pix_fmt','rgb24','-f','rawvideo','-');assert max(black)==0
for ms in [0,10800,14000,19000]:
 a=Image.open(f'assets/milestone11/morning-captions/review/{ms}.png').convert('RGB');b=Image.open(review/f'{ms}.png').convert('RGB')
 assert ImageChops.difference(a,b).getbbox() is None,ms
seeks=json.loads((root/'seek-qa.json').read_text());assert len(seeks)==3
def sheet(name,times,cols=3):
 out=Image.new('RGB',(640*cols,384*((len(times)+cols-1)//cols)),'#15212f');d=ImageDraw.Draw(out)
 for i,ms in enumerate(times):
  im=Image.open(review/f'{ms}.png').convert('RGB');im.thumbnail((640,360));x=i%cols*640;y=i//cols*384;out.paste(im,(x,y));d.text((x+10,y+363),f'{ms/1000:.3f}s master',fill='#f5dfb0')
 out.save(review/f'{name}.jpg',quality=94)
sheet('camera-continuity',[19000,19966,20000,22000,23000,24750,25050,25500,25900,28000,31200,35200])
sheet('prop-continuity',[20000,20700,24750,25500,28600,29200,29500,29600,30200,31966,32000,32200,33700,34100,34400,35966,36000,36200,37800,38966,39000])
sheet('chapter',[10800,14000,22000,25500,28600,31000,32200,33700,36200,37800,40000,41966])
sheet('boundaries',[22966,23000,27966,28000,31166,31200,35166,35200,38966,39000,40900,41966])
report={'videos':videos,'unchangedProtectedInputs':len(protected)-len(extensions),'documentedSourceExtensions':sorted(extensions),'sourceBaseline':'1d9ce57','approvedOpeningExactSampleMatches':[0,10800,14000,19000],'reverseDirectSeekPNGs':seeks,'frameStateTests':1260,'technicalOnlyNotContinuousPlaybackApproval':True}
(root/'QA.json').write_text(json.dumps(report,indent=2)+'\n')
(review/'index.html').write_text('''<!doctype html><meta charset="utf-8"><title>Swarm Song - First Chapter</title><style>body{max-width:1280px;margin:32px auto;background:#101a29;color:#f8ecd7;font:18px system-ui}video,img{display:block;width:100%;margin:20px 0}a{color:#b9dfda}</style><h1>Hello? Is anybody there?</h1><p>M12 - 0:00-0:42 candidate. Original master audio, 1080p, 30fps. Blank message stickers and writing emoji follow the director's latest correction.</p><video controls src="first-chapter-42s.mp4"></video><h2>Task list to first reply - 18-36s</h2><video controls src="continuity-18-36.mp4"></video><h2>Connection and imagination - 28-42s</h2><video controls src="connection-28-42.mp4"></video><h2>A-roll-only comparison</h2><p>Same story, with ornamental neighboring morning motion suppressed. This is an editorial comparison, not a replacement for the living ensemble.</p><video controls src="aroll-only-42s.mp4"></video><h2>Camera continuity</h2><img src="camera-continuity.jpg"><h2>Prop continuity</h2><img src="prop-continuity.jpg"><h2>Chapter</h2><img src="chapter.jpg"><p>Independent source/still review and machine AV verification are separate from director playback approval. See ../README.md, ../REVIEW.md and ../QA.json.</p>''',encoding='utf-8')
print(json.dumps(report,indent=2))
