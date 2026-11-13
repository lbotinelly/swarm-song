// Static review compositions only. Reuse the production image/anchor mapping.
import {AbsoluteFill, Composition, Img, registerRoot, staticFile} from 'remotion';
import {agent407, attachmentPoint, type AnchorName} from '../src/sprites';

const names = ['goggles-v1.png','question-mark-v1.svg','surprise-rays-v1.png','music-note-a-v1.png','music-note-b-v1.png','wrench-v1.png'];
const labels = ['Goggles / detachable prop','Question / editable typography','Three surprise rays','Music note A / independent','Music note B / independent','Wrench / detachable prop'];
const palette = ['#fbf3e4','#243b49'];
const title = {position:'absolute' as const,left:50,top:32,fontFamily:'Arial, sans-serif',fontSize:32,color:'#59483c'};

const Pack = ({production=false}:{production?:boolean}) => <AbsoluteFill style={{background:'#eae1d0'}}>
  <div style={title}>SWARM SONG / {production?'production derivatives / light and dark QA':'first detachable pack / art review'}</div>
  {(production?['standing','kneeling','singing','surprised','cheer','walking'].map(p=>p+'-v1.png'):names).map((name,i)=><div key={name} style={{position:'absolute',left:30+i%3*590,top:110+Math.floor(i/3)*625,width:560,height:590}}>
    {palette.map((color,j)=><div key={color} style={{position:'absolute',left:j*280,top:0,width:280,height:510,background:color}}>
      <Img src={staticFile((production?'characters/agent407/':'accessories/')+name)} style={{position:'absolute',left:5,top:55,width:270,height:360,objectFit:'contain'}}/>
    </div>)}
    <div style={{position:'absolute',top:530,left:12,fontFamily:'Arial, sans-serif',fontSize:23,color:'#59483c'}}>{production?name+' / 1400 x 1500':labels[i]}</div>
  </div>)}
</AbsoluteFill>;

const poses = Object.keys(agent407) as (keyof typeof agent407)[];
const Placement = ({gogglesOnly=false}:{gogglesOnly?:boolean}) => <AbsoluteFill style={{background:'#eae1d0'}}>
  <div style={title}>SWARM SONG / {gogglesOnly?'goggles fit / six poses / later-story prop':'anchor placement review / not a story sequence'}</div>
  {poses.map((pose,i)=>{
    const sprite = agent407[pose], scale=.36;
    const [fx,fy] = sprite.anchors.footPivot.map(n=>n*scale);
    const attach = (name:string, anchor:AnchorName, width:number,height:number, offset:readonly[number,number]=[0,0], pivot:readonly[number,number]=[.5,.5]) => {
      const [x,y]=attachmentPoint(sprite,anchor,scale,offset);
      const angle = name==='goggles-v1.png'?sprite.mountDegrees.head:name==='wrench-v1.png'?sprite.mountDegrees.leftHand+7:0;
      return <Img key={name} src={staticFile('accessories/'+name)} style={{position:'absolute',left:x-width*pivot[0],top:y-height*pivot[1],width,height,objectFit:'contain',transformOrigin:`${pivot[0]*100}% ${pivot[1]*100}%`,transform:`rotate(${angle}deg)`}}/>;
    };
    return <div key={pose} style={{position:'absolute',left:30+i%3*590,top:110+Math.floor(i/3)*730,width:560,height:690,background:i%2?palette[1]:palette[0],borderRadius:16}}>
      <div style={{position:'absolute',left:270,top:590}}>
        {!gogglesOnly && pose==='walking' && attach('wrench-v1.png','leftHand',270,249,[0,0],[.60,.70])}
        <Img src={staticFile(sprite.src)} style={{position:'absolute',left:-fx,top:-fy,width:sprite.width*scale,height:sprite.height*scale}}/>
        {(gogglesOnly||pose==='standing') && attach('goggles-v1.png','head',320,320*1087/1974,[0,10])}
        {!gogglesOnly && pose==='kneeling' && attach('question-mark-v1.svg','head',115,115,[430,-90])}
        {!gogglesOnly && pose==='surprised' && attach('surprise-rays-v1.png','head',190,175,[430,-50])}
        {!gogglesOnly && (pose==='singing'||pose==='cheer') && <>{attach('music-note-a-v1.png','mouth',105,97,[420,-200])}{attach('music-note-b-v1.png','mouth',85,83,[520,-380])}</>}
      </div>
      <div style={{position:'absolute',left:20,bottom:35,fontFamily:'Arial, sans-serif',fontSize:22,color:i%2?'#fbf3e4':'#59483c'}}>{pose}{gogglesOnly?` / head ${sprite.mountDegrees.head}°`:pose==='standing'?' / later-story goggles test':''}</div>
    </div>;
  })}
</AbsoluteFill>;

const Question = () => <AbsoluteFill><Img src={staticFile('accessories/question-mark-v1.svg')} style={{width:1024,height:1024}}/></AbsoluteFill>;
registerRoot(()=><>
  <Composition id="AccessoryPack" component={Pack} width={1800} height={1400} fps={30} durationInFrames={1}/>
  <Composition id="ProductionReview" component={Pack} defaultProps={{production:true}} width={1800} height={1400} fps={30} durationInFrames={1}/>
  <Composition id="AccessoryPlacement" component={Placement} width={1800} height={1600} fps={30} durationInFrames={1}/>
  <Composition id="GogglesFit" component={Placement} defaultProps={{gogglesOnly:true}} width={1800} height={1600} fps={30} durationInFrames={1}/>
  <Composition id="QuestionPreview" component={Question} width={1024} height={1024} fps={30} durationInFrames={1}/>
</>);
