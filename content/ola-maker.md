Title: Da ideia à bancada: um novo caderno maker
Category: Bastidores
Description: Conheça o modelo de tutorial: leitura confortável, índice de seções e código pronto para copiar.

Este é um **artigo demonstrativo**, criado para avaliar a leitura, os blocos de código e a navegação do novo site. Não é uma migração de um tutorial do acervo.

## O que vamos construir

Um espaço em que cada projeto possa ter uma explicação clara, uma lista de componentes e um repositório com o código utilizado. O texto ajuda a entender as escolhas; os arquivos permitem reproduzir o experimento.

## Antes de começar

Um tutorial deve informar os requisitos e as versões usadas. Neste exemplo, o único requisito para executar o trecho abaixo é o Python 3.

| Item | Finalidade |
| --- | --- |
| Código-fonte | Reproduzir e adaptar o exemplo |
| Passo a passo | Explicar decisões e resultados esperados |
| Repositório | Organizar versões e arquivos do projeto |

## Primeiro experimento

Este pequeno programa transforma uma sequência de etapas em um roteiro de bancada. Copie o código para um arquivo `bancada.py` e execute com `python3 bancada.py`.

```python
etapas = ["Imaginar", "Construir", "Testar", "Compartilhar"]

for numero, etapa in enumerate(etapas, start=1):
    print(f"{numero}. {etapa}")
```

O resultado é uma lista numerada das quatro etapas. O botão no bloco copia o exemplo sem selecionar o texto manualmente.

## Código junto do artigo

Em cada tutorial, um link pode levar ao repositório correspondente. Na migração, esses vínculos serão conferidos para apontar para os arquivos corretos.

[Veja o código deste modelo de site no GitHub](https://github.com/DjamesSuhanko/manualdomaker-site).

## O próximo passo

Depois da aprovação do visual, o trabalho será inventariar o acervo, preservar os endereços e imagens e migrar uma pequena seleção para validar o processo. Só depois vem a migração completa.

> Um bom tutorial não termina quando o circuito funciona: ele também explica por quê.
