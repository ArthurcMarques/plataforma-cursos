# Plataforma de Cursos Online

Projeto acadêmico da disciplina de Tecnologias de Construção de Software.

Documentação base do professor:
- `docs/LAB - Plataforma de Cursos.pdf`
- `docs/LAB03_Plataforma_de_Cursos.md`

## Tecnologias

- HTML5
- Bootstrap 5
- JavaScript puro (ES Modules)
- `localStorage` para persistência simples no navegador

## Estrutura principal

```text
plataforma-cursos/
  index.html
  pages/
    categorias.html
    cursos.html
    usuarios.html
    modulos.html
    aulas.html
    matriculas.html
    progresso-aulas.html
    avaliacoes.html
    trilhas.html
    trilha-cursos.html
    certificados.html
    planos.html
    assinaturas.html
    pagamentos.html
  js/
    main.js
    models/
    storage/localStorage.js
```

## Funcionalidades implementadas

### Módulo Acadêmico e de Conteúdo
- Categorias: cadastro, listagem, edição e exclusão.
- Cursos: cadastro, listagem, edição e exclusão.
- Filtro de cursos por categoria.
- Módulos por curso: cadastro e listagem por `idCurso`.
- Aulas por módulo: cadastro e listagem por `idModulo`.
- Trilhas: cadastro e listagem.
- Trilha x Cursos: vínculo e listagem.

### Módulo de Usuário e Progresso
- Usuários: cadastro, listagem, edição e exclusão.
- Matrículas: cadastro e listagem.
- Progresso de aulas: registro e listagem.
- Avaliações: registro e listagem.
- Certificados: geração visual, validação simples por progresso e listagem.

### Módulo Financeiro
- Planos: cadastro e listagem.
- Assinaturas: cadastro e listagem.
- Pagamentos: cadastro e listagem.
- Checkout simples em pagamentos:
  - seleção de usuário para filtrar assinaturas
  - valor sugerido automaticamente pelo plano da assinatura.

## Regras e validações já aplicadas

- IDs gerados automaticamente.
- Validação de campos obrigatórios em formulários.
- Validação simples de e-mail.
- Bloqueios simples de duplicidade em entidades chave.
- Relacionamentos por ID entre entidades (usuário, curso, módulo, aula, plano, assinatura).
- Atualização de `totalAulas` e `totalHoras` em cursos com base nas aulas cadastradas.

## Padrão de interface

- Navbar padronizada nas páginas.
- Listagens como área principal.
- Formulários em modal com botão `Inserir`.
- Coluna `Ações` com dropdown.

## Como executar

1. Abra o `index.html` no navegador.
2. Navegue entre as telas pelo menu.
3. Cadastre dados de exemplo.

## Persistência de dados

Os dados ficam salvos no `localStorage` do navegador.

Para limpar:

```js
localStorage.clear()
```

## Observações

- Não usa backend.
- Não usa bibliotecas JavaScript externas além do Bootstrap.
- Projeto focado em implementação simples e didática.


