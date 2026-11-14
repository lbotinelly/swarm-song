"""Local decoded-media, alpha, preservation and contact-sheet checks for M11."""
from pathlib import Path
import hashlib, json, subprocess, io
import numpy as np
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/milestone11/review-v2'
MASTER=ROOT/'assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav'
def run(*args):return subprocess.check_output(list(map(str,args)),cwd=ROOT)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def frame(path,t):
 return Image.open(io.BytesIO(run('ffmpeg','-v','error','-ss',t,'-i',path,'-frames:v','1','-f','image2pipe','-vcodec','png','-'))).convert('RGB')
def audio(path,duration):return np.frombuffer(run('ffmpeg','-v','error','-i',path,'-t',duration,'-vn','-f','f32le','-ac','1','-ar','12000','-'),dtype=np.float32)
protected=json.loads((ROOT/'assets/milestone11/preserved-inputs-v2.json').read_text())
assert all(sha(ROOT/p)==h for p,h in protected.items())
report={'preservedInputs':len(protected),'videos':{},'assets':[]}
assert np.asarray(Image.open(OUT/'complete-0.png').convert('RGB')).max()==0
report['sourceFirstFrameBlack']=True
for name,duration,count in [('opening',13,390),('continuity-20s',20,600),('city',13,390),('title',13,390)]:
 path=OUT/f'{name}.mp4'
 probe=json.loads(run('ffprobe','-v','error','-show_streams','-show_format','-of','json',path))
 video=next(s for s in probe['streams'] if s['codec_type']=='video')
 assert [video['width'],video['height']]==[1920,1080] and video['r_frame_rate']=='30/1'
 assert int(video['nb_frames'])==count and abs(float(video['duration'])-duration)<.001
 run('ffmpeg','-v','error','-i',path,'-f','null','-')
 a,b=audio(path,duration),audio(MASTER,duration);n=min(len(a),len(b));corr=float(np.corrcoef(a[:n],b[:n])[0,1]);assert corr>.99
 # Decode to display RGB before reducing. YUV-to-gray scaler rounding can add
 # spurious 2/255 edge values even when the full decoded RGB frame is pure zero.
 black=np.frombuffer(run('ffmpeg','-v','error','-i',path,'-t','1.5','-vf','format=rgb24,scale=48:27','-pix_fmt','rgb24','-f','rawvideo','-'),np.uint8)
 assert black.size==45*48*27*3 and int(black.max())==0
 report['videos'][name]={'size':[1920,1080],'fps':30,'frames':count,'duration':duration,'audioCorrelationNoLag':corr,'blackFrames':45,'blackMax':int(black.max()),'sha256':sha(path)}
for item in json.loads((ROOT/'assets/milestone11/manifest.json').read_text())['assets']:
 original=ROOT/item['source'];p=ROOT/item['output'];im=Image.open(p).convert('RGBA');a=np.array(im)[:,:,3]
 assert sha(original)==item['sourceSha256'] and sha(p)==item['outputSha256']
 assert a.min()==0 and a.max()==255 and not np.any(a[0]) and not np.any(a[-1]) and not np.any(a[:,0]) and not np.any(a[:,-1])
 report['assets'].append({'file':item['output'],'alphaBounds':im.getchannel('A').getbbox(),'nativeMasterPreserved':True})
assets=Image.new('RGB',(1200,650),'#172337');ad=ImageDraw.Draw(assets)
for i,name in enumerate(['sleeping-v1','cushion-v2']):
 im=Image.open(ROOT/f'public/milestone11/{name}.png').convert('RGBA');im.thumbnail((560,560));assets.paste(im,(20+600*i,30),im);ad.text((30+600*i,610),name+' | transparent production copy',fill='#f6ebd0')
assets.save(OUT/'asset-contact.jpg',quality=95)
comparison=Image.new('RGB',(1200,370),'#172337');cd=ImageDraw.Draw(comparison)
for i,version in enumerate(['review-v1','review-v2']):
 im=Image.open(ROOT/f'assets/milestone11/{version}/complete-3400.png').convert('RGB');im.thumbnail((600,338));comparison.paste(im,(600*i,0));cd.text((600*i+12,345),version+' | same 3.4-second frame',fill='#f6ebd0')
comparison.save(OUT/'city-comparison.jpg',quality=95)
repeat=OUT/'complete-repeat-7000.png';first=OUT/'complete-7000.png'
assert sha(repeat)==sha(first)
report['repeatSeek7000']={'byteIdentical':True,'sha256':sha(repeat)}
join_frame=OUT/'complete-13000.png'
old=np.asarray(Image.open(ROOT/'assets/milestone11/review-v1/complete-13000.png').convert('RGB'),dtype=float)
new=np.asarray(Image.open(join_frame).convert('RGB'),dtype=float)
join_delta=np.abs(old-new);join_rmse=float(np.sqrt(np.mean((old-new)**2)))
assert join_rmse<.1 and join_delta.mean()<.05
report['v1JoinFrameComparison']={'meanChannelDelta':float(join_delta.mean()),'maximumChannelDelta':float(join_delta.max()),'rmse':join_rmse,'byteIdentical':sha(join_frame)==sha(ROOT/'assets/milestone11/review-v1/complete-13000.png'),'note':'Unchanged room/camera geometry; subpixel raster variation is reported, not claimed byte-identical.'}
a=np.asarray(Image.open(OUT/'complete-12966.png').convert('RGB'),dtype=float)
b=np.asarray(Image.open(OUT/'complete-13000.png').convert('RGB'),dtype=float)
delta=np.abs(a-b);report['join389to390']={'meanChannelDelta':float(delta.mean()),'maximumChannelDelta':float(delta.max()),'note':'Same room and settled camera; resident breathing and lamp grade continue across join.'}
assert delta.mean()<.5
for name,times in [('journey',[0,2.3,3.4,5.2,9.8,10.5,11.2,12,12.966]),('title-states',[5.2,6.2,7,7.85,8.7,9.8]),('awakening',[12.966,13,13.7,13.9,14.3,14.8,16,19])]:
 sheet=Image.new('RGB',(1200,250*((len(times)+2)//3)),(20,29,45));draw=ImageDraw.Draw(sheet)
 for i,t in enumerate(times):
  im=frame(OUT/'continuity-20s.mp4',t);im.thumbnail((400,225));x=i%3*400;y=i//3*250;sheet.paste(im,(x,y));draw.text((x+10,y+229),f'{t:05.2f}s | encoded continuity cut',fill='#fff0d0')
 sheet.save(OUT/f'{name}-contact.jpg',quality=94)
videos=[('opening','Complete opening · 13s'),('continuity-20s','Opening into awakening · 20s'),('city','City without title · 13s'),('title','Title performance · 13s')]
html='<!doctype html><meta charset="utf-8"><title>M11 | Once upon a GPU</title><style>body{background:#121c2d;color:#f5e5ca;font:18px system-ui;max-width:1200px;margin:40px auto}video,img{width:100%}section{margin:36px 0}a{color:#b9d8dc}</style><h1>Swarm Song · M11 opening candidate</h1><p>Original master clock. Candidate: director playback approval pending. Previous full films preserved.</p>'
for name,title in videos:html+=f'<section><h2>{title}</h2><video controls preload="metadata" src="{name}.mp4"></video></section>'
for name in ['journey','title-states','awakening','asset']:html+=f'<h2>{name}</h2><img src="{name}-contact.jpg">'
html+='<h2>City comparison: V1 / V2</h2><img src="city-comparison.jpg">'
(OUT/'index.html').write_text(html,encoding='utf8')
(ROOT/'assets/milestone11/qa-report-v2.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
