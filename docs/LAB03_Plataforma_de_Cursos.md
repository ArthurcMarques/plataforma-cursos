# LAB03 - Plataforma de Cursos Online

## 1. Objetivo
Desenvolver a interface funcional de uma Plataforma de Cursos Online, aplicando conceitos de:
- estruturação semântica com HTML5  
- estilização responsiva com Bootstrap 5  
- manipulação dinâmica de dados utilizando JavaScript (ES6+)  

Foco:
- criação de formulários de cadastro  
- listagens dinâmicas  
- simulação de persistência de dados em memória  

---

## 2. Contexto do Estudo de Caso
A plataforma visa gerenciar:
- ciclo de vida acadêmico e financeiro de alunos e instrutores  

O sistema deve lidar com:
- hierarquia de conteúdo (**Cursos > Módulos > Aulas**)  
- progresso dos usuários  
- organização de Trilhas de Conhecimento  
- gestão de assinaturas e pagamentos  

---

## 3. Requisitos Técnicos

A aplicação deve utilizar obrigatoriamente:

- **HTML5** → estrutura  
- **Bootstrap 5** → layout  
  - Grid System  
  - Cards  
  - Modais  
  - Tabelas  
  - Navbar  
- **JavaScript**
  - Classes → modelagem dos objetos  
  - Funções → lógica de negócio  
  - Eventos → interação com o DOM  

---

## 4. Escopo da Implementação

### A. Módulo Acadêmico e de Conteúdo

#### 1. Gestão de Cursos e Categorias
- Cadastro de:
  - Categorias  
  - Cursos  
  - Trilhas  
- Visualização de relações  
  - Ex: listar cursos de uma categoria  

#### 2. Estrutura de Aulas
- Adicionar:
  - Módulos → dentro de cursos  
  - Aulas → dentro de módulos  
- Respeitar campo **Ordem**

---

### B. Módulo de Usuário e Progresso

#### 1. Cadastro de Usuários e Matrículas
- Tela de registro de usuários  
- Simulação de:
  - matrícula em curso  
  - assinatura de plano  

#### 2. Controle de Progresso
- Marcar conclusão de aulas  
- Geração visual de:
  - certificados  
  - código de verificação  

---

### C. Módulo Financeiro

#### 1. Assinaturas e Pagamentos
- Fluxo de checkout simples  
- Usuário escolhe plano  
- Simulação de pagamento  
- Registro contendo:
  - método de pagamento  
  - ID da transação  

---

## 5. Detalhamento das Entidades (Modelo de Dados)

| Categoria    | Entidades |
|-------------|----------|
| Core        | Usuários, Categorias, Cursos |
| Conteúdo    | Módulos, Aulas |
| Interação   | Matrículas, Progresso_Aulas, Avaliações |
| Curadoria   | Trilhas, Trilhas_Cursos, Certificados |
| Negócio     | Planos, Assinaturas, Pagamentos |

---

## 6. Critérios de Avaliação

- Organização do código  
  - HTML (estrutura)  
  - CSS/Bootstrap (estilo)  
  - JS (comportamento)  

- Uso de Classes JS  
  ```js
  class Curso { ... }
  ```

- Responsividade  
- Validação de dados  
  - eventos JS  
  - validação de e-mail e datas  

---

# Modelo de Dados

## 1. Tabela Usuarios
- ID_Usuario (PK)  
- NomeCompleto  
- Email (Unique)  
- SenhaHash  
- DataCadastro  

---

## 2. Tabela Categorias
- ID_Categoria (PK)  
- Nome (Unique)  
- Descricao  

---

## 3. Tabela Cursos
- ID_Curso (PK)  
- Titulo  
- Descricao  
- ID_Instrutor (FK → Usuarios)  
- ID_Categoria (FK → Categorias)  
- Nivel (Iniciante, Intermediário, Avançado)  
- DataPublicacao  
- TotalAulas  
- TotalHoras  

---

## 4. Tabela Modulos
- ID_Modulo (PK)  
- ID_Curso (FK → Cursos)  
- Titulo  
- Ordem  

---

## 5. Tabela Aulas
- ID_Aula (PK)  
- ID_Modulo (FK → Modulos)  
- Titulo  
- TipoConteudo (Vídeo, Texto, Quiz)  
- URL_Conteudo  
- DuracaoMinutos  
- Ordem  

---

## 6. Tabela Matriculas
- ID_Matricula (PK)  
- ID_Usuario (FK → Usuarios)  
- ID_Curso (FK → Cursos)  
- DataMatricula  
- DataConclusao (Nulável)  

---

## 7. Tabela Progresso_Aulas
- ID_Usuario (PK, FK → Usuarios)  
- ID_Aula (PK, FK → Aulas)  
- DataConclusao  
- Status (Ex: Concluído)  

---

## 8. Tabela Avaliacoes
- ID_Avaliacao (PK)  
- ID_Usuario (FK → Usuarios)  
- ID_Curso (FK → Cursos)  
- Nota (1 a 5)  
- Comentario (Nulável)  
- DataAvaliacao  

---

## 9. Tabela Trilhas
- ID_Trilha (PK)  
- Titulo  
- Descricao  
- ID_Categoria (FK → Categorias)  

---

## 10. Tabela Trilhas_Cursos
- ID_Trilha (PK, FK → Trilhas)  
- ID_Curso (PK, FK → Cursos)  
- Ordem  

---

## 11. Tabela Certificados
- ID_Certificado (PK)  
- ID_Usuario (FK → Usuarios)  
- ID_Curso (FK → Cursos)  
- ID_Trilha (FK → Trilhas, Null)  
- CodigoVerificacao (Unique)  
- DataEmissao  

---

## 12. Tabela Planos
- ID_Plano (PK)  
- Nome (not null)  
- Descricao  
- Preco (not null)  
- DuracaoMeses (not null)  

---

## 13. Tabela Assinaturas
- ID_Assinatura (PK)  
- ID_Usuario (FK → Usuarios, not null)  
- ID_Plano (FK → Planos, not null)  
- DataInicio (not null)  
- DataFim (not null)  

---

## 14. Tabela Pagamentos
- ID_Pagamento (PK)  
- ID_Assinatura (FK → Assinaturas, not null)  
- ValorPago (referente ao plano)  
- DataPagamento (not null)  
- MetodoPagamento (not null)  
- Id_Transacao_Gateway (not null)  


