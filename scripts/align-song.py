"""Offline, master-relative forced alignment. Reuses the established local Qwen model."""
import os,json,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
import runpy
helpers=runpy.run_path(str(Path(__file__).with_name('audio-investigate.py')))
pcm,MASTER,RATE=[helpers[k] for k in ['pcm','MASTER','RATE']]
os.environ['HF_HUB_OFFLINE']='1'
os.environ['TRANSFORMERS_OFFLINE']='1'
import torch
from qwen_asr import Qwen3ForcedAligner
torch.set_num_threads(6)
model=Qwen3ForcedAligner.from_pretrained('E:/Models/Qwen3-ForcedAligner-0.6B',dtype=torch.float32,device_map='cpu',local_files_only=True)
windows=json.loads(Path(sys.argv[1] if len(sys.argv)>1 else 'assets/milestone7/alignment-windows.json').read_text(encoding='utf-8-sig'))
for w in windows:
    dest=Path('assets/milestone7/evidence')/(w['id']+'-qwen.json')
    if dest.exists(): continue
    result=model.align(audio=(pcm(MASTER,w['startMs']/1000,(w['endMs']-w['startMs'])/1000),RATE),text=w['text'],language='English')[0]
    rows=[dict(text=i.text,startMs=round(w['startMs']+i.start_time*1000),endMs=round(w['startMs']+i.end_time*1000)) for i in result.items]
    dest.write_text(json.dumps(rows,indent=2)+'\n',encoding='utf-8')
    print(w['id'],len(rows),'words',flush=True)
