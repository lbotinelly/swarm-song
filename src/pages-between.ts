// Bounded M4 shot script. Milliseconds are authoring units; frames sample absolute time.
export type Treatment = 'A' | 'B' | 'C';
export const pages = {
  durationMs: 31000, masterStartMs: 126000,
  cues: {agent: 700, organizer: 3600, protester: 7000, city: 10500,
    goggles: 12000, gogglesOnly: 14000, black: 16000, history: 18000,
    dawn: 26000, apartment: 27400, wake: 28000, settled: 30200},
  pageTurns: [[19300,20900],[21200,22300],[22500,23300],[23700,25300]],
} as const;
export const unit=(v:number)=>Math.max(0,Math.min(1,v));
export const ease=(t:number,a:number,b:number)=>{const x=unit((t-a)/(b-a));return x*x*(3-2*x);};
export function pagesState(frame:number,fps:number) {
  const ms=frame*1000/fps,c=pages.cues;
  const shot=ms<c.agent?'city-open':ms<c.organizer?'agent':ms<c.protester?'organizer':ms<c.city?'protester':ms<c.goggles?'city-close':ms<c.black?'goggles':ms<c.history?'black':ms<c.dawn?'history':ms<c.apartment?'dawn':'awakening';
  return {ms,shot,black:shot==='black',history:ease(ms,c.history,c.dawn),
    turns:pages.pageTurns.map(([a,b])=>ease(ms,a,b)),
    // Gentle day/night/day changes, without random particles or accumulated simulation.
    night: Math.pow(Math.sin(Math.PI*3*unit((ms-c.history)/(c.dawn-c.history))),2),
    wake:ease(ms,c.wake,c.settled),gogglesLight:1-ease(ms,14800,c.black),
    roomLight:1-ease(ms,12500,c.gogglesOnly)};
}
// A few authored lanes, not a city generator. Perspective travel for treatment B.
export function flyoverTower(ms:number,index:number) {
  const p=unit((ms-18000)/(8000));
  const travel=(p*.92+index/5)%1;
  const z=travel*travel;
  const side=index%2===0?-1:1;
  return {x:960+side*(50+z*1350),y:340+z*1350,width:5+z*950,
    opacity:1}; // Scale emerges at the horizon; no translucent ghost buildings.
}
