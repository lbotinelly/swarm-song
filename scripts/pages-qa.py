"""Asset integrity, real blackout pixels, master PCM, deliverable metadata and review sheets."""
from pathlib import Path
import hashlib,json,subprocess,wave
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'assets/milestone4'
REVIEW=BASE/'review'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
records=[]
for p in sorted((BASE/'masters').glob('*.png')):
    im=Image.open(p)
    records.append({'file':str(p.relative_to(ROOT)).replace('\\','/'),'sha256':sha(p),'nativeDimensions':list(im.size),'mode':im.mode})
(BASE/'native-manifest.json').write_text(json.dumps(records,indent=2)+'\n')
for record in json.loads((ROOT/'assets/characters/agent407/concepts/core-quality-report.json').read_text()):
    assert sha(ROOT/'assets/characters/agent407/concepts'/record['file'])==record['sha256']
for r in json.loads((BASE/'manifest.json').read_text())['assets']:
    assert sha(ROOT/r['source'])==r['sourceSha256']
    assert sha(ROOT/r['output'])==r['outputSha256']
    im=Image.open(ROOT/r['output']);assert im.mode=='RGBA'
    assert list(im.size)==r['outputDimensions']
    assert im.getchannel('A').getbbox()==tuple(r['alphaBounds'])
for name in ['apartment-interior-v1','second-apartment-v1','second-apartment-v2','edge-city-v2','gpu-valley-ground-v1']:
    assert sha(BASE/'masters'/f'{name}.png')==sha(ROOT/'public/milestone4'/f'{name}.png')
black=[]
for f in [480,510,539,540]:
    im=Image.open(REVIEW/f'A-{f}.png').convert('RGB')
    extrema=im.getextrema();assert all(v==(0,0) for v in extrema),(f,extrema)
    black.append({'frame':f,'rgbExtrema':extrema})
assert json.loads((REVIEW/'determinism.json').read_text())['match']
master=ROOT/'assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav'
with wave.open(str(master),'rb') as w:
    w.setpos(126*w.getframerate());expected=w.readframes(31*w.getframerate())
with wave.open(str(ROOT/'public/milestone4/transition-master.wav'),'rb') as w:
    assert w.getframerate()==48000 and w.getnchannels()==2 and w.getnframes()==31*48000
    assert w.readframes(w.getnframes())==expected
videos=[]
for letter in 'ABC':
    path=REVIEW/f'treatment-{letter}.mp4'
    if path.exists():
        data=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))
        v=next(s for s in data['streams'] if s['codec_type']=='video')
        assert (v['width'],v['height'],v['r_frame_rate'],v['nb_frames'])==(1920,1080,'30/1','930')
        assert any(s['codec_type']=='audio' for s in data['streams'])
        # Decode every black frame, not merely source PNG samples. H.264 limited-range black decodes to RGB0.
        raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-vf','select=between(n\\,480\\,539)','-fps_mode','passthrough','-f','rawvideo','-pix_fmt','gray','-'])
        assert len(raw)==60*1920*1080 and max(raw)==0
        videos.append({'file':path.name,'sha256':sha(path),'frames':930,'fps':30,'durationSeconds':float(data['format']['duration']),'decodedBlackFrames':60,'decodedBlackMaxGray':max(raw)})
assert len(videos)==3,'Render all three MP4s before final QA'
def sheet(name,items,cols=3):
    w,h=480,300
    canvas=Image.new('RGB',(w*cols,h*((len(items)+cols-1)//cols)),'#17252e');draw=ImageDraw.Draw(canvas)
    for i,(path,label) in enumerate(items):
        im=Image.open(path).convert('RGBA');im.thumbnail((w-20,h-40))
        x=(i%cols)*w+(w-im.width)//2;y=(i//cols)*h+10
        canvas.paste(im,(x,y),im)
        draw.text(((i%cols)*w+12,(i//cols)*h+h-24),label,fill='#f4e8d3')
    canvas.save(REVIEW/name)
for letter in 'ABC':
    shared=[('A-60','Goodbye / set-down'),('A-150','Organizer'),('A-240','Objector'),('A-435','Goggles alone'),('A-510','True black')]
    specific=[(f'{letter}-{f}',f'{letter} / {f/30:.2f}s') for f in [570,610,655,700,750,775]]
    ending=[('A-800','New neighborhood'),('A-855','Under the quilt'),('A-929','Awake / ungoggled')]
    sheet(f'treatment-{letter}-frames.jpg',[(REVIEW/f'{p}.png',label) for p,label in shared+specific+ending])
sheet('concepts.jpg',[(ROOT/'public/milestone4/gpu-edge-tower-v3.png','One outward-facing stack'),(BASE/'masters/apartment-interior-v1.png','First home / cache'),(BASE/'masters/edge-city-v2.png','Twilight city'),(REVIEW/'A-570.png','Pop-up book study'),(REVIEW/'A-800.png','Dawn approach study'),(BASE/'masters/second-apartment-v2.png','Different second home')])
sheet('awakening-match.jpg',[(REVIEW/'first-awakening-match.png','Earlier box / composition reference'),(REVIEW/'A-929.png','Second apartment / new morning')],2)
(REVIEW/'technical-qa.json').write_text(json.dumps({'approvedCoreMastersUnchanged':True,'nativeAssets':len(records),'generatedPromptCount':len(json.loads((BASE/'prompts.json').read_text())),'sourceBlackFrames':black,'masterPcmExact':True,'videos':videos,'motionPerceptionReviewed':False},indent=2)+'\n')
print(json.dumps({'nativeAssets':len(records),'videosVerified':len(videos),'blackout':'source pixels + every encoded blackout frame','masterPcmExact':True}))
