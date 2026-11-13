"""Extend the existing local stem/master correlation evidence across the song."""
import runpy,json
from pathlib import Path
import numpy as np
h=runpy.run_path(str(Path(__file__).with_name('audio-investigate.py')));rate=h['RATE']
master=h['pcm'](h['MASTER'],0,262.8);lead=h['pcm'](h['LEAD'],0,264.24);rows=[]
for start in [13,28,43,58,84,99,113,128,154,169,184,199,214,229,244]:
 a=lead[start*rate:(start+4)*rate].astype('float64');b=master[(start-3)*rate:(start+7)*rate].astype('float64');a-=a.mean();b-=b.mean()
 size=1<<(len(a)+len(b)-2).bit_length();dots=np.fft.irfft(np.fft.rfft(b,size)*np.fft.rfft(a[::-1],size),size)[len(a)-1:len(b)]
 c=np.r_[0,np.cumsum(b*b)];scores=dots/np.maximum(np.sqrt((c[len(a):]-c[:-len(a)])*np.dot(a,a)),1e-12);idx=int(np.argmax(scores))
 rows.append(dict(leadStartMs=start*1000,durationMs=4000,masterMinusStemMs=round((idx/rate-3)*1000,3),correlation=round(float(scores[idx]),4)))
Path('assets/milestone7/evidence/local-stem-lags.json').write_text(json.dumps(dict(method='Existing normalized waveform cross-correlation, 16 kHz mono, four-second windows, +/-3 seconds search',appliedToTimeline=False,reason='All canonical candidates aligned against master directly; weak correlation and changing lag forbid universal correction.',windows=rows),indent=2)+'\n')
print(rows)
