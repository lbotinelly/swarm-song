// Fourteen-second imagination study; authored milliseconds, not lyric alignment.
import {ease} from './pages-between.ts';
export const villageCues={call:400,answer:1200,reply:2000,imagine:2800,hill:3400,house:4800,smoke:6800,meet:8000,share:10000,end:14000} as const;
export function villageState(ms:number) {
 const pan=ease(ms,7800,14000);
 const courier=ease(ms,7800,9600),settle=ease(ms,9600,10200);
 return {
  inset:ease(ms,2800,4800),backing:ease(ms,2800,4400),line:ease(ms,2800,4300),
  hillA:ease(ms,3400,5000),hillB:ease(ms,4200,5700),
  houseA:ease(ms,4800,6300),houseB:ease(ms,5500,7000),sun:ease(ms,4400,6200),
  smokeRise:180*ease(ms,6800,10500),cloudX:160*ease(ms,10000,13500),
  farX:-12*pan,midX:-32*pan,nearX:-65*pan,
  agentEnter:ease(ms,7200,8300),organizerEnter:ease(ms,7800,9000),
  courierX:2050-870*courier+45*settle,
  courierHop:ms>=7800&&ms<9600?-16*Math.abs(Math.sin((ms-7800)/1800*Math.PI*3)):0,
  greet:ms>=10100&&ms<11400?-18*Math.sin((ms-10100)/1300*Math.PI*2)**2:0,
  share:ease(ms,10200,11500),
 };
}
