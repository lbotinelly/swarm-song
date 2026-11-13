"""Sparse drum/percussion onset candidates, checked locally against the master.
Uses existing FFmpeg/NumPy, no tempo grid or new audio dependencies.
"""
import json,runpy,hashlib,html,sys,subprocess
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[1];BASE=ROOT/'assets/milestone7'
h=runpy.run_path(str(ROOT/'scripts/audio-investigate.py'));pcm=h['pcm'];RATE=h['RATE']
master=pcm(h['MASTER'],0,262.8)
drums=pcm(ROOT/'assets/audio/Stems (68BPM)/2 Drums.wav',0,264.24)
percussion=pcm(ROOT/'assets/audio/Stems (68BPM)/6 Percussion.wav',0,264.24)
x=drums+percussion
n=RATE//100
energy=np.sqrt(np.mean(x[:len(x)//n*n].reshape(-1,n)**2,axis=1))
smooth=np.convolve(energy,np.ones(3)/3,'same')
novelty=np.maximum(0,smooth-np.r_[np.zeros(5),smooth[:-5]])
anchors=json.loads((BASE/'evidence/local-stem-lags.json').read_text())['windows']
cue_map=json.loads((BASE/'musical-cues.json').read_text(encoding='utf-8'))
points=[(r['leadStartMs'],r['masterMinusStemMs']) for r in anchors]
points.extend((c['evidence']['stemPeakMs'],c['evidence']['localOffsetMs']) for c in cue_map['cues'] if c['enabled'])
points.sort();at=np.array([p[0] for p in points]);offsets=np.array([p[1] for p in points])
possible=[]
for i in range(10,len(novelty)-20):
 local=novelty[max(0,i-400):min(len(novelty),i+400)]
 if novelty[i]>=max(.025,float(np.percentile(local,80))) and novelty[i]==max(novelty[i-8:i+9]):possible.append(i)
# Keep distinct accents: at least300ms apart, strongest first. Not every transient is a beat.
chosen=[]
for i in sorted(possible,key=lambda i:novelty[i],reverse=True):
 if all(abs(i-j)>=30 for j in chosen):chosen.append(i)
events=[];rejected=[]
for i in sorted(chosen):
 t=i/100;pred=float(np.interp(t*1000,at,offsets))/1000
 # Only a nearby prior bounds the search; fresh correlation determines the timestamp.
 if min(abs(at-t*1000))>12000:continue
 start=max(0,t-.06);lo=max(0,start+pred-.22)
 a=x[round(start*RATE):round((start+.28)*RATE)].astype(float)
 b=master[round(lo*RATE):min(len(master),round((start+pred+.5)*RATE))].astype(float)
 if len(b)<len(a):continue
 a-=a.mean();b-=b.mean();size=1<<(len(a)+len(b)-2).bit_length()
 dots=np.fft.irfft(np.fft.rfft(b,size)*np.fft.rfft(a[::-1],size),size)[len(a)-1:len(b)]
 c=np.r_[0,np.cumsum(b*b)];scores=dots/np.maximum(np.sqrt(np.maximum(0,c[len(a):]-c[:-len(a)])*np.dot(a,a)),1e-12)
 j=int(np.argmax(scores));score=float(scores[j]);ms=round((t+lo+j/RATE-start)*1000)
 if score<.3 or j<160 or j>len(scores)-160:
  rejected.append(dict(stemMs=round(t*1000),correlation=round(score,3)));continue
 if not 0<=ms<262500:continue
 strength=min(1,float(novelty[i])/.18)
 events.append(dict(atMs=ms,strength=round(strength,3),stemMs=round(t*1000),localOffsetMs=ms-round(t*1000),correlation=round(score,3)))
# Local matching must not produce duplicate accents after the time correction.
clean=[]
for e in sorted(events,key=lambda e:e['correlation'],reverse=True):
 if all(abs(e['atMs']-r['atMs'])>=300 for r in clean):clean.append(e)
clean.sort(key=lambda e:e['atMs'])
data=dict(version=1,status='candidate-awaiting-percussion-playback-review',masterSha256=cue_map['masterSha256'],
 approvedCueMapSha256=hashlib.sha256((BASE/'musical-cues.json').read_bytes()).hexdigest(),
 method='10ms drum+percussion RMS,30ms smoothing,50ms positive rise; local80th-percentile threshold with0.025 floor;300ms spacing. Each transient cross-correlated in a280ms window against master within220ms of locally interpolated lag evidence. Correlation>=0.3; search-edge hits rejected. No fixed BPM or globally shifted stem.',
 uncertaintyMs=80,notes=['These are selected percussion accents, not a complete beat transcription.','Interpolated lag only restricts the local search; every included timestamp has its own master waveform match.','Quiet narrative sections use smaller bops; larger musical gestures take priority.'],events=clean,rejected=rejected)
(BASE/'percussion-cues.json').write_text(json.dumps(data,indent=2)+'\n')
print(len(clean),'master-checked percussion accents;',len(rejected),'weak/edge matches omitted')
for a,b in [(0,40),(40,84),(84,112),(112,153),(153,183),(183,239),(239,263)]:print(a,b,sum(a*1000<=e['atMs']<b*1000 for e in clean))

# Extend the existing static listening gallery, with a separate percussion lane.
extra=json.loads((BASE/'musical-cue-additions.json').read_text(encoding='utf-8'))
all_cues=sorted([(c,'music-review') for c in cue_map['cues']]+[(c,'music-additions') for c in extra['cues']],key=lambda pair:pair[0]['peakMs'])
directed='--director' in sys.argv
version='v6' if directed else 'v5'
if directed:
 direction=json.loads((BASE/'music-director-corrections.json').read_text(encoding='utf-8'))
 assert direction['baselineMapSha256']==hashlib.sha256((BASE/'musical-cues.json').read_bytes()).hexdigest()
 all_cues=[({**c,**direction['overrides'].get(c['id'],{})},'director-audio' if c['id'] in direction['overrides'] else folder) for c,folder in all_cues]
 all_cues.extend((c,'director-audio') for c in direction['newCues']);all_cues.sort(key=lambda pair:pair[0]['peakMs'])
 (BASE/'musical-cues-v6.json').write_text(json.dumps({**cue_map,'version':6,'status':'Baseline candidates plus director-guided presentation; revised playback pending','directionSource':'music-director-corrections.json','cues':[c for c,_ in all_cues]},indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
 (BASE/'director-audio').mkdir(exist_ok=True)
 for c,folder in all_cues:
  if folder!='director-audio':continue
  start=max(0,c['peakMs']/1000-3)
  subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(h['MASTER']),'-t',str(min(7,262.8-start)),'-c:a','libmp3lame','-b:a','192k',str(BASE/folder/(c['id']+'.mp3'))],check=True)
 clean=[e for e in clean if e['atMs']>=direction['percussion']['startMs'] and not any(r['startMs']<=e['atMs']<r['endMs'] for r in direction['percussion']['rests'])]
review=BASE/f'review-{version}';review.mkdir(exist_ok=True)
svg=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 160" role="img" aria-label="Major cue and percussion timestamps"><rect width="1400" height="160" fill="#fff9e9"/><g font-family="sans-serif" font-size="14" fill="#355f64"><text x="12" y="35">Moments</text><text x="12" y="100">Percussion</text>']
for i,(c,folder) in enumerate(all_cues):
 x=120+c['peakMs']/262800*1250
 svg.append(f'<g data-time="{max(0,c["peakMs"]/1000-3)}" style="cursor:pointer"><circle cx="{x}" cy="35" r="5" fill="#b76b49"/><text x="{x}" y="{19 if i%2 else 61}">{i+1}</text></g>')
for event in clean:
 x=120+event['atMs']/262800*1250
 svg.append(f'<path d="M{x}80V{90+25*event["strength"]}" stroke="#498e8a"/>')
for t in range(0,263,20):svg.append(f'<text x="{120+t/262.8*1250}" y="145">{t}s</text>')
svg.append('</g></svg>')
cards=[]
for i,(c,folder) in enumerate(all_cues):
 label='DIRECTOR CUE' if folder=='director-audio' else 'NEW CANDIDATE' if folder=='music-additions' else 'V4 TIMING RETAINED' if c['enabled'] else 'HELD FOR REVIEW'
 cards.append(f'<article><button data-time="{max(0,c["peakMs"]/1000-3)}">{i+1}. {c["peakMs"]/1000:.3f}s · {html.escape(c["label"])}</button><p>{label} · {html.escape(c["emotionalRole"])}</p><audio controls preload="none" src="../{folder}/{c["id"]}.mp3"></audio></article>')
page='''<!doctype html><html lang="en"><meta charset="utf-8"><title>Swarm Song — percussion and expanded cues</title><style>body{max-width:1400px;margin:30px auto;padding:0 20px;background:#eee4ce;color:#355f64;font:18px system-ui}video,svg{width:100%}video{max-height:60vh}article{background:#fff9e9;padding:16px;margin:14px 0}button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}audio{max-width:100%}</style><h1>A little more music in the bunny</h1><p>V4 timings retained. Five additional moments and 283 master-checked percussion accents are new listening candidates. Small bops yield to larger gestures and soften through goodbye. No fixed BPM grid.</p><video id="film" controls preload="metadata" src="swarm-song-v5.mp4"></video>'''+''.join(svg)+''.join(cards)+'''<script>document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>{const v=document.querySelector('#film');v.currentTime=Number(b.dataset.time);v.play();v.scrollIntoView({behavior:'smooth',block:'center'});});</script></html>'''
if directed:
 page=page.replace('<h1>','<p><a href="../pattern-review/index.html">Whole-song spectral-pattern audition: examples beyond the supplied timestamps</a></p><h1>',1)
 page=page.replace('swarm-song-v5.mp4','swarm-song-v6.mp4').replace('V4 timings retained. Five additional moments and 283 master-checked percussion accents are new listening candidates. Small bops yield to larger gestures and soften through goodbye. No fixed BPM grid.','Director pass: later swell peaks, anticipation pauses, a second brass flourish, and the big chorus. Bopping starts after14s and rests through both pauses. Caption timing and original measurements remain unchanged.')
(review/'index.html').write_text(page,encoding='utf-8')
