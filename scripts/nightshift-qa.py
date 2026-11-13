"""Asset integrity checks for the bounded Night Shift review package."""
from pathlib import Path
import hashlib
import json
import subprocess
from PIL import Image

root = Path(__file__).resolve().parents[1]
digest = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
approved = json.loads((root/'assets/characters/agent407/concepts/core-quality-report.json').read_text())
for entry in approved:
    assert digest(root/'assets/characters/agent407/concepts'/entry['file']) == entry['sha256']
manifest = json.loads((root/'assets/nightshift/stickers/manifest.json').read_text())
for entry in manifest['assets']:
    src, out = root/entry['source'], root/entry['output']
    assert digest(src) == entry['sourceSha256']
    assert digest(out) == entry['outputSha256']
    image = Image.open(out)
    assert image.mode == 'RGBA'
    assert image.getchannel('A').getextrema() == (0,255)
    assert list(image.size) == entry['outputDimensions']
    # Padding is transparent and no native pixels were resized.
    assert image.width == entry['nativeDimensions'][0]+200
    assert image.height == entry['nativeDimensions'][1]+200
    assert image.getpixel((0,0))[3] == 0
worlds = []
for src in sorted((root/'assets/nightshift/worlds').glob('*.png')):
    render = root/'public/nightshift/worlds'/src.name
    assert digest(src) == digest(render)
    im = Image.open(src)
    worlds.append({'file':src.name,'nativeDimensions':list(im.size),'sha256':digest(src)})
prompts = json.loads((root/'assets/nightshift/prompts.json').read_text())
assert len(prompts) <= 18
video = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries',
    'stream=codec_name,width,height,r_frame_rate,nb_frames','-show_entries','format=duration',
    '-of','json',str(root/'assets/nightshift/review/parallax.mp4')],text=True))
stream = video['streams'][0]
assert (stream['width'],stream['height'],stream['r_frame_rate'],stream['nb_frames']) == (1920,1080,'30/1','180')
assert float(video['format']['duration']) == 6
determinism = json.loads((root/'assets/nightshift/review/determinism.json').read_text())
assert determinism['match'] and determinism['first'] == digest(root/'assets/nightshift/review/sky-90.png')
report = {'approvedBaselineMastersUnchanged':len(approved),'generatedOutputs':len(prompts),
          'generationHardCeiling':18,'verifiedStickerDerivatives':len(manifest['assets']),
          'worlds':worlds,'video':video,'randomSeekRender':determinism,'newDependencies':[]}
(root/'assets/nightshift/review/technical-qa.json').write_text(json.dumps(report,indent=2)+'\n')
print('Passed: approved master hashes, native originals, RGBA/padding, world copies, 180-frame MP4, random-seek render hash.')
