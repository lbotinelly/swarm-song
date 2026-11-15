from pathlib import Path
import subprocess,json,hashlib
import numpy as np
from PIL import Image,ImageDraw
root=Path('assets/milestone12/imagination-turn');review=root/'review'
def run(*args):return subprocess.check_output(args)
def sha(b):return hashlib.sha256(b).hexdigest()
protected={}
for name in ['assets/milestone12/review/first-chapter-42s.mp4','assets/milestone12/crafting/review/chapter-55s.mp4']:
 expected=sha(run('git','show','7bdd83d:'+name));assert sha(Path(name).read_bytes())==expected;protected[name]=expected
def pcm(path,start,duration):return np.frombuffer(run('ffmpeg','-v','error','-ss',str(start),'-i',str(path),'-t',str(duration),'-vn','-ac','1','-ar','8000','-f','s16le','-'),dtype='<i2').astype(float)
videos={}
for name,start,duration in [('chapter-55s',0,55),('imagination-38-55',38,17)]:
 p=review/f'{name}.mp4';meta=json.loads(run('ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)))
 v=next(x for x in meta['streams'] if x['codec_type']=='video')
 assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',duration*30)
 assert abs(float(meta['format']['duration'])-duration)<.05
 subprocess.run(['ffmpeg','-v','error','-i',str(p),'-f','null','-'],check=True)
 a=pcm(p,0,duration);b=pcm('assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav',start,duration);n=min(len(a),len(b))
 correlation=float(np.corrcoef(a[:n],b[:n])[0,1]);assert correlation>.995
 videos[name]={'frames':duration*30,'masterStartSeconds':start,'audioCorrelation':correlation,'fullDecode':'pass'}
frames=[1140,1170,1175,1180,1181,1190,1203,1260,1299,1347,1470,1649]
out=Image.new('RGB',(1920,1536),'#15212f');d=ImageDraw.Draw(out)
for i,frame in enumerate(frames):
 im=Image.open(review/f'{frame}.png').convert('RGB');im.thumbnail((640,360));x=i%3*640;y=i//3*384
 out.paste(im,(x,y));d.text((x+10,y+363),f'{frame/30:.3f}s master',fill='#f5dfb0')
out.save(review/'transition.jpg',quality=94)
report={'videos':videos,'preservedExports':protected,'testsPassed':54,'sourceAndSampledStillReview':'no remaining blockers after grounding and transition-edge corrections','continuousPlaybackApproval':False}
(root/'QA.json').write_text(json.dumps(report,indent=2)+'\n')
(review/'index.html').write_text('''<!doctype html><meta charset="utf-8"><title>Swarm Song - Into imagination</title><style>body{max-width:1280px;margin:32px auto;background:#101a29;color:#f8ecd7;font:18px system-ui}video,img{display:block;width:100%;margin:20px 0}</style><h1>Into imagination</h1><p>Upward camera turn into a full-screen imagined landscape. Original crafting timings and full-width captions retained.</p><video controls src="imagination-38-55.mp4"></video><h2>Complete55-second chapter</h2><video controls src="chapter-55s.mp4"></video><h2>Transition and performance samples</h2><img src="transition.jpg"><p>Independent review covers source and sampled frames. The speed and feel of the turn await director playback.</p>''',encoding='utf-8')
print(json.dumps(report,indent=2))
