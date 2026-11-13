// This one set's authored cues, in integer milliseconds; evaluate directly at a frame.
const smooth=(ms:number,a:number,b:number)=>{const p=Math.max(0,Math.min(1,(ms-a)/(b-a)));return p*p*(3-2*p);};
export function paperState(ms:number) {
 return {retreat:smooth(ms,3800,5800),close:smooth(ms,4700,6500),light:1-smooth(ms,7000,8000),camera:smooth(ms,0,3500),approach:smooth(ms,6500,8500),inside:ms>=8500};
}
