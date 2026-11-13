"""Build review-only composites; never modify or extract production masters."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets/characters/agent407/concepts'
font_path = Path('C:/Windows/Fonts/arial.ttf')
font = ImageFont.truetype(str(font_path), 26) if font_path.exists() else ImageFont.load_default(size=26)
small = ImageFont.truetype(str(font_path), 19) if font_path.exists() else ImageFont.load_default(size=19)
sheet = Image.new('RGB', (1600, 1140), '#eee6d8')
draw = ImageDraw.Draw(sheet)
draw.text((48, 28), 'SWARM SONG / Agent407 / pose concepts v1', fill='#49362d', font=font)
draw.text((48, 68), 'Art-direction review only / ungoggled / individual native masters preserved', fill='#6d5c50', font=small)
records = []
for col, pose in enumerate(('standing', 'kneeling')):
    path = ART / f'{pose}-v1.png'
    master = Image.open(path)
    assert master.mode == 'RGBA', f'{pose}: requires RGBA'
    alpha = master.getchannel('A')
    bounds = alpha.getbbox()
    visible_bounds = alpha.point(lambda value: 255 if value > 16 else 0).getbbox()
    assert visible_bounds and 0 < visible_bounds[0] < visible_bounds[2] < master.width and 0 < visible_bounds[1] < visible_bounds[3] < master.height
    records.append({'file': path.name, 'native_dimensions': list(master.size), 'mode': master.mode,
                    'alpha_extrema': list(alpha.getextrema()), 'nonzero_alpha_bounds': list(bounds),
                    'visible_alpha_above_16_bounds': list(visible_bounds),
                    'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
    for row, background in enumerate(('#faf3e4', '#243b49')):
        # Alpha-composite at native resolution BEFORE shrinking to avoid hidden-RGB fringes.
        panel = Image.new('RGBA', master.size, background)
        panel.alpha_composite(master)
        panel = panel.convert('RGB')
        panel.thumbnail((670, 420), Image.Resampling.LANCZOS)
        left, top = 48 + col * 776, 132 + row * 494
        draw.rounded_rectangle((left, top, left+728, top+470), radius=16, fill=background)
        sheet.paste(panel, (left + (728-panel.width)//2, top + 8))
        label = f'{pose.title()} / {master.width} x {master.height} / ' + ('light' if row == 0 else 'dark')
        draw.text((left+24, top+435), label, font=small, fill='#49362d' if row == 0 else '#f6ead6')
sheet.save(ART / 'contact-sheet-v1.jpg', quality=95)
(ART / 'quality-report.json').write_text(json.dumps(records, indent=2)+'\n', encoding='utf-8')
print(json.dumps(records, indent=2))
