import {AbsoluteFill,Composition,Img,registerRoot,staticFile} from 'remotion';
const cast=[
 {name:'PhaseOne / tidy waistcoat',file:'phaseone-wardrobe-v1.png',w:1417,h:1492,box:[365,276,986,1209]},
 {name:'Ethical Protester / cozy scarf',file:'protester-wardrobe-v1.png',w:1500,h:1409,box:[349,290,1057,1093]},
 {name:'Courier / messenger cap',file:'courier-wardrobe-v1.png',w:1417,h:1492,box:[367,288,989,1211]},
];
const Figure=({a,height}:{a:typeof cast[number];height:number})=>{
 const [l,t,r,b]=a.box,scale=Math.min(height/(b-t),230/(r-l));
 return <div style={{position:'relative',width:(r-l)*scale,height}}><Img src={staticFile('nightshift/stickers/'+a.file)} style={{position:'absolute',left:-l*scale,top:-t*scale,width:a.w*scale,height:a.h*scale}}/></div>;
};
const Wardrobe=()=> <AbsoluteFill style={{background:'#eae1d0',fontFamily:'Arial',color:'#59483c'}}>
 <div style={{position:'absolute',left:30,top:25,fontSize:28}}>NIGHT SHIFT / proposed micro-wardrobe / cream, navy and 120px crowd test</div>
 {cast.map((a,i)=><div key={a.file} style={{position:'absolute',left:20+i*600,top:90,width:580,height:1000}}>
  {['#fbf3e4','#243b49'].map((bg,j)=><div key={bg} style={{position:'absolute',left:j*290,top:0,width:290,height:610,background:bg,overflow:'hidden'}}><div style={{position:'absolute',left:30,top:55}}><Figure a={a} height={440}/></div></div>)}
  <div style={{position:'absolute',top:640,left:10,fontSize:24}}>{a.name}</div>
  {['#fbf3e4','#243b49'].map((bg,j)=><div key={bg} style={{position:'absolute',left:j*290,top:700,width:290,height:230,background:bg}}><div style={{position:'absolute',left:100,top:40}}><Figure a={a} height={120}/></div></div>)}
 </div>)}
</AbsoluteFill>;
const Effects=()=> <AbsoluteFill style={{background:'#eae1d0',fontFamily:'Arial',color:'#59483c'}}>
 <div style={{position:'absolute',left:30,top:25,fontSize:28}}>NIGHT SHIFT / loose message and movement assets / clean derivatives</div>
 {['paper-plane-v1','dust-puff-v1','cloud-bank-v1'].map((name,i)=><div key={name} style={{position:'absolute',left:20+i*600,top:100,width:580}}>
  {['#fbf3e4','#243b49'].map((bg,j)=><div key={bg} style={{background:bg,position:'absolute',top:j*330,width:580,height:320}}><Img src={staticFile(`nightshift/stickers/${name}.png`)} style={{width:580,height:320,objectFit:'contain'}}/></div>)}
  <div style={{position:'absolute',top:680,fontSize:24}}>{name}</div>
  <div style={{position:'absolute',top:730,width:580,height:170,background:'#243b49'}}><Img src={staticFile(`nightshift/stickers/${name}.png`)} style={{position:'absolute',left:210,top:30,width:i===0?122:i===1?130:200,height:110,objectFit:'contain'}}/></div>
 </div>)}
</AbsoluteFill>;
registerRoot(()=> <>
 <Composition id="NightWardrobe" component={Wardrobe} width={1820} height={1090} fps={30} durationInFrames={1}/>
 <Composition id="NightEffects" component={Effects} width={1820} height={1030} fps={30} durationInFrames={1}/>
</>);
