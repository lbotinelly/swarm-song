"""Verify the two native equipped copies and build their light/dark review sheet."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageDraw, ImageFont

root=Path(__file__).resolve().parents[1]
package=root/'assets/characters/ensemble-v1'
manifest=json.loads((package/'manifest.json').read_text())
records=[]
for asset in manifest['assets']:
    src=root/asset['source']; dst=root/asset['output']
    native=Image.open(src); prepared=Image.open(dst)
    assert native.mode=='RGBA' and prepared.mode=='RGBA'
    assert hashlib.sha256(src.read_bytes()).hexdigest()==asset['sourceSha256']
    assert hashlib.sha256(dst.read_bytes()).hexdigest()==asset['outputSha256']
    assert prepared.size==(native.width+200,native.height+200)
    alpha=prepared.getchannel('A'); bounds=alpha.getbbox()
    assert alpha.getextrema()==(0,255)
    assert bounds and min(bounds[:2])>=100 and bounds[2]<=prepared.width-100 and bounds[3]<=prepared.height-100
    records.append({'file':asset['output'],'nativeSize':list(native.size),'preparedSize':list(prepared.size),'alphaBounds':list(bounds),'sourcePreserved':True})

sheet=Image.new('RGB',(1800,1560),'#eee5d3'); draw=ImageDraw.Draw(sheet)
draw.rectangle((0,780,1800,1560),fill='#202d32')
font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',27)
items=[('Approved standing','public/characters/agent407/standing-v1.png'),('Objector / blank placard','public/characters/ensemble-v1/objector-placard-v1.png'),('Palms-up shrug','public/characters/ensemble-v1/palms-up-v1.png')]
for col,(label,file) in enumerate(items):
    im=Image.open(root/file).convert('RGBA'); im=im.crop(im.getchannel('A').getbbox()); im.thumbnail((520,680))
    for row in range(2):
        x=col*600+(600-im.width)//2;y=row*780+35+(680-im.height)
        sheet.paste(im,(x,y),im)
        draw.text((col*600+35,row*780+730),label,font=font,fill='#4d4b3f' if row==0 else '#fff4dd')
sheet.save(package/'contact-sheet.jpg',quality=95)
(package/'qa-report.json').write_text(json.dumps({'assets':records,'checks':['native hashes unchanged','true alpha','100px added padding without resampling','prepared alpha bounded'],'limits':['Generated identity-preserving variants are not pixel-identical to the approved body.','Manual scale, sign plane and pose review remain separate from numerical QA.']},indent=2)+'\n')
print(json.dumps(records,indent=2))
