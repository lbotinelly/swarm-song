"""Whole-song example search with existing Librosa, not a loudness detector.
Run with F:/Tools/venvs/qwen-aligner/Scripts/python.exe. No downloads or models.
"""
import hashlib,html,json,runpy,subprocess
from pathlib import Path
import librosa
import numpy as np

ROOT=Path(__file__).resolve().parents[1];BASE=ROOT/'assets/milestone7';OUT=BASE/'pattern-review';OUT.mkdir(exist_ok=True)
h=runpy.run_path(str(ROOT/'scripts/audio-investigate.py'));pcm=h['pcm'];sr=h['RATE']
grid=np.arange(2628)/10
baseline=json.loads((BASE/'musical-cues.json').read_text(encoding='utf-8'))
assert hashlib.sha256(Path(h['MASTER']).read_bytes()).hexdigest()==baseline['masterSha256']
reviewed=json.loads((BASE/'musical-cues-v6.json').read_text(encoding='utf-8'))
lags=json.loads((BASE/'evidence/local-stem-lags.json').read_text())['windows']
points=sorted([(r['leadStartMs']/1000,r['masterMinusStemMs']/1000) for r in lags]+[(c['evidence']['stemPeakMs']/1000,c['evidence']['localOffsetMs']/1000) for c in baseline['cues'] if c['enabled']])
times=np.array([p[0] for p in points]);offsets=np.array([p[1] for p in points])
features={};energy={}
for name in ['master','5 Keyboard','7 Strings','10 Brass','2 Drums']:
    path=h['MASTER'] if name=='master' else ROOT/f'assets/audio/Stems (68BPM)/{name}.wav'
    y=pcm(path,0,264.24);S=np.abs(librosa.stft(y,n_fft=2048,hop_length=320))
    contrast=librosa.feature.spectral_contrast(S=S,sr=sr,fmin=125,n_bands=6,quantile=.1)
    flux=librosa.onset.onset_strength(S=librosa.amplitude_to_db(S,ref=1),sr=sr,hop_length=320,center=False)
    flatness=librosa.feature.spectral_flatness(S=S)[0]
    centroid=librosa.feature.spectral_centroid(S=S,sr=sr)[0]
    rms=librosa.feature.rms(S=S,frame_length=2048,hop_length=320)[0]
    # Descriptor trajectories: seven contrasts, flux, log-flatness, log-centroid.
    raw=np.vstack([contrast,flux,np.log10(np.maximum(flatness,1e-8)),np.log2(np.maximum(centroid,1))])
    clock=np.arange(S.shape[1])*320/sr
    if name!='master':clock=clock+np.interp(clock,times,offsets)
    f=np.array([np.interp(grid,clock,np.convolve(row,np.ones(5)/5,'same')) for row in raw]).T
    med=np.median(f,axis=0);scale=np.maximum(np.std(f,axis=0),.01)
    features[name]=np.clip((f-med)/scale,-3,3)
    e=np.interp(grid,clock,rms);energy[name]=e/max(.005,float(np.percentile(e,95)))
    print('Features',name,flush=True)

examples=[
 ('piano-anticipation',23.8,27.4,'5 Keyboard','Piano-led anticipation'),
 ('quiet-response',90.7,94.6,'master','Pause before a response'),
 ('strings-build',39.9,44.5,'7 Strings','String build and release'),
 ('brass-response',69.8,73.5,'10 Brass','Brass flourish / response'),
 ('chorus-build',206.5,213.5,'2 Drums','Ensemble chorus build'),
]
# 90% spectral descriptors,10% energy. Weights are editorial search choices, not learned probabilities.
descriptor_weights=np.array([.45/7]*7+[.2,.125,.125])
results=[]
for ident,a,b,stem,label in examples:
    f=np.column_stack([features['master'],features[stem]])
    weights=np.r_[descriptor_weights*.4,descriptor_weights*.6]
    e=np.column_stack([energy['master'],energy[stem]])
    original=f[round(a*10):round(b*10)];original_energy=e[round(a*10):round(b*10)]
    candidates=[]
    for duration_scale in [.8,1,1.2]:
        size=round(len(original)*duration_scale);t=np.linspace(0,len(original)-1,size)
        template=np.array([np.interp(t,np.arange(len(original)),original[:,j]) for j in range(f.shape[1])]).T
        te=np.array([np.interp(t,np.arange(len(original_energy)),original_energy[:,j]) for j in range(2)]).T
        centered=template-template.mean(axis=0);norm=np.linalg.norm(centered,axis=0)
        for i in range(len(f)-size):
            start=i/10;end=(i+size)/10
            if start<b+1 and end>a-1:continue
            window=f[i:i+size];wc=window-window.mean(axis=0);wn=np.linalg.norm(wc,axis=0)
            corr=(centered*wc).sum(axis=0)/np.maximum(norm*wn,1e-8)
            shape=float(np.sum(weights*corr))
            texture=float(np.sum(weights*np.exp(-.5*(window.mean(axis=0)-template.mean(axis=0))**2)))
            spectral=.7*shape+.3*texture
            ev=e[i:i+size].ravel();tv=te.ravel();ev=ev-ev.mean();tv=tv-tv.mean()
            ec=float(np.dot(ev,tv)/max(np.linalg.norm(ev)*np.linalg.norm(tv),1e-8))
            candidates.append(dict(startMs=round(start*1000),endMs=round(end*1000),score=round(.9*spectral+.1*ec,4),spectralScore=round(spectral,4),energyScore=round(ec,4),durationScale=duration_scale))
    selected=[]
    for row in sorted(candidates,key=lambda r:r['score'],reverse=True):
        if any(abs(row['startMs']-r['startMs'])<8000 for r in selected):continue
        selected.append(row)
        if len(selected)==3:break
    energy_best=max(candidates,key=lambda r:r['energyScore'])
    for rank,row in enumerate(selected,1):
        midpoint=(row['startMs']+row['endMs'])/2
        nearby=[c['id'] for c in reviewed['cues'] if row['startMs']<=c['peakMs']<=row['endMs']]
        row.update(id=f'{ident}-{rank}',family=ident,label=label,exampleStartMs=round(a*1000),exampleEndMs=round(b*1000),stem=stem,rank=rank,nearbyCues=nearby,status='audition candidate; not a confirmed event or emotion',confidence='relative similarity only',energyOnlyBestWindow=[energy_best['startMs'],energy_best['endMs']])
        results.append(row)
    print(label,[(r['startMs']/1000,r['endMs']/1000,r['score']) for r in selected],flush=True)

result=dict(version=1,masterSha256=baseline['masterSha256'],librosaVersion=librosa.__version__,scanRangeMs=[0,262800],
 method='Local Librosa STFT2048/hop320 at16kHz; seven octave-band spectral contrasts(10% peaks/valleys), spectral flux, flatness and centroid. Smooth100ms, compare100ms grid at0.8x/1x/1.2x example duration.90% spectral /10% energy. Rank whole-song windows with8s separation; no emotional classifier.',
 limitations=['Scores rank similarity; they are not calibrated probabilities or exact event boundaries.','Stem descriptors use interpolated local drift evidence for coarse search; master clock is authoritative. Candidate boundaries need local listening/alignment.','Separated stems may contain leakage. Spectral contrast alone cannot identify instruments or emotional meaning.','A top-ranked match may still be weak; the list is an audition queue, not automatic animation instructions.','Existing director cues, captions and source audio remain unchanged.'],examples=[dict(id=i,startMs=round(a*1000),endMs=round(b*1000),stem=s,label=l) for i,a,b,s,l in examples],matches=results)
(BASE/'spectral-pattern-candidates.json').write_text(json.dumps(result,indent=2)+'\n')
cards=[]
for row in results:
    start=max(0,row['startMs']/1000-1.5);duration=min(262.8-start,(row['endMs']-row['startMs'])/1000+3)
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(h['MASTER']),'-t',str(duration),'-c:a','libmp3lame','-b:a','192k',str(OUT/(row['id']+'.mp3'))],check=True)
    overlap=', '.join(row['nearbyCues']) or 'No current cue peak inside this window'
    cards.append(f'<article><button data-time="{start}">{html.escape(row["label"])}: {row["startMs"]/1000:.1f}–{row["endMs"]/1000:.1f}s</button><p>Example {row["exampleStartMs"]/1000:.1f}–{row["exampleEndMs"]/1000:.1f}s · rank {row["rank"]} · spectral score {row["spectralScore"]:.3f} · energy score {row["energyScore"]:.3f}</p><p>{html.escape(overlap)}</p><audio controls preload="none" src="{row["id"]}.mp3"></audio><small>Excerpt starts {start:.1f}s. Similarity candidate; no gesture has been assigned from this score alone.</small></article>')
(OUT/'index.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><title>Swarm Song — spectral pattern audition</title><style>body{max-width:1200px;margin:30px auto;padding:0 20px;background:#eee4ce;color:#355f64;font:18px system-ui}video{width:100%;max-height:60vh}article{background:#fff9e9;padding:20px;margin:16px 0}button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;text-align:left}small{display:block}</style><h1>Examples, then the rest of the song</h1><p>A whole-song search using spectral contrast, flux and tonal texture. Energy is only10% of the score. These15 ranked windows are audition candidates, not confirmed emotional events. Click to seek the master video or listen to the short excerpt.</p><video id="film" controls preload="metadata" src="../review-v6/swarm-song-v6.mp4"></video><p><a href="../review-v6/index.html">Director cue map</a> · <a href="../SPECTRAL_PATTERN_REVIEW.md">Method and limits</a></p>'''+''.join(cards)+'''<script>document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>{const v=document.querySelector('#film');v.currentTime=Number(b.dataset.time);v.play();v.scrollIntoView({behavior:'smooth',block:'center'});});</script></html>''',encoding='utf-8')
