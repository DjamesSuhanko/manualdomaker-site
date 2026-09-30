const input = document.querySelector('#search');
const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.card')];
let category = 'Todos';
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function filter() {
 const query = normalize(input.value.trim());
 let count = 0;
 cards.forEach(card => { const match = (category === 'Todos' || card.dataset.category === category) && normalize(card.dataset.search).includes(query); card.hidden = !match; if(match) count++; });
 document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'artigo encontrado' : 'artigos encontrados'}`;
 document.querySelector('#empty').hidden = count !== 0;
}
filters.forEach(button => button.addEventListener('click', () => {category = button.dataset.filter; filters.forEach(b => b.setAttribute('aria-pressed', String(b === button))); filter();}));
input?.addEventListener('input',filter);
document.querySelectorAll('pre:has(code)').forEach(pre => {
 const button = document.createElement('button');button.className = 'copy';button.textContent = 'Copiar';button.setAttribute('aria-label','Copiar código');pre.append(button);
 button.addEventListener('click', async () => {try {await navigator.clipboard.writeText(pre.querySelector('code').textContent);button.textContent='Copiado!';} catch {button.textContent='Selecione para copiar';} setTimeout(()=>button.textContent='Copiar',2500);});
});
