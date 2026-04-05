# Plataforma de Cursos Online

Projeto academico da disciplina de Tecnologias de Construcao de Software.

Referencia do enunciado:
- `docs/LAB - Plataforma de Cursos.pdf`

## Objetivo

Construir uma plataforma web simples para cadastro e consulta de dados de cursos online, com paginas separadas por entidade.

## Tecnologias

- HTML5
- Bootstrap 5
- JavaScript puro (ES Modules)
- `localStorage` do navegador (persistencia simples, sem backend)

## Estrutura do projeto

```text
plataforma-cursos/
  index.html
  pages/
    categorias.html
    usuarios.html
    cursos.html
    matriculas.html
    modulos.html
    aulas.html
    pagamentos.html
  js/
    main.js
    models/
      Categoria.js
      Usuario.js
      Curso.js
      Matricula.js
    storage/
      localStorage.js
```

## O que ja esta implementado

- Home (`index.html`) com:
  - secao de apresentacao
  - navbar simples
  - cards de acessos rapidos

- Pagina de categorias:
  - cadastro
  - listagem em tabela
  - validacao basica
  - persistencia em `localStorage`

- Pagina de usuarios:
  - cadastro
  - listagem em tabela
  - validacao basica (incluindo formato de e-mail)
  - e-mail salvo em minusculas
  - matricula gerada automaticamente (ID)
  - data de cadastro com valor padrao atual
  - persistencia em `localStorage`

- Pagina de cursos:
  - cadastro
  - listagem em tabela
  - relacionamento com categorias e usuarios (instrutor)
  - selects preenchidos com dados cadastrados
  - data de publicacao com valor padrao atual
  - persistencia em `localStorage`

- Pagina de matriculas:
  - cadastro
  - listagem em tabela
  - relacionamento com usuarios e cursos
  - validacao de campos
  - bloqueio simples de matricula duplicada (mesmo usuario no mesmo curso)
  - persistencia em `localStorage`

## Persistencia compartilhada (padrao do projeto)

Foi criado um utilitario simples em `js/storage/localStorage.js` com duas funcoes:

- `carregarListaDoStorage(chave)`
- `salvarListaNoStorage(chave, lista)`

Cada modelo segue o mesmo padrao:
1. carrega lista do `localStorage` quando o modulo abre;
2. mantem os dados em array em memoria;
3. salva novamente no `localStorage` ao cadastrar.

Chaves usadas atualmente:
- `categorias`
- `usuarios`
- `cursos`
- `matriculas`

Esse mesmo padrao pode ser reutilizado nas proximas entidades (`modulos`, `aulas`, `pagamentos`, etc.).

## Como executar

1. Abra o arquivo `index.html` no navegador.
2. Navegue pelas paginas.
3. Cadastre dados nas telas.

## Fluxo recomendado para testar

1. Cadastrar categorias
2. Cadastrar usuarios
3. Cadastrar cursos (relacionando categoria + instrutor)
4. Cadastrar matriculas (relacionando usuario + curso)

## Observacoes

- Projeto sem backend.
- Projeto sem bibliotecas externas de JavaScript.
- Dados ficam apenas no navegador atual (`localStorage`).

Para limpar os dados salvos:
- Abra o DevTools do navegador e execute `localStorage.clear()` no Console.
