"""Concrete asset and rendered-occlusion checks; no generative image edits."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import json, hashlib
root=Path(__file__).resolve().parents[1]
out=root/'assets/milestone5/review'
digest=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((root/'assets/milestone5/manifest.json').read_text())
for a in manifest['assets']:
    assert digest(root/a['source'])==a['sourceSha256']
    assert digest(root/a['output'])==a['outputSha256']
    im=Image.open(root/a['output']).convert('RGBA'); arr=np.array(im)
    assert im.size==tuple(v+200 for v in a['nativeDimensions'])
    assert not arr[:100,:,3].any() and not arr[-100:,:,3].any()
    assert not arr[:,:100,3].any() and not arr[:,-100:,3].any()
    assert not arr[arr[:,:,3]==0,:3].any()
approved=json.loads((root/'assets/characters/agent407/concepts/core-quality-report.json').read_text())
for a in approved:
    assert digest(root/'assets/characters/agent407/concepts'/a['file'])==a['sha256']
def diff(a,b):
    d=np.abs(np.array(Image.open(out/a).convert('RGB')).astype(float)-np.array(Image.open(out/b).convert('RGB')).astype(float))
    return {'maxChannelDifference':float(d.max()),'meanChannelDifference':float(d.mean()),'changedPixels':int(np.any(d>0,axis=2).sum())}
seek=diff('set-105.png','set-105-repeat.png')
# Chromium's antialiasing may vary by a few 8-bit levels across fresh processes.
# State is exact; this strict image tolerance catches geometry or timing differences.
assert seek['maxChannelDifference']<=5 and seek['meanChannelDifference']<.002,seek
occlusion={str(f):diff(f'occlusion-{f}-true.png',f'occlusion-{f}-false.png') for f in [0,195,240]}
assert occlusion['0']['changedPixels']>1000
for f in ['195','240']:
    assert occlusion[f]['maxChannelDifference']<=5 and occlusion[f]['meanChannelDifference']<.002,occlusion
report={'nativeMasters':len(manifest['assets']),'approvedMastersPreserved':len(approved),'paddingPixels':100,'seekComparison':seek,'residentVisibleVersusRemoved':occlusion,'note':'Exact time state; raster equality is bounded to 5/255 max and .002 mean because Chromium antialiasing can vary. Closed-curtain comparison removes only the resident, not its floor shadow.'}
(out/'qa.json').write_text(json.dumps(report,indent=2)+'\n')
font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',24)
small=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',19)
sheet=Image.new('RGB',(1920,1440),'#f2eadc');draw=ImageDraw.Draw(sheet)
draw.text((40,25),'SWARM SONG / actual paper-set construction',fill='#3e514b',font=font)
im=Image.open(out/'exploded.png').convert('RGB');im.thumbnail((1100,1000));sheet.paste(im,(0,90))
labels=['Housing + backing / three edge fins','Two independent corrugated fan inserts','Three separate room boxes / same outward edge','Floor / ceiling / rear wall / side partitions','Shelf, books, bed or table: folded stock planes','Curtain z=-2 / resident z=-28 to -113 / rail z=26','Ground platform and its thickness face']
for i,t in enumerate(labels):draw.text((40,1110+i*38),t,fill='#3e514b',font=small)
for i,a in enumerate(manifest['assets']):
    x=1130+(i%2)*385;y=100+(i//2)*400
    im=Image.open(root/a['output']);im.thumbnail((340,325));sheet.paste(im,(x+(340-im.width)//2,y),im)
    draw.text((x,y+335),Path(a['source']).stem,fill='#3e514b',font=small)
sheet.save(out/'construction-sheet.jpg',quality=94)
contact=Image.new('RGB',(1920,1250),'#f2eadc');d=ImageDraw.Draw(contact)
frames=[(0,'Occupied exterior'),(105,'Camera moved'),(150,'Retreat and closing curtain'),(195,'Hidden behind actual curtain'),(254,'Approach / lamp off'),(255,'Cut to same room assembly')]
for i,(f,label) in enumerate(frames):
    x=(i%2)*960;y=(i//2)*415
    im=Image.open(out/f'set-{f}.png');im.thumbnail((960,375));contact.paste(im,(x,y));d.text((x+25,y+378),f'{f/30:.2f}s / {label}',fill='#3e514b',font=small)
contact.save(out/'sequence-sheet.jpg',quality=94)
print(json.dumps(report,indent=2))
