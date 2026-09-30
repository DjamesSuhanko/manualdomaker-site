export function rgb565(r,g,b) {
  if (![r,g,b].every(v=>Number.isInteger(v)&&v>=0&&v<=255)) throw new RangeError('Use inteiros entre 0 e 255.');
  return ((r>>3)<<11)|((g>>2)<<5)|(b>>3);
}
export function packMatrix(bits) {
  if(bits.length!==96 || !bits.every(v=>v===0||v===1)) throw new RangeError('Esperados 96 bits.');
  const words=[0,0,0];
  bits.forEach((v,i)=>{words[Math.floor(i/32)]=(words[Math.floor(i/32)]|(v<<(31-i%32)))>>>0;});
  return words;
}
export function resistance(a,b,exponent,tolerance) {
  const value=(a*10+b)*10**exponent;
  const normalized=value/10**Math.floor(Math.log10(value));
  const e12=[1,1.2,1.5,1.8,2.2,2.7,3.3,3.9,4.7,5.6,6.8,8.2].some(v=>Math.abs(v-normalized)<1e-8);
  return {value,min:value*(1-tolerance/100),max:value*(1+tolerance/100),e12};
}
