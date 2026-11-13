// Preview cues in milliseconds. Integrate speed analytically so direct seeking
// and rendering out of order produce the same gentle coast to rest.
export function fanPower(ms:number) {
 const seconds=Math.max(0,ms)/1000;
 const x=Math.max(0,Math.min(4,seconds-3));
 const turnsTime=Math.min(seconds,3)+x-x**3/16+x**4/128;
 const fade=Math.max(0,Math.min(1,(seconds-3)/1.5));
 return {angleTop:-8+12*turnsTime,angleBottom:13+9*turnsTime,darkness:fade*fade*(3-2*fade)};
}
