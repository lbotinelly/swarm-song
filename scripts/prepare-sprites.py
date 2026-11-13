"""Deterministic alpha-only cleanup/padding. Approved source pixels are never resampled."""
from pathlib import Path
import hashlib
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'assets/characters/agent407/concepts'
DEST = ROOT / 'public/characters/agent407'
DEST.mkdir(parents=True, exist_ok=True)
approved = json.loads((SOURCE / 'core-quality-report.json').read_text())
records = []
for entry in approved:
    src = SOURCE / entry['file']
    digest = hashlib.sha256(src.read_bytes()).hexdigest()
    assert digest == entry['sha256'], f'Approved master changed: {src}'
    original = Image.open(src).convert('RGBA')
    # Only remove documented near-transparent noise. Preserve intermediate edge alpha;
    # make almost-opaque interiors solid. RGB for retained pixels is unchanged.
    cleaned = original.copy()
    old_alpha = original.getchannel('A')
    new_alpha = old_alpha.point(lambda a: 0 if a <= 16 else 255 if a >= 250 else a)
    cleaned.putalpha(new_alpha)
    zero = new_alpha.point(lambda a: 255 if a == 0 else 0)
    cleaned.paste((0, 0, 0, 0), mask=zero)
    canvas = Image.new('RGBA', (1400, 1500))
    offset = ((1400-original.width)//2, (1500-original.height)//2)
    canvas.paste(cleaned, offset)  # copy RGBA, not alpha-multiply again
    name = entry['file'].replace('kneeling-v2', 'kneeling-v1')
    output = DEST / name
    canvas.save(output)
    box = canvas.getchannel('A').getbbox()
    assert box
    padding = [box[0]/1400, box[1]/1500, (1400-box[2])/1400, (1500-box[3])/1500]
    assert min(padding) >= .06, (name, padding)
    # A render derivative must not change any surviving source RGB pixel.
    for before, after in zip(original.get_flattened_data(), cleaned.get_flattened_data()):
        assert after[3] == 0 or before[:3] == after[:3]
    assert hashlib.sha256(src.read_bytes()).hexdigest() == digest
    records.append({'source': src.relative_to(ROOT).as_posix(), 'sourceSha256': digest,
                    'output': output.relative_to(ROOT).as_posix(),
                    'outputSha256': hashlib.sha256(output.read_bytes()).hexdigest(),
                    'sourceDimensions': list(original.size), 'dimensions': list(canvas.size),
                    'offset': list(offset), 'alphaBounds': list(box), 'paddingFractionsLTRB': padding,
                    'alphaExtrema': list(canvas.getchannel('A').getextrema())})
manifest = {'recipe': 'alpha<=16 -> 0; alpha>=250 -> 255; other alpha unchanged; RGB unchanged where visible; zero hidden RGB; centered padding only, no resizing',
            'sprites': records}
(ROOT / 'assets/characters/agent407/production-v1.json').write_text(json.dumps(manifest, indent=2)+'\n', encoding='utf-8')
print('Verified six unchanged masters; wrote six 1400x1500 RGBA derivatives with >=6% clear padding.')
