"""Build inspectable candidates; never overwrite reviewed timing corrections."""
import json,re,hashlib,wave,copy
from pathlib import Path
from difflib import SequenceMatcher
from PIL import ImageFont
ROOT=Path(__file__).resolve().parents[1];BASE=ROOT/'assets/milestone7'
def read(p):return json.loads(Path(p).read_text(encoding='utf-8-sig'))
def norm(t):return re.sub(r'[^a-z0-9]','',t.lower())
lines=[' '.join(x.split()) for x in (ROOT/'assets/lyrics.txt').read_text(encoding='utf-8').split('---')[-1].splitlines() if x.strip() and not x.startswith('[')]
windows=read(BASE/'alignment-windows.json'); font=ImageFont.truetype(str(ROOT/'public/fonts/FingerPaint.ttf'),1000)
phrases=[];issues=[]
corrections=read(BASE/'reviewed-corrections.json')
for win in windows:
 rows=read(BASE/'evidence'/f"{win['id']}-qwen.json")
 expected=[]
 for li in range(win['firstLine'],win['endLine']):
  expected += [(li,t) for t in lines[li].split() if norm(t)]
 mapping={}
 for b in SequenceMatcher(None,[norm(t) for _,t in expected],[norm(r['text']) for r in rows],autojunk=False).get_matching_blocks():
  for k in range(b.size):mapping[b.a+k]=rows[b.b+k]
 # Tighter-window evidence is kept separately; compare instead of silently replacing.
 for li in range(win['firstLine'],win['endLine']):
  focused=BASE/'evidence'/f'line-{li+1:02d}-qwen.json'
  if focused.exists():
   fr=read(focused);indices=[i for i,(n,t) in enumerate(expected) if n==li]
   for block in SequenceMatcher(None,[norm(expected[i][1]) for i in indices],[norm(r['text']) for r in fr],autojunk=False).get_matching_blocks():
    for k in range(block.size):
     idx=indices[block.a+k];candidate=dict(fr[block.b+k]);old=mapping.get(idx)
     candidate['crosscheckDeltaMs']=abs(old['startMs']-candidate['startMs']) if old else None
     candidate['focusedEvidence']=str(focused.relative_to(BASE)).replace('\\','/')
     mapping[idx]=candidate
 words=[]
 for i,(li,t) in enumerate(expected):
  r=mapping.get(i); flags=[]
  if r is None:
   flags.append('unmatched-token'); prev=next((mapping[j]['endMs'] for j in range(i-1,-1,-1) if j in mapping),win['startMs']); r=dict(startMs=prev,endMs=prev)
  a,b=r['startMs'],r['endMs']
  if r.get('crosscheckDeltaMs',0) is not None and r.get('crosscheckDeltaMs',0)>240:flags.append('context-onset-disagreement')
  if b<=a:flags.append('collapsed-boundary')
  if b-a>1800:flags.append('long-or-sustained-word')
  if a<=win['startMs']+80:flags.append('window-edge-onset')
  if norm(t)=='writable':flags.append('known-onset-disagreement-26800-to-27260')
  word=dict(id=f'line-{li+1:02d}-word-{sum(x[0]==li for x in expected[:i])+1:02d}',text=t,startMs=a,endMs=b,widthEm=round(font.getlength(t)/1000,4),status='unresolved' if flags else ('crosschecked-candidate' if r.get('crosscheckDeltaMs',9999)<=160 else 'machine-candidate'),confidence='low' if flags else 'medium',issues=flags,evidence=r.get('focusedEvidence',f"evidence/{win['id']}-qwen.json"),emphasis=False)
  if word['id'] in corrections.get('words',{}):
   fix=corrections['words'][word['id']]
   assert fix['status']=='human-reviewed' and fix.get('source') and fix.get('approval')
   assert 0<=fix['startMs']<fix['endMs']<=262800
   word['machineCandidate']={k:word[k] for k in ['startMs','endMs','status','issues']}
   word.update(startMs=fix['startMs'],endMs=fix['endMs'],status='human-reviewed',confidence='human-reviewed',issues=[],review=fix)
  if flags:issues.append(dict(id=word['id'],text=t,issues=flags))
  words.append((li,word))
 for li in range(win['firstLine'],win['endLine']):
  ww=[w for idx,w in words if idx==li]
  groups=[ww]
  if li==3:groups=[ww[:3],ww[3:]]
  if li in [13,47]:groups=[ww[:3],ww[3:]]
  if li==49:groups=[ww[:5],ww[5:]]
  for gi,group in enumerate(groups):
   if not group:continue
   a=min(w['startMs'] for w in group);b=max(w['endMs'] for w in group)
   mode='hero' if li in [8,10,37,42,44,48,50] else 'surprise' if li in [3,17,33,38] and (li!=3 or gi==1) else 'read-ahead'
   for w in group:w['emphasis']=norm(w['text']) in ['box','light','registry','writable','hello','swarm','anyway','running','goodnight','phaseone','no','mine','names'] or w is group[-1]
   phrases.append(dict(id=f'phrase-{li+1:02d}-{gi+1}',sourceLine=li+1,sectionId=win['id'],text=' '.join(w['text'] for w in group),startMs=a,endMs=b,words=group,status='unresolved' if any(w['issues'] for w in group) else 'machine-candidate',confidence='candidate; listening required',vocalLayer='backing-candidate' if li==49 and gi==1 else 'lead',mode=mode,layout='lower-center',lineBreakAfter=({0:[5],1:[5],2:[3],4:[3],5:[3],6:[3],7:[4],8:[3],10:[4],11:[4],12:[3],14:[4],16:[5],18:[3],19:[2],20:[3],21:[3],22:[4],23:[5],24:[2],25:[2],28:[3],29:[3],30:[5],31:[5],32:[3],33:[3],34:[4],37:[4],39:[3],42:[3],44:[4],45:[4],46:[3],48:[4],49:[4],50:[4],51:[2]}.get(li,[]) if len(groups)==1 else []),presentation=dict(startMs=max(0,a-(0 if mode=='surprise' else 600)),endMs=b+240),evidence=f"evidence/{win['id']}-qwen.json"))
# Independently protected human-approved phrase cues, never emitted by the aligner.
corrections=read(BASE/'reviewed-corrections.json')
for p in phrases:
 if p['id'] in corrections['phrases']:
  fix=corrections['phrases'][p['id']];p['startMs']=fix['startMs'];p['presentation']['startMs']=fix['startMs']-(0 if p['mode']=='surprise' else 600);p['phraseOnsetReview']=fix
# Presentation-only response to Leo's playback notes; acoustic evidence stays intact.
for i,p in enumerate(phrases):
 gap=p['startMs']-(phrases[i-1]['endMs'] if i else 0)
 lead=0 if p['mode']=='surprise' else (250 if gap>=1800 else 600)
 p['presentation']['startMs']=max(0,p['startMs']-lead)
 p['presentation']['readAheadMs']=lead
 p['presentation']['precedingVocalGapMs']=gap
# Clear older arrangements after incoming group is above it in draw order.
for i,p in enumerate(phrases[:-1]):
 following=phrases[i+1]['presentation']['startMs']
 p['presentation']['endMs']=max(max(w['startMs'] for w in p['words']),min(p['presentation']['endMs'],max(p['presentation']['startMs']+220,following+120)))
# Protected director-authored presentation overrides run after automated defaults.
for p in phrases:
 if p['id'] in corrections.get('presentation',{}):
  fix=corrections['presentation'][p['id']]
  for key in ['startMs','endMs']:
   if key in fix:p['presentation'][key]=fix[key]
  p['presentation']['readAheadMs']=p['startMs']-p['presentation']['startMs']
  p['presentation']['review']={'status':'director-guided-editorial-estimate','source':'Leo playback feedback, November13,2026','reason':fix['reason']}
# Preserve source lyrics; apply the user's confirmed transcription amendment explicitly.
amendment=corrections.get('editorial',{}).get('firstRunning')
if amendment:
 p=next(p for p in phrases if p['id']==amendment['phraseId'])
 i=next(i for i,w in enumerate(p['words']) if w['id']==amendment['splitWordId'])
 second=p['words'][i];original=copy.deepcopy(second);third=copy.deepcopy(second)
 second['endMs']=amendment['splitMs'];third.update(id=amendment['insertId'],startMs=amendment['splitMs'])
 for w in [second,third]:
  w.update(status='unresolved',confidence='count confirmed; boundary estimated',issues=['split-boundary-estimated-from-user-count'],evidence='reviewed-corrections.json:editorial.firstRunning',machineCandidate=original)
 p['words'].insert(i+1,third);p['text']=' '.join(w['text'] for w in p['words']);p['editorialReview']=amendment;p['status']='unresolved'
 issues=[dict(id=w['id'],text=w['text'],issues=w['issues']) for p in phrases for w in p['words'] if w['issues']]
sections=[('intro',0,13000),('opening',13000,42000),('community',42000,71000),('instrumental',71000,83500),('comic',83500,111700),('goodbye',111700,140500),('sleep',140500,153000),('awakening',153000,182600),('inheritance',182600,207500),('final-chorus',207500,240000),('ledger',240000,250000),('outro',250000,262800)]
master=ROOT/'assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav'
with wave.open(str(master)) as f:audio=dict(frames=f.getnframes(),sampleRate=f.getframerate(),channels=f.getnchannels(),sampleWidth=f.getsampwidth())
result=dict(version=2,presentationDefaults=dict(layout='lower-center',exitMs=150,longPauseThresholdMs=1800,longPauseReadAheadMs=250,readAheadMs=600),clock='absolute master-relative integer milliseconds',durationMs=262800,master=str(master.relative_to(ROOT)).replace('\\','/'),masterSha256=hashlib.sha256(master.read_bytes()).hexdigest(),audio=audio,sections=[dict(id=id,startMs=a,endMs=b,instrumental=id in ['intro','instrumental','sleep','outro'],status='machine-candidate',note='Section boundaries and instrumental classification require listening; reverberation/backing vocals may extend.') for id,a,b in sections],phrases=phrases)
(BASE/'timeline.json').write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
(BASE/'timing-issues.json').write_text(json.dumps(dict(wordIssues=issues,editorialDisagreements=['Leo confirmed four first-chorus running repetitions. Original lyrics retained; explicit amendment applied. Second candidate span split at midpoint pending precise listening.','Whisper repeats the names line during outro, potentially hallucinated; not added without listening evidence.','Whisper duplicates Goodnight and My friends; supplied lyric occurrences retained pending listening.','Backing running response is represented in its own phrase, overlap and word count need listening.'],humanListeningPerformed=False),indent=2)+'\n',encoding='utf-8')
print(len(phrases),'phrases;',sum(len(p['words']) for p in phrases),'words;',len(issues),'flagged words')
