import assert from 'node:assert/strict';
import {rgb565,packMatrix,resistance} from '../assets/tool-math.mjs';
assert.equal(rgb565(255,0,0),0xF800);assert.equal(rgb565(0,255,0),0x07E0);assert.equal(rgb565(0,0,255),0x001F);assert.equal(rgb565(255,255,255),0xFFFF);assert.equal(rgb565(0,0,0),0);
for(const v of [-1,256,NaN,1.5]) assert.throws(()=>rgb565(v,0,0));
assert.deepEqual(packMatrix(Array(96).fill(1)),[0xffffffff,0xffffffff,0xffffffff]);
for(const i of [0,31,32,63,64,95]){const bits=Array(96).fill(0);bits[i]=1;const expected=[0,0,0];expected[Math.floor(i/32)]=(2**(31-i%32))>>>0;assert.deepEqual(packMatrix(bits),expected);}
assert.equal(resistance(4,7,2,5).value,4700);assert.equal(resistance(1,0,-1,5).value,1);assert.equal(resistance(1,0,-2,10).value,.1);assert.equal(resistance(4,7,-2,5).e12,true);assert.equal(resistance(4,8,2,5).e12,false);assert.equal(resistance(4,7,2,5).min,4465);
console.log('RGB565, limites de entrada, ordem dos 96 bits, resistores e E12: OK');
