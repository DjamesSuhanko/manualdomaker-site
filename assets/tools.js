import {rgb565,packMatrix,resistance} from './tool-math.mjs';
const $=id=>document.getElementById(id);
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  try {await navigator.clipboard.writeText($(button.dataset.copy).value);button.textContent='Copiado!';}
  catch {$(button.dataset.copy).select();button.textContent='Selecione e copie o código';}
}));
if($('led-grid')) {
  const bits=Array(96).fill(0);
  function render() {
    [...$('led-grid').children].forEach((button,i)=>button.setAttribute('aria-pressed',String(Boolean(bits[i]))));
    const rows=Array.from({length:8},(_,r)=>'  {'+bits.slice(r*12,r*12+12).join(',')+'}').join(',\n');
    $('matrix-code').value=`uint8_t bitmap[8][12] = {\n${rows}\n};\n\nconst uint32_t frame[3] = {\n  ${packMatrix(bits).map(v=>'0x'+v.toString(16).toUpperCase().padStart(8,'0')).join(',\n  ')}\n};`;
    $('led-count').textContent=`${bits.reduce((a,b)=>a+b,0)} de 96 LEDs acesos`;
  }
  bits.forEach((_,i)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`Linha ${Math.floor(i/12)+1}, coluna ${i%12+1}`);button.addEventListener('click',()=>{bits[i]^=1;render();});$('led-grid').append(button);});
  $('clear-matrix').onclick=()=>{bits.fill(0);render();};
  $('invert-matrix').onclick=()=>{bits.forEach((_,i)=>bits[i]^=1);render();};render();
}
if($('red')) {
  const fields=['red','green','blue'].map($);
  function update(source) {
    let values;
    if(source==='hex'||source==='picker') {
      const hex=$(source==='hex'?'hex-color':'color-picker').value.replace(/^#/,'');
      if(!/^[a-f\d]{6}$/i.test(hex)) return fail('Informe seis dígitos hexadecimais (com ou sem #).');
      values=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16));
    } else { values=fields.map(f=>f.value.trim()===''?NaN:Number(f.value)); }
    try {
      const value=rgb565(...values),hex='#'+values.map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
      fields.forEach((f,i)=>f.value=values[i]);$('hex-color').value=hex;$('color-picker').value=hex;
      $('color-swatch').style.background=hex;$('rgb-result').value='0x'+value.toString(16).toUpperCase().padStart(4,'0');$('rgb-decimal').textContent=`Decimal: ${value}`;$('rgb-error').textContent='';
      document.querySelector('[data-copy="rgb-result"]').disabled=false;
    } catch(e){fail(e.message);}
  }
  function fail(message){$('rgb-error').textContent=message;$('rgb-result').value='';$('rgb-decimal').textContent='';document.querySelector('[data-copy="rgb-result"]').disabled=true;}
  fields.forEach(f=>f.addEventListener('input',()=>update('decimal')));$('hex-color').addEventListener('input',()=>update('hex'));$('color-picker').addEventListener('input',()=>update('picker'));update('decimal');
}
if($('digit-one')) {
  const fields=['digit-one','digit-two','multiplier','tolerance'].map($);
  const format=v=>{const scale=v>=1e9?1e9:v>=1e6?1e6:v>=1e3?1e3:1;return (v/scale).toLocaleString('pt-BR',{maximumSignificantDigits:8})+' '+({1:'Ω',1000:'kΩ',1000000:'MΩ',1000000000:'GΩ'}[scale]);};
  function update(){const [a,b,m,t]=fields.map(f=>Number(f.value));const result=resistance(a,b,m,t);$('resistor-result').textContent=`${format(result.value)} ± ${t.toLocaleString('pt-BR')}%`;$('resistor-range').textContent=`Faixa de tolerância: ${format(result.min)} a ${format(result.max)}`;$('resistor-series').textContent=result.e12?'Valor pertencente à série E12.':'Valor fora da série E12; pode pertencer a outra série.';document.querySelectorAll('.resistor-body i').forEach((band,i)=>band.style.background=fields[i].selectedOptions[0].dataset.color);}
  fields.forEach(f=>f.addEventListener('change',update));update();
}
