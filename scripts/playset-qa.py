"""Production measurements, exact rendered occlusion probes and review gallery."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import hashlib,json,subprocess
import numpy as np
R=Path(__file__).resolve().parents[1]; D=R/'assets/milestone9/review'
digest=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((R/'assets/milestone9/manifest.json').read_text())
assets=[]
depths={'cloud-bank':.05,'layered-sun':.035,'tree-cluster':.24,'cottage':.3,'workshop':.3,'garden-strip':.8,'bush-base':.8,'flower-coral':.8}
for a in manifest['assets']:
 assert digest(R/a['source'])==a['sourceSha256'];assert digest(R/a['output'])==a['outputSha256']
 im=Image.open(R/a['output']).convert('RGBA');arr=np.array(im);alpha=arr[:,:,3];l,t,r,b=a['alphaBounds']
 assert alpha.min()==0 and alpha.max()==255
 assert min(l,t,im.width-r,im.height-b)>=100
 assert not arr[alpha==0,:3].any()
 name=Path(a['source']).stem
 assets.append({**a,'id':name,'pivotInBounds':[.5,1],'suggestedParallaxRate':depths[name],'alphaRange':[int(alpha.min()),int(alpha.max())],'transparentFraction':float((alpha==0).mean()),'provenance':'Built-in imagegen; native original preserved. Prompt stored in package. Proposed art except director-liked original garden strip.'})
def diff(a,b):
 aa=np.array(Image.open(a).convert('RGB')).astype(int);bb=np.array(Image.open(b).convert('RGB')).astype(int)
 dd=np.abs(aa-bb);return dd,{'max':int(dd.max()),'mean':float(dd.mean()),'changedPixels':int(np.any(dd>0,axis=2).sum())}
repeat={}
for n in ['living-town','wind','vent']:
 _,q=diff(D/f'{n}-120.png',D/f'{n}-repeat.png');assert q['max']<=5 and q['mean']<.002;repeat[n]=q
occlusion={}
for f in [0,49,50,51,55,65,80,95,120,165,195,205,230,269]:
 dd,q=diff(D/f'vent-{f}.png',R/f'output/milestone9/vent-no-plane-{f}.png')
 # Fixed near support, deeper support, and terminal bend must always cover the plane.
 for label,(x0,y0,x1,y1) in {'nearLip':(822,490,858,800),'deepSlat':(1145,490,1170,800),'terminal':(1590,350,1640,900)}.items():
  assert dd[y0:y1,x0:x1].max()<=5,(f,label)
 if f in [120,165]:
  # Removing a composited child changes Chromium antialiasing on distant slat
  # corner edges. Require exact equality across the entire possible flight band.
  assert dd[440:680].max()==0,(f,q)
  assert q['mean']<.002 and q['max']<=16,(f,q)
  q['flightBandChangedPixels']=int(np.any(dd[440:680]>0,axis=2).sum())
 occlusion[f]=q
assert occlusion[0]['changedPixels']>1000
# Check the full source alpha silhouette fits the actual clear slot, in both directions.
plane=np.array(Image.open(R/'public/nightshift/stickers/paper-plane-v1.png').getchannel('A'))
py,px=np.nonzero(plane>16);radians=np.deg2rad(28)
world_y=570+.075*((px-1385)*np.sin(radians)+(py-260)*np.cos(radians))
assert world_y.min()>525 and world_y.max()<666,(world_y.min(),world_y.max())
approved=json.loads((R/'assets/characters/agent407/concepts/core-quality-report.json').read_text())
for a in approved:assert digest(R/'assets/characters/agent407/concepts'/a['file'])==a['sha256']
video={}
for name,count,start in [('living-town',360,55),('blossom',240,83),('wind',420,None),('vent',270,None),('registry',240,23),('goggle-craft',390,42),('goggle-magic',390,42),('crowd-individuality',240,90)]:
 p=D/f'{name}.mp4'
 if not p.exists():continue
 data=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(p)]))
 v=next(s for s in data['streams'] if s['codec_type']=='video');audio=[s for s in data['streams'] if s['codec_type']=='audio']
 assert (v['width'],v['height'],int(v['nb_frames']),v['r_frame_rate'])==(1920,1080,count,'30/1')
 assert bool(audio)==(start is not None)
 record={'frames':count,'duration':float(v['duration']),'masterStartSeconds':start,'audio':bool(audio)}
 if start is not None:
  def pcm(args):return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error',*args,'-f','f32le','-ac','1','-ar','12000','-']),dtype=np.float32)
  actual=pcm(['-i',str(p),'-vn']);expected=pcm(['-ss',str(start),'-i',str(R/'assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav'),'-t',str(count/30)])
  n=min(len(actual),len(expected));corr=float(np.corrcoef(actual[:n],expected[:n])[0,1]);assert corr>.99
  record['decodedAudioCorrelationNoLagCorrection']=corr
 video[name]=record
report={'masters':len(assets),'approvedBodiesPreserved':len(approved),'repeatRender':repeat,'ventPlaneRemoval':occlusion,'fullPlaneVerticalBounds':[float(world_y.min()),float(world_y.max())],'clearSlot':[525,666],'grille':'vertical slats per latest director request','entryExit':'same spatial slices; plane turns while fully hidden, nose-first return','videos':video,'limitations':['No claim of human continuous audiovisual approval.','Illustrative wind is an authored field, not a physical solver.','Exact isolated lavender-cloud reference unavailable.']}
(R/'assets/milestone9/qa-report.json').write_text(json.dumps(report,indent=2)+'\n')
reused=[]
for path,rate,provenance,roles in [
 ('milestone5/kraft-wall-v1.png',.02,'assets/milestone5/manifest.json','sky paper; tissue; cut terrain; vent; banner; mailbox'),
 ('milestone5/ochre-quilt-v1.png',.3,'assets/milestone5/manifest.json','reused textile stock for veranda rug cleaning and draping'),
 ('milestone5-2/hill-a-v1.png',.08,'assets/milestone5-2/manifest.json','distant crayon hill'),
 ('milestone5-2/hill-b-v1.png',.5,'assets/milestone5-2/manifest.json','foreground crayon hill'),
 ('milestone5-2/cloud-v1.png',.055,'assets/milestone5-2/manifest.json','independent humble cloud'),
 ('milestone5-2/smoke-v1.png',.3,'assets/milestone5-2/manifest.json','wind-responsive chimney ribbon'),
 ('milestone5-2/house-a-v1.png',.3,'assets/milestone5-2/manifest.json','preserved cottage and transformation before states'),
 ('milestone5-2/house-b-v1.png',.3,'assets/milestone5-2/manifest.json','transformation before state'),
 ('milestone5-2/sun-v2.png',.035,'assets/milestone5-2/manifest.json','transformation before state'),
 ('milestone8/castle-v2.png',.3,'assets/milestone8/castle-asset.json','hero castle'),
 ('nightshift/stickers/paper-plane-v1.png',0,'assets/nightshift/stickers/manifest.json','vent message'),
 ('nightshift/stickers/dust-puff-v1.png',.3,'assets/nightshift/stickers/manifest.json','in-place swap concealment'),
 ('accessories/envelope-v1.png',.3,'assets/accessories/pack-v1/manifest.json','town delivery'),
 ('accessories/wrench-v1.png',0,'assets/accessories/pack-v1/manifest.json','SH010 magic tool, held at measured paw anchor'),
 ('characters/ensemble-v1/objector-placard-v1.png',0,'assets/characters/ensemble-v1/manifest.json','illustrated objector with integrated goggles and blank runtime-text plaque'),
 ('characters/ensemble-v1/palms-up-v1.png',0,'assets/characters/ensemble-v1/manifest.json','illustrated palms-up passing agent with handmade goggles'),
 ('accessories/goggles-v1.png',0,'assets/accessories/pack-v1/manifest.json','hidden inheritance object')]:
  p=R/'public'/path;im=Image.open(p).convert('RGBA');a=im.getchannel('A')
  reused.append({'file':p.relative_to(R).as_posix(),'roles':roles,'resolution':list(im.size),'alphaRange':list(a.getextrema()),'alphaBounds':list(a.getbbox()),'pivotInBounds':[.5,1],'suggestedParallaxRate':rate,'sha256':digest(p),'provenanceRecord':provenance})
(R/'assets/milestone9/asset-library.json').write_text(json.dumps({'newAssets':assets,'reusedAssets':reused,'characters':'Approved Agent407 production derivatives; exact per-pose foot/head/paw anchors in src/sprites.ts, provenance assets/characters/agent407/PRODUCTION.md','timing':'M7 Song captions and canonical audio; unchanged','reference':'reference/director-night-sky.png (user supplied after initial batch)'},indent=2)+'\n')
font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',24)
def sheet(name,items,w=960,h=540):
 out=Image.new('RGB',(w*2,(h+46)*((len(items)+1)//2)),'#eee5d3');dr=ImageDraw.Draw(out)
 for i,(file,label) in enumerate(items):
  im=Image.open(D/file).convert('RGB');im.thumbnail((w,h));x=i%2*w;y=i//2*(h+46);out.paste(im,(x,y));dr.text((x+18,y+h+8),label,font=font,fill='#4c4e3d')
 out.save(D/name,quality=94)
sheet('vent-stages.jpg',[(f'vent-{f}.png',label) for f,label in [(0,'Outside'),(50,'Nose reaches near lip'),(55,'Tail outside / nose inside'),(65,'Between near and deep grille'),(80,'Beyond deep grille'),(120,'Gone around terminal bend'),(195,'Reverse: deep emergence'),(205,'Reverse: between layers'),(230,'Crossing near lip'),(269,'Free of vent')]])
sheet('blossom-stages.jpg',[(f'blossom-{f}.png',f'83s + {f/30:.2f}s') for f in [0,60,75,105,125,225]])
if (D/'blossom-117.png').exists():
 sheet('bubble-pop.jpg',[(f'blossom-{f}.png',label) for f,label in [(69,'Cottage fully covered at swap'),(75,'Unequal bubbles release'),(90,'Cottage revealed'),(117,'Castle covered'),(125,'Fast radial release; center clears'),(135,'Drag, buoyancy and individual fade'),(204,'Sky parts reveal in local bursts'),(239,'Finished village')]])
sheet('registry-stages.jpg',[(f'registry-{f}.png',label) for f,label in [(0,'Tiny corner hint'),(53,'Grip hold'),(66,'Paw-attached pull'),(87,'Reveal'),(180,'Plane enters channel'),(225,'Plane is gone')]])
sheet('wind-stages.jpg',[(f'wind-{f}.png',f'{f/30:.1f}s / shared breeze') for f in [0,120,300,390]])
if (D/'living-town-315.png').exists():
 sheet('village-tasks.jpg',[(f'living-town-{f}.png',label) for f,label in [(72,'Carry letter / shake rug / raise banner'),(195,'Letter delivered / inspect banner'),(270,'Drape rug / courier continues'),(315,'Inspect rug / banner helper moves on')]])
if (D/'crowd-individuality-239.png').exists():
 sheet('crowd-individuality.jpg',[(f'crowd-individuality-{f}.png',label) for f,label in [(24,'Individual strides / approach'),(45,'Different phases / decelerating'),(69,'Settling into a listening stop'),(120,'Listeners hold / rear crowd passes'),(210,'Anyway / passing momentum'),(239,'Group resumes')]])
if (D/'goggle-continuity-6420.png').exists():
 sheet('goggle-continuity.jpg',[(f'goggle-continuity-{f}.png',label) for f,label in [(720,'24s / before invention, no goggles'),(1350,'45s / every agent has their own pair'),(2550,'85s / imagined village'),(3000,'100s / the whole adventuring party'),(3900,'130s / first-generation goodbye'),(4950,'165s / second generation, not yet wearing'),(6420,'214s / first-generation memory chorus')]])
 sheet('goggle-craft.jpg',[(f'goggle-craft-{f}.png',f'Master {42+f/30:.1f}s') for f in [0,45,75,90,180,300]])
# Light/dark isolated review at useful scale; never used as a source asset.
if (D/'goggle-magic-120.png').exists():
 sheet('goggle-magic.jpg',[(f'goggle-magic-{f}.png',label) for f,label in [(0,'Tools in front / friends face the lead'),(21,'Lead goes first'),(36,'Friends follow at their own pace'),(57,'Separate catches and lifts'),(70,'Lead wearing / friends still finishing'),(87,'All wearing by 44.9s')]])
 if (D/'goggle-magic-345.png').exists():
  sheet('goggle-friends.jpg',[(f'goggle-magic-{f}.png',label) for f,label in [(120,'Acknowledge one another'),(162,'Gather and celebrate'),(212,'Shared raised-paw bop'),(243,'Turn toward the next activity'),(300,'Walk together with tools'),(345,'Continue across the village')]])
out=Image.new('RGB',(1920,370*((len(assets)+1)//2)),'#eee5d3');dr=ImageDraw.Draw(out)
for i,a in enumerate(assets):
 x=i%2*960;y=i//2*370;dr.rectangle((x+480,y,x+959,y+330),fill='#202d32')
 im=Image.open(R/a['output']).convert('RGBA');im.thumbnail((460,300))
 for dx in [0,480]:out.paste(im,(x+dx+(480-im.width)//2,y+(320-im.height)//2),im)
 dr.text((x+20,y+335),a['id'],font=font,fill='#4c4e3d')
out.save(D/'asset-sheet.jpg',quality=94)
films=[('wind','Composable bush · shared wind','14s silent material-motion study'),('living-town','The world is alive','12s / master55–67s'),('blossom','The world blossoms','8s / master83–91s / protected captions'),('vent','Into and out of the vent','9s silent / one reversible mechanism'),('registry','Registry M9 candidate','8s / master23–31s / V3 performance')]
films.insert(0,('goggle-magic','Magic tools: pop, catch, wear','Revised candidate / 13s / master42–55s / all first-generation agents retain goggles thereafter'))
films.insert(0,('crowd-individuality','Individuals within the swarm','8s / master90–98s / distinct paces and strides; preserved warning stop'))
films.append(('goggle-craft','Previous assembly study — superseded','Archived for comparison; director rejected the assembly treatment'))
html='''<!doctype html><meta charset="utf-8"><title>Swarm Song · M9 playset</title><style>body{background:#eee5d3;color:#374b43;font:18px Georgia;margin:40px auto;max-width:1500px}h1{font-size:46px}video,img{width:100%;height:auto}section{margin:55px 0}a{color:#256b72}p{line-height:1.5}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}</style><h1>The world is a playset</h1><p>M9 candidates · preserved M7 timing, M8 narrative and V3 character performance. Shared wind connects flower, banner and smoke motion. Physical GPU city / cozy apartments; imagined open vistas and skies.</p><p><a href="../ART_BIBLE.md">Art bible</a> · <a href="../REVIEW.md">Independent review</a> · <a href="../qa-report.json">Measured QA</a> · <a href="../asset-library.json">Asset provenance and pivots</a></p><img src="living-town-120.png" alt="Premium playset hero">'''
for name,title,desc in films:
 poster={'blossom':225,'registry':180,'vent':65,'goggle-craft':180}.get(name,120)
 html+=f'<section><h2>{title}</h2><p>{desc}</p><video controls preload="metadata" poster="{name}-{poster}.png" src="{name}.mp4"></video></section>'
html+='<section><h2>One reusable object, three layer roles</h2><img src="bush-layers-120.png"></section>'
html+='<p><a href="goggle-magic-v1.mp4">Previous magic-tool layering (before foreground correction)</a></p>'
html+='<p><a href="goggle-magic-v2.mp4">Previous crafting version (before supporting-friend follow-through)</a></p><section><h2>Friends keep living after the cue</h2><a href="goggle-friends.jpg"><img src="goggle-friends.jpg"></a></section>'
html+='<section><h2>Village errands and chores</h2><a href="village-tasks.jpg"><img src="village-tasks.jpg"></a><p><a href="living-town-v1.mp4">Previous town staging</a> · <a href="blossom-v1.mp4">Previous blossom staging</a> · <a href="../../../docs/ENSEMBLE_STAGING.md">Ensemble staging rule</a></p></section>'
html+='<section><h2>Individual strides and a shared stop</h2><a href="crowd-individuality.jpg"><img src="crowd-individuality.jpg"></a></section>'
html+='<section><h2>Illustrated placard and palms-up poses</h2><a href="../../characters/ensemble-v1/README.md">Asset pack, exact prompts and QA</a><img src="../../characters/ensemble-v1/contact-sheet.jpg"><p><a href="crowd-individuality-v1.mp4">Previous rough-prop warning scene</a></p></section>'
html+='<section><h2>White Bubble Pop</h2><a href="bubble-pop.jpg"><img src="bubble-pop.jpg"></a><p><a href="blossom-v2.mp4">Previous zooming-puff transformation</a></p></section>'
html+='<section><h2>Captions stay readable</h2><img src="captions-120.png"></section>'
for name in ['goggle-magic','vent-stages','blossom-stages','registry-stages','wind-stages','goggle-craft','goggle-continuity','asset-sheet']:html+=f'<section><h2>{name.replace("-"," ")}</h2><a href="{name}.jpg"><img src="{name}.jpg"></a></section>'
html+='<p>Stills, decoded-frame checks and technical QA do not establish human audiovisual approval. Previous film versions remain unchanged.</p>'
(D/'index.html').write_text(html,encoding='utf-8')
from html.parser import HTMLParser
class LocalLinks(HTMLParser):
 def handle_starttag(self,tag,attrs):
  for key,value in attrs:
   if key in ['href','src','poster'] and value:
    assert (D/value).exists(),f'Missing gallery target: {value}'
LocalLinks().feed(html)
print(json.dumps(report,indent=2))
