# Manual do Maker — nova casa

Modelo independente para aprovação de Djames Suhanko. O site e o repositório antigos foram preservados. **Não é a migração completa do acervo.**

Prévia: https://djamessuhanko.github.io/manualdomaker-site/

## Tecnologia

HTML estático gerado com Python e Markdown, CSS responsivo e JavaScript apenas para busca, filtros e cópia de código. Sem servidor, banco de dados ou framework no navegador. Deploy automático por GitHub Actions no GitHub Pages. As fontes Google Fonts são opcionais: fontes locais substitutas mantêm a leitura se o serviço estiver indisponível.

## Rodar localmente

Use Python 3.12 ou mais recente com suporte a venv.

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
BASE_PATH='' python build.py
python -m http.server 8000 --directory dist
```

Abra http://localhost:8000. Em produção o workflow define automaticamente o caminho do GitHub Pages.

## Editar

- `assets/style.css`: aparência e comportamento responsivo.
- `content/articles.json`: seleção de links para o blog original. Os resumos foram redigidos para esta prévia; as ilustrações são abstratas, não fotografias dos projetos.
- `content/*.md`: artigos locais. Comece com `Title: Título do artigo`, `Category: Assunto` e `Description: Resumo`, uma propriedade por linha, seguidas de uma linha vazia. O artigo entra automaticamente na página inicial, na busca e nos filtros. O nome do arquivo determina `/artigos/nome/`.
- `build.py`: estrutura das páginas; suporta listas, tabelas, blocos de código e índice automático dos artigos.

A busca na página inicial cobre os seis links selecionados e os artigos locais nesta prévia, não todo o acervo. O artigo demonstrativo não representa conteúdo previamente publicado pelo autor.

## Migração futura (após aprovação)

1. Inventariar fontes do Gatsby, dados externos, rotas, imagens, anexos e repositórios citados. Confirmar quais conteúdos estão realmente no Git e quais dependem de serviços.
2. Exportar o conteúdo e manter um manifesto de origem → destino, com cópia de segurança.
3. Migrar um lote piloto; preservar os caminhos `/article/.../` existentes, títulos, autoria, datas, imagens e links internos. Validar também paginação, categorias e acentos.
4. Conferir exemplos de código, links de repositórios, textos alternativos e direitos de imagens.
5. Implementar índice completo de busca, RSS, sitemap, canonical e metadados sociais com o domínio definitivo. Remover `noindex` apenas no lançamento aprovado.
6. Testar URLs, leitura mobile, acessibilidade, páginas 404 e tempo de carregamento. GitHub Pages não suporta redirecionamentos HTTP personalizados; preservar URLs é preferível a redirecionamentos em HTML.
7. Após aprovação explícita, configurar o domínio, HTTPS e DNS. Validar o resultado antes de desativar a hospedagem anterior e manter possibilidade de retorno.

Não há CNAME, alteração de DNS, rastreamento ou migração automática neste modelo. Todas as páginas da prévia usam `noindex` para evitar competição com o blog atual.
