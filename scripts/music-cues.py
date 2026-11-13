"""Small offline cue study: existing FFmpeg/NumPy, local stem matching, no models.

Selections are editorial hypotheses. Measurements are not listening approval.
The master clock and all existing lyric cues remain untouched.
"""
import hashlib, html, json, runpy, subprocess, sys
from pathlib import Path
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'assets/milestone7'; additions='--additions' in sys.argv
if not additions and (BASE/'music-playback-feedback.json').exists():
    raise SystemExit('V4 timing has playback approval. Preserve its map; use --additions for further candidates.')
OUT=BASE/('music-additions' if additions else 'music-review'); OUT.mkdir(exist_ok=True)
h=runpy.run_path(str(ROOT/'scripts/audio-investigate.py')); pcm=h['pcm']; RATE=h['RATE']
master=pcm(h['MASTER'],0,262.8)
stems={p.stem:pcm(p,0,264.24) for p in (ROOT/'assets/audio/Stems (68BPM)').glob('*.wav')}
summed=sum(stems.values())
def envelope(x):
    n=RATE//20
    raw=np.sqrt(np.mean(x[:len(x)//n*n].reshape(-1,n)**2,axis=1))
    return np.convolve(raw,np.ones(8)/8,'same')
env={name:envelope(x) for name,x in stems.items()}; env['master']=envelope(master)

def match(center):
    start=max(0,center-.6); lo=max(0,start-3)
    a=summed[round(start*RATE):round((start+1.2)*RATE)].astype(float)
    b=master[round(lo*RATE):min(len(master),round((start+4.2)*RATE))].astype(float)
    a-=a.mean();b-=b.mean()
    n=1<<(len(a)+len(b)-2).bit_length()
    dots=np.fft.irfft(np.fft.rfft(b,n)*np.fft.rfft(a[::-1],n),n)[len(a)-1:len(b)]
    cumulative=np.r_[0,np.cumsum(b*b)]
    scores=dots/np.maximum(np.sqrt(np.maximum(0,cumulative[len(a):]-cumulative[:-len(a)])*np.dot(a,a)),1e-12)
    i=int(np.argmax(scores))
    return dict(stemCenterMs=round(center*1000),offsetMs=round((lo+i/RATE-start)*1000),correlation=round(float(scores[i]),4))

# Narrow, evidence-informed search windows, not a beat grid or a new event detector.
# role/action describe proposed direction, never a fact inferred from amplitude alone.
selections=[
 ('strings-intro','7 Strings',7,10,'Strings unfold','curiosity','swell'),
 ('strings-home','7 Strings',35,37,'Strings warm the phrase','connection','swell'),
 ('strings-first-bloom','7 Strings',40,43,'String swell','belonging opens up','swell'),
 ('strings-second-lift','7 Strings',47,50,'Strings lift again','anticipation','swell'),
 ('drums-chorus','2 Drums',54,56,'Drum accent','celebration','hop'),
 ('synth-answer','8 Synth',61,63,'Synth accent','playful reply','sway'),
 ('brass-break','10 Brass',71,73,'Brass flourish','instrumental exuberance','hop'),
 ('brass-answer','10 Brass',78,80,'Brass answer','playful continuation','hop'),
 ('strings-turn','7 Strings',81,83.5,'Strings crest','turn toward the next verse','swell'),
 ('bass-withdraws','3 Bass',112,113.3,'Bass accent / release','space opens for goodbye','settle'),
 ('keys-goodnight','5 Keyboard',128,130,'Keyboard accent','tender farewell','sway'),
 ('drums-farewell','2 Drums',137,138.5,'Drum accent under farewell','keep the goodbye moving','settle'),
 ('synth-bridge','8 Synth',148.5,150,'Synth rises through the bridge','anticipation returns','swell'),
 ('synth-awakening','8 Synth',153.5,155.5,'Synth / rhythm crest','renewed motion','swell'),
 ('keys-discovery','5 Keyboard',169,171,'Keyboard accent','quiet curiosity','sway'),
 ('synth-inheritance','8 Synth',183.5,185.5,'Synth entrance','recognition','swell'),
 ('strings-inheritance','7 Strings',193,195,'Strings gather','connection across generations','swell'),
 ('drums-final','2 Drums',214,217,'Full rhythm accent','shared joy','hop'),
 ('brass-final','10 Brass',230,231.5,'Brass / woodwind color','last playful flourish','hop'),
 ('bass-release','3 Bass',235.5,237,'Last bass phrase','room for the names','settle'),
 ('keys-outro','5 Keyboard',257,259,'Keyboard outro','afterglow','sway'),
 ('strings-last','7 Strings',260.5,262.5,'Final string swell','a warm last breath','swell'),
]
if additions:
    selections=[
      ('strings-early-note','7 Strings',31,33,'Early string lift','the first connection','swell'),
      ('keys-middle','5 Keyboard',97.5,100,'Keyboard accent','playful momentum','sway'),
      ('percussion-goodbye','6 Percussion',119.5,122,'Percussion detail','a little movement in the quiet','sway'),
      ('keys-old-note','5 Keyboard',176,179,'Keyboard lift','finding an old note','sway'),
      ('keys-reprise','5 Keyboard',197,199,'Keyboard lift','recognition grows','swell'),
    ]
timeline=json.loads((BASE/'timeline.json').read_text(encoding='utf-8'))
prior_lags=json.loads((BASE/'evidence/local-stem-lags.json').read_text())['windows']
cues=[]
for ident,stem,a,b,label,role,action in selections:
    e=env[stem];peak=int(np.argmax(e[round(a*20):round(b*20)]))+round(a*20)
    stem_time=peak/20
    matches=[match(stem_time+d) for d in [-.4,0,.4]]
    # Require local agreement, rather than allowing a repeated drum pattern to pick a remote beat.
    clusters=[[r for r in matches if abs(r['offsetMs']-seed['offsetMs'])<=100] for seed in matches]
    best=max(clusters,key=lambda c:(len(c),sum(r['correlation'] for r in c)))
    offset=round(float(np.median([r['offsetMs'] for r in best])))
    score=float(np.median([r['correlation'] for r in best]))
    reliable=len(best)>=2 and score>=.3
    nearby=min(prior_lags,key=lambda r:abs(r['leadStartMs']-stem_time*1000))
    prior_conflict=abs(nearby['leadStartMs']-stem_time*1000)<=10000 and abs(nearby['masterMinusStemMs']-offset)>400
    reliable=reliable and not prior_conflict
    uncertainty=max(250,round(max(abs(r['offsetMs']-offset) for r in best)+50)) if reliable else 1500
    apex=max(0,min(262799,round(stem_time*1000)+offset))
    # Local envelope valley before the peak; artistic bounds stay short and reviewable.
    search=max(0,peak-40); valley=search+int(np.argmin(e[search:peak]))
    start=max(apex-2400,min(apex-450,round(valley*50)+offset))
    end=min(262800,apex+(1300 if action=='swell' else 1600))
    section=next(s['id'] for s in timeline['sections'] if s['startMs']<=apex<s['endMs'])
    cue=dict(id=ident,sectionId=section,startMs=start,peakMs=apex,endMs=end,label=label,
      emotionalRole=role,action=action,status='candidate-awaiting-listening',enabled=reliable,
      confidence='medium' if reliable else 'low',uncertaintyMs=uncertainty,
      evidence=dict(stem=stem,stemPeakMs=round(stem_time*1000),localOffsetMs=offset,
        localMatches=matches,agreeingWindows=len(best),correlation=round(score,4),
        conflictingPriorLag=bool(prior_conflict),
        smoothedStemRms=round(float(e[peak]),6),riseDbAboveMinus70DbFloor=round(float(20*np.log10(max(e[peak],.000316)/max(e[valley],.000316))),2)),
      interpretation='Proposed animation/emotional reading; stem label is not proof of a specific instrument such as cello.')
    cues.append(cue)
cues.sort(key=lambda c:c['peakMs'])
result=dict(version=1,clock='absolute master-relative integer milliseconds',durationMs=262800,
 master=timeline['master'],masterSha256=timeline['masterSha256'],lyricTimeline='timeline.json',
 lyricTimelineSha256=hashlib.sha256((BASE/'timeline.json').read_bytes()).hexdigest(),
 status='signal-derived candidates; human listening review pending',manualListeningPerformed=False,
 method='16kHz mono analysis only; 50ms RMS blocks smoothed over400ms. Three local1.2s summed-stem waveform correlations within +/-3s; two offsets must agree within100ms and median correlation>=0.3. Conflict >400ms with prior lead-lag evidence within10s disables animation. No universal stem offset and no audio time-warp.',
 limitations=['Emotional role and gestures are authored interpretations, not measured emotion.','Stem separation can contain leakage; Strings is not a confirmed cello identification.','Short local matching can still pick repeated motifs; uncertainty is not a statistical confidence interval.','Low-confidence matches remain in the map but do not drive animation.','Selected cues are a first review pass, not an exhaustive arrangement transcription.'],cues=cues)
(BASE/('musical-cue-additions.json' if additions else 'musical-cues.json')).write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')

# Small standalone SVG overview: independent normalization, no loudness comparison between lanes.
names=['master','7 Strings','10 Brass','2 Drums','3 Bass','5 Keyboard','8 Synth']
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="770" viewBox="0 0 1600 770"><rect width="1600" height="770" fill="#fff8e9"/>',
 '<g font-family="sans-serif" fill="#3b514f"><text x="30" y="32" font-size="22">Swarm Song | measured envelopes + candidate cue peaks</text><text x="30" y="57" font-size="14">Master clock for markers. Stem traces remain on their OWN clock; see each local offset. Each lane normalized independently.</text>']
for lane,name in enumerate(names):
    e=env[name];e=e/max(float(e.max()),1e-8);y=115+lane*85
    pts=' '.join(f'{160+i*.1/262.8*1400:.1f},{y+55-v*52:.1f}' for i,v in enumerate(e[::2]))
    svg.append(f'<text x="20" y="{y+30}" font-size="16">{html.escape(name)}</text><polyline points="{pts}" fill="none" stroke="#498c85" stroke-width="1.2"/>')
for seconds in range(0,263,20):
    x=160+seconds/262.8*1400;svg.append(f'<path d="M{x}90V710" stroke="#d2c9b9"/><text x="{x}" y="735" font-size="14">{seconds}s</text>')
for i,c in enumerate(cues):
    x=160+c['peakMs']/262800*1400;color='#b65f43' if c['enabled'] else '#999'
    svg.append(f'<path d="M{x}90V710" stroke="{color}" stroke-dasharray="3 6" opacity=".6"/><text x="{x}" y="{82 if i%2 else 98}" font-size="12">{i+1}</text>')
svg.append('</g></svg>');(OUT/'cue-map.svg').write_text(''.join(svg),encoding='utf-8')
rows=[];markdown=['# Musical cue map — first listening pass','', 'Candidate timings; emotional roles are proposed direction. Existing approved captions are unchanged.','', '| # | Master peak | Cue | Proposed role / action | Local match |','|---|---:|---|---|---|']
for i,c in enumerate(cues):
    t=c['peakMs']/1000;clipstart=max(0,t-3);duration=min(7,262.8-clipstart)
    clip=OUT/f"{c['id']}.mp3"
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(clipstart),'-i',str(h['MASTER']),'-t',str(duration),'-c:a','libmp3lame','-b:a','192k',str(clip)],check=True)
    state='candidate' if c['enabled'] else 'uncertain — animation disabled'
    markdown.append(f"| {i+1} | {t:.3f}s | {c['label']} | {c['emotionalRole']} / {c['action']} | {state}; ±{c['uncertaintyMs']}ms |")
    rows.append(f'''<article><button data-time="{max(0,t-3)}">{i+1}. {t:.3f}s · {html.escape(c['label'])}</button><p>{html.escape(c['emotionalRole'])} → {c['action']}. {state}; estimated ±{c['uncertaintyMs']}ms. Stem peak {c['evidence']['stemPeakMs']/1000:.2f}s, local offset {c['evidence']['localOffsetMs']}ms.</p><audio controls preload="none" src="{c['id']}.mp3"></audio><small>Master excerpt starts {clipstart:.3f}s; cue peak is {t-clipstart:.3f}s into this clip.</small></article>''')
(BASE/('MUSICAL_CUE_ADDITIONS.md' if additions else 'MUSICAL_CUES.md')).write_text('\n'.join(markdown)+'\n',encoding='utf-8')
(OUT/'index.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><title>Swarm Song musical cue map</title><style>body{background:#eee4ce;color:#354e4c;font:18px system-ui;max-width:1400px;margin:30px auto;padding:0 20px}video,img{width:100%}video{max-height:60vh}article{background:#fff9ed;margin:16px 0;padding:18px}button{font:inherit;color:#286f76;background:none;border:0;text-align:left;cursor:pointer}small{display:block}audio{width:450px;max-width:100%}</style><h1>Musical cues — listen, watch, refine</h1><p>Signal-derived candidates; emotional roles and agent gestures are proposals. String-stem evidence does not confirm cello. Click a cue to seek the full master video, or listen to its short excerpt.</p><video id="film" controls preload="metadata" src="../review-v5/swarm-song-v5.mp4"></video><img src="cue-map.svg" alt="Measured master and stem energy envelopes with numbered candidate peaks"><p>Stem traces use their original clock; numbered markers use the master clock. Local offsets are listed below. Lane heights are independently normalized.</p>'''+''.join(rows)+'''<script>document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>{const v=document.querySelector('#film');v.currentTime=Number(b.dataset.time);v.play();v.scrollIntoView({behavior:'smooth',block:'center'});});</script></html>''',encoding='utf-8')
for c in cues:print(c['id'],c['peakMs'],c['enabled'],c['evidence']['localOffsetMs'],c['evidence']['correlation'],c['evidence']['agreeingWindows'])
