"""Prepare the small review pack without changing native generated masters."""
from pathlib import Path
import hashlib
import json
import argparse
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--pack', choices=['pack-v1', 'supporting-v1', 'equipped-v1'], default='pack-v1')
pack = parser.parse_args().pack
SOURCE = ROOT / ('assets/characters' if pack == 'equipped-v1' else 'assets/accessories') / pack / 'masters'
DEST = ROOT / ('public/characters/equipped-v1' if pack == 'equipped-v1' else 'public/accessories')
DEST.mkdir(parents=True, exist_ok=True)
records = []
for src in sorted(SOURCE.glob('*.png')):
    digest = hashlib.sha256(src.read_bytes()).hexdigest()
    original = Image.open(src).convert('RGBA')
    cleaned = original.copy()
    alpha = original.getchannel('A').point(lambda a: 0 if a <= 16 else 255 if a >= 250 else a)
    cleaned.putalpha(alpha)
    cleaned.paste((0,0,0,0), mask=alpha.point(lambda a: 255 if a == 0 else 0))
    # Add space without shrinking, cropping or extracting artwork.
    margin = 100
    canvas = Image.new('RGBA', (original.width+2*margin, original.height+2*margin))
    canvas.paste(cleaned, (margin, margin))
    output = DEST / src.name
    canvas.save(output)
    box = canvas.getchannel('A').getbbox()
    assert box and box[0] > 0 and box[1] > 0 and box[2] < canvas.width and box[3] < canvas.height
    assert hashlib.sha256(src.read_bytes()).hexdigest() == digest
    records.append({'source': src.relative_to(ROOT).as_posix(), 'sourceSha256': digest,
                    'nativeDimensions': list(original.size), 'output': output.relative_to(ROOT).as_posix(),
                    'outputDimensions': list(canvas.size), 'outputSha256': hashlib.sha256(output.read_bytes()).hexdigest(),
                    'offset': [margin,margin], 'alphaBounds': list(box)})
(SOURCE.parent / 'manifest.json').write_text(json.dumps({'recipe': 'alpha <=16 ->0; >=250 ->255; other alpha unchanged; hidden RGB zeroed; 100px padding each side; no resizing', 'assets':records},indent=2)+'\n', encoding='utf-8')
print(json.dumps(records,indent=2))
