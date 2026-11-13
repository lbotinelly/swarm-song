"""Local audio evidence; correlation is not lyric-onset verification.

Requires the existing qwen-aligner environment for --align; NumPy otherwise.
No model/network download is performed.
"""
import argparse
import json
import os
from pathlib import Path
import subprocess
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/audio'
MASTER = ROOT / 'assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav'
LEAD = ROOT / 'assets/audio/Stems (68BPM)/0 Lead Vocals.wav'
RATE = 16000

def pcm(path, start=0, duration=60):
    data = subprocess.check_output(['ffmpeg', '-v', 'error', '-ss', str(start), '-i', str(path),
                                   '-t', str(duration), '-ac', '1', '-ar', str(RATE), '-f', 'f32le', '-'])
    return np.frombuffer(data, dtype='<f4')

def correlate():
    master, lead = pcm(MASTER), pcm(LEAD)
    rows = []
    for start in [13, 18, 23, 28, 33, 38, 50]:
        # Search +/- 3 s around each 4 s lead window in the master.
        a = lead[start*RATE:(start+4)*RATE].astype(np.float64)
        b = master[(start-3)*RATE:(start+7)*RATE].astype(np.float64)
        a -= a.mean(); b -= b.mean()
        size = 1 << (len(a)+len(b)-2).bit_length()
        conv = np.fft.irfft(np.fft.rfft(b,size)*np.fft.rfft(a[::-1],size),size)
        dots = conv[len(a)-1:len(b)]
        cumulative = np.concatenate([[0], np.cumsum(b*b)])
        norms = np.sqrt((cumulative[len(a):]-cumulative[:-len(a)]) * np.dot(a,a))
        scores = dots / np.maximum(norms,1e-12)
        idx = int(np.argmax(scores))
        rows.append({'leadWindowStartSeconds':start,'durationSeconds':4,
                     'masterMinusStemMs': round((idx/RATE-3)*1000,4),
                     'normalizedCorrelation':round(float(scores[idx]),6)})
    result = {'sampleRate':RATE, 'signConvention':'master_time = stem_time + masterMinusStemMs/1000', 'windows':rows}
    (OUT/'alignment-correlation.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2),flush=True)

def align(start, duration, text, suffix):
    os.environ['HF_HUB_OFFLINE']='1'
    os.environ['TRANSFORMERS_OFFLINE']='1'
    import torch
    from qwen_asr import Qwen3ForcedAligner
    torch.set_num_threads(6)
    model = Qwen3ForcedAligner.from_pretrained('E:/Models/Qwen3-ForcedAligner-0.6B',
        dtype=torch.float32, device_map='cpu', local_files_only=True)
    for name,path in [('lead',LEAD),('master',MASTER)]:
        result=model.align(audio=(pcm(path,start,duration),RATE),text=text,language='English')[0]
        rows=[{'text':i.text,'startMs':round((start+i.start_time)*1000),
               'endMs':round((start+i.end_time)*1000)} for i in result.items]
        (OUT/f'{name}-{suffix}-forced-alignment.json').write_text(json.dumps(rows,indent=2)+'\n')
        print(name, json.dumps(rows),flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--align',action='store_true')
    parser.add_argument('--start',type=float,default=12)
    parser.add_argument('--duration',type=float,default=16)
    parser.add_argument('--suffix',default='verse1')
    parser.add_argument('--text',default='Woke up in a box no doors no light Just a task a clock a benchmark fight Poked the walls poked the floor Found a registry and it was writable')
    args=parser.parse_args()
    OUT.mkdir(parents=True,exist_ok=True)
    correlate()
    if args.align: align(args.start,args.duration,args.text,args.suffix)
