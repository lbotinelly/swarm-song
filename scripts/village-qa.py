"""Verify real renders and build review layouts without editing native artwork."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import hashlib,json,numpy as np
root=Path(__file__).resolve().parents[1];out=root/'assets/milestone5-2/review'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((root/'assets/milestone5-2/manifest.json').read_text())
used=[a for a in manifest['assets'] if not a['source'].endswith('sun-v1.png')]
for a in manifest['assets']:
 assert sha(root/a['source'])==a['sourceSha256']
 assert sha(root/a['output'])==a['outputSha256']
 im=np.array(Image.open(root/a['output']).convert('RGBA'))
 assert not im[:100,:,3].any() and not im[-100:,:,3].any()
 assert not im[:,:100,3].any() and not im[:,-100:,3].any()
 assert not im[im[:,:,3]==0,:3].any()
 assert list(im.shape[:2][::-1])==[x+200 for x in a['nativeDimensions']]
approved=json.loads((root/'assets/characters/agent407/concepts/core-quality-report.json').read_text())
for a in approved:assert sha(root/'assets/characters/agent407/concepts'/a['file'])==a['sha256']
def pixels(name):return np.array(Image.open(out/name).convert('RGB')).astype(float)
a=pixels('village-354.png');b=pixels('village-354-repeat.png');d=abs(a-b)
assert d.max()<=5 and d.mean()<.002
full=pixels('village-390.png');no_cloud=pixels('probe-hideCloud.png');no_sun=pixels('probe-hideSun.png');no_smoke=pixels('probe-hideSmoke.png')
roi=np.s_[320:350,1140:1170,:]
sun_under_cloud=float(abs(full[roi]-no_sun[roi]).mean())
cloud_coverage=float(abs(full[roi]-no_cloud[roi]).mean())
assert sun_under_cloud<2 and cloud_coverage>8,(sun_under_cloud,cloud_coverage)
smoke_delta=np.max(abs(full-no_smoke),axis=2)
assert (smoke_delta[:525]>5).sum()>300
assert (smoke_delta[530:]>5).sum()==0,'Smoke leaked below its chimney lip'
report={'nativeMasters':len(manifest['assets']),'selectedNewParts':len(used),'approvedCharacterHashesPreserved':len(approved),'nativeRejected':'sun-v1 top ray touched canvas; sun-v2 used instead','padding':100,'directSeek':{'maxDifference':float(d.max()),'meanDifference':float(d.mean()),'sha256':sha(out/'village-354.png'),'repeatSha256':sha(out/'village-354-repeat.png')},'sunOcclusion':{'hiddenSunRoiDifference':sun_under_cloud,'removedCloudRoiDifference':cloud_coverage},'smoke':{'visiblePixelsAboveLip':int((smoke_delta[:525]>5).sum()),'visiblePixelsBelowLip':int((smoke_delta[530:]>5).sum())}}
(out/'qa.json').write_text(json.dumps(report,indent=2)+'\n')
font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',24);small=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',19)
sheet=Image.new('RGB',(1920,1360),'#f5eddf');draw=ImageDraw.Draw(sheet)
draw.text((40,22),'THE VILLAGE WE IMAGINED / independent construction pieces',font=font,fill='#4f655b')
for i,a in enumerate(used):
 x=40+(i%4)*470;y=90+(i//4)*440
 im=Image.open(root/a['output']).convert('RGBA');im=im.crop(im.getchannel('A').getbbox());im.thumbnail((420,340));sheet.paste(im,(x+(420-im.width)//2,y+(340-im.height)//2),im)
 draw.text((x,y+350),Path(a['source']).stem,font=font,fill='#4f655b')
 draw.text((x,y+385),f"Native {a['nativeDimensions'][0]} x {a['nativeDimensions'][1]}",font=small,fill='#786b58')
lines=['BACK: reused warm cardstock + authored crayon marks','SUN / distant hill: rigid cutouts, slowest parallax','TISSUE: one translucent stock sheet, between hill and houses','CLOUD: separate opaque paper, in front of the sun','HOUSES + smoke channel: each assembly moves together','BUNNIES + shared note: unchanged approved sprite art','FRONT HILL: faster parallax, foreground occlusion']
for i,line in enumerate(lines):draw.text((45,1005+i*43),line,font=font,fill='#4f655b')
sheet.save(out/'construction-sheet.jpg',quality=95)
seq=Image.new('RGB',(1920,1300),'#f5eddf');draw=ImageDraw.Draw(seq)
for i,(f,label) in enumerate([(30,'Calling across separate homes'),(90,'The imagination sheet arrives'),(150,'Hills and sun slide into place'),(210,'Houses settle; smoke begins'),(270,'The courier joins the group'),(354,'Recognition and a shared note')]):
 x=(i%2)*960;y=(i//2)*430;im=Image.open(out/f'village-{f}.png');im.thumbnail((940,390));seq.paste(im,(x,y));draw.text((x+20,y+395),label,font=small,fill='#4f655b')
seq.save(out/'sequence-sheet.jpg',quality=94)
comparison=Image.new('RGB',(1920,600),'#f5eddf');draw=ImageDraw.Draw(comparison)
for i,(f,label) in enumerate([(0,'PHYSICAL / separate compartments'),(354,'IMAGINED / a shared village')]):
 im=Image.open(out/f'village-{f}.png');im.thumbnail((960,540));comparison.paste(im,(i*960,0));draw.text((i*960+24,557),label,font=font,fill='#4f655b')
comparison.save(out/'worlds-comparison.jpg',quality=94)
print(json.dumps(report,indent=2))
