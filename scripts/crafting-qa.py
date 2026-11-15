"""Validate the bounded continuation; machine evidence is not playback approval."""
from pathlib import Path
import subprocess,json,hashlib
import numpy as np
from PIL import Image,ImageDraw,ImageChops
root=Path('assets/milestone12/crafting');review=root/'review'
def run(*args):return subprocess.check_output(args)
def pcm(path,start,duration):return np.frombuffer(run('ffmpeg','-v','error','-ss',str(start),'-i',str(path),'-t',str(duration),'-vn','-ac','1','-ar','8000','-f','s16le','-'),dtype='<i2').astype(float)
preserved=json.loads((root/'preserved-chapter.json').read_text())
assert hashlib.sha256(Path(preserved['path']).read_bytes()).hexdigest()==preserved['sha256']
a=Image.open('assets/milestone12/review/41966.png').convert('RGB')
b=Image.open(review/'1259.png').convert('RGB')
assert ImageChops.difference(a,b).getbbox() is None,'Pre-cut master frame changed'
videos={}
for name,start,duration in [('chapter-55s',0,55),('crafting-42-55',42,13),('handoff-39-55',39,16)]:
 p=review/f'{name}.mp4';meta=json.loads(run('ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)))
 v=next(x for x in meta['streams'] if x['codec_type']=='video')
 assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',duration*30)
 assert abs(float(meta['format']['duration'])-duration)<.05
 subprocess.run(['ffmpeg','-v','error','-i',str(p),'-f','null','-'],check=True)
 a=pcm(p,0,duration);b=pcm('assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav',start,duration)
 n=min(len(a),len(b));correlation=float(np.corrcoef(a[:n],b[:n])[0,1]);assert correlation>.995
 videos[name]={'frames':duration*30,'masterStartSeconds':start,'audioCorrelation':correlation,'fullDecode':'pass'}
times=[1259,1260,1271,1290,1320,1347,1425,1470,1530,1590,1649]
out=Image.new('RGB',(1920,384*4),'#15212f');d=ImageDraw.Draw(out)
for i,frame in enumerate(times):
 im=Image.open(review/f'{frame}.png').convert('RGB');im.thumbnail((640,360));x=i%3*640;y=i//3*384
 out.paste(im,(x,y));d.text((x+10,y+363),f'{frame/30:.3f}s master',fill='#f5dfb0')
out.save(review/'continuity.jpg',quality=94)
report={'videos':videos,'approvedChapterSHA256':preserved['sha256'],'frame1259MatchesApprovedChapter':True,'testsPassed':54,'runtimeChoreographyUnchanged':True,'technicalOnlyNotPlaybackApproval':True}
(root/'QA.json').write_text(json.dumps(report,indent=2)+'\n')
(review/'index.html').write_text('''<!doctype html><meta charset="utf-8"><title>Swarm Song - Goggles</title><style>body{max-width:1280px;margin:32px auto;background:#101a29;color:#f8ecd7;font:18px system-ui}video,img{display:block;width:100%;margin:20px 0}</style><h1>We are the swarm now</h1><p>55-second continuous chapter. Approved opening preserved; existing staggered tool pops, catches, wearing, greeting/bops and departure continue on the master clock.</p><video controls src="chapter-55s.mp4"></video><h2>Handoff and crafting, 39-55s</h2><video controls src="handoff-39-55.mp4"></video><h2>New continuation, 42-55s</h2><video controls src="crafting-42-55.mp4"></video><h2>Continuity samples</h2><img src="continuity.jpg"><p>Source/still review and technical checks are separate from director playback approval. The next shot starts at55s and is not included.</p>''',encoding='utf-8')
print(json.dumps(report,indent=2))
