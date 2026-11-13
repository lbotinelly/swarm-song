// Six-second silent visual-development shot, not a song-synchronized scene.
export const nightSkyCues = {durationMs:6000,flightStartMs:350,flightEndMs:5350} as const;
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
export function nightSkyState(frame:number,fps:number) {
  const ms=frame*1000/fps;
  const t=clamp(ms/nightSkyCues.durationMs), camera=t*t*(3-2*t);
  const flight=clamp((ms-nightSkyCues.flightStartMs)/(nightSkyCues.flightEndMs-nightSkyCues.flightStartMs));
  return {backgroundY:-90+camera*45,cloudY:-100+camera*155,cloudX:-100-camera*65,
    planeX:410+flight*1530,planeY:760-flight*430-65*Math.sin(Math.PI*flight),
    planeWidth:260-flight*35,planeAngle:8-12*Math.sin(Math.PI*flight)};
}
