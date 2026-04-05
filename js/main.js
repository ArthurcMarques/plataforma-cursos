import { cadastrarCategoria, listarCategorias } from "./models/Categoria.js";
import { cadastrarCurso, listarCursos } from "./models/Curso.js";
import { cadastrarMatricula, listarMatriculas } from "./models/Matricula.js";
import { cadastrarUsuario, listarUsuarios } from "./models/Usuario.js";

const formCategoria = document.getElementById("form-categoria");
const nomeCategoriaInput = document.getElementById("nome-categoria");
const descricaoCategoriaInput = document.getElementById("descricao-categoria");
const tabelaCategoriasBody = document.getElementById("tabela-categorias");

if (formCategoria && nomeCategoriaInput && descricaoCategoriaInput && tabelaCategoriasBody) {
    function renderizarCategorias() {
        const categorias = listarCategorias();
        tabelaCategoriasBody.innerHTML = "";

        if (categorias.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 2;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma categoria cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaCategoriasBody.appendChild(linhaVazia);
            return;
        }

        categorias.forEach((categoria) => {
            const linha = document.createElement("tr");

            const colunaNome = document.createElement("td");
            colunaNome.textContent = categoria.nome;

            const colunaDescricao = document.createElement("td");
            colunaDescricao.textContent = categoria.descricao || "-";

            linha.appendChild(colunaNome);
            linha.appendChild(colunaDescricao);
            tabelaCategoriasBody.appendChild(linha);
        });
    }

    formCategoria.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = nomeCategoriaInput.value.trim();
        const descricao = descricaoCategoriaInput.value.trim();

        if (nome === "") {
            alert("Informe o nome da categoria.");
            nomeCategoriaInput.focus();
            return;
        }

        const nomeJaExiste = listarCategorias().some((categoria) => {
            return categoria.nome.toLowerCase() === nome.toLowerCase();
        });

        if (nomeJaExiste) {
            alert("Ja existe uma categoria com esse nome.");
            nomeCategoriaInput.focus();
            return;
        }

        cadastrarCategoria(nome, descricao);
        renderizarCategorias();
        formCategoria.reset();
        nomeCategoriaInput.focus();
    });

    renderizarCategorias();
}

const formUsuario = document.getElementById("form-usuario");
const nomeUsuarioInput = document.getElementById("nome-usuario");
const emailUsuarioInput = document.getElementById("email-usuario");
const senhaUsuarioInput = document.getElementById("senha-usuario");
const dataCadastroUsuarioInput = document.getElementById("data-cadastro-usuario");
const tabelaUsuariosBody = document.getElementById("tabela-usuarios");

if (
    formUsuario &&
    nomeUsuarioInput &&
    emailUsuarioInput &&
    senhaUsuarioInput &&
    dataCadastroUsuarioInput &&
    tabelaUsuariosBody
) {
    function emailValido(email) {
        return /^\S+@\S+\.\S+$/.test(email);
    }

    function dataAtualFormatoInput() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function definirDataAtualPadrao() {
        dataCadastroUsuarioInput.value = dataAtualFormatoInput();
    }

    function renderizarUsuarios() {
        const usuarios = listarUsuarios();
        tabelaUsuariosBody.innerHTML = "";

        if (usuarios.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 4;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum usuario cadastrado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaUsuariosBody.appendChild(linhaVazia);
            return;
        }

        usuarios.forEach((usuario) => {
            const linha = document.createElement("tr");

            const colunaId = document.createElement("td");
            colunaId.textContent = usuario.id;

            const colunaNome = document.createElement("td");
            colunaNome.textContent = usuario.nomeCompleto;

            const colunaEmail = document.createElement("td");
            colunaEmail.textContent = usuario.email;

            const colunaData = document.createElement("td");
            colunaData.textContent = usuario.dataCadastro;

            linha.appendChild(colunaId);
            linha.appendChild(colunaNome);
            linha.appendChild(colunaEmail);
            linha.appendChild(colunaData);
            tabelaUsuariosBody.appendChild(linha);
        });
    }

    formUsuario.addEventListener("submit", (event) => {
        event.preventDefault();

        const nomeCompleto = nomeUsuarioInput.value.trim();
        const email = emailUsuarioInput.value.trim().toLowerCase();
        const senha = senhaUsuarioInput.value.trim();
        const dataCadastro = dataCadastroUsuarioInput.value;

        if (nomeCompleto === "") {
            alert("Informe o nome completo.");
            nomeUsuarioInput.focus();
            return;
        }

        if (email === "") {
            alert("Informe o e-mail.");
            emailUsuarioInput.focus();
            return;
        }

        if (!emailValido(email)) {
            alert("Informe um e-mail valido.");
            emailUsuarioInput.focus();
            return;
        }

        if (senha === "") {
            alert("Informe a senha.");
            senhaUsuarioInput.focus();
            return;
        }

        if (dataCadastro === "") {
            alert("Informe a data de cadastro.");
            dataCadastroUsuarioInput.focus();
            return;
        }

        const emailJaExiste = listarUsuarios().some((usuario) => {
            return usuario.email === email;
        });

        if (emailJaExiste) {
            alert("Ja existe um usuario com esse e-mail.");
            emailUsuarioInput.focus();
            return;
        }

        cadastrarUsuario(nomeCompleto, email, senha, dataCadastro);
        renderizarUsuarios();
        formUsuario.reset();
        definirDataAtualPadrao();
        nomeUsuarioInput.focus();
    });

    definirDataAtualPadrao();
    renderizarUsuarios();
}

const formCurso = document.getElementById("form-curso");
const tituloCursoInput = document.getElementById("titulo-curso");
const descricaoCursoInput = document.getElementById("descricao-curso");
const nivelCursoSelect = document.getElementById("nivel-curso");
const categoriaCursoSelect = document.getElementById("categoria-curso");
const instrutorCursoSelect = document.getElementById("instrutor-curso");
const dataPublicacaoCursoInput = document.getElementById("data-publicacao-curso");
const tabelaCursosBody = document.getElementById("tabela-cursos");

if (
    formCurso &&
    tituloCursoInput &&
    descricaoCursoInput &&
    nivelCursoSelect &&
    categoriaCursoSelect &&
    instrutorCursoSelect &&
    dataPublicacaoCursoInput &&
    tabelaCursosBody
) {
    function dataAtualFormatoInputCurso() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function definirDataPublicacaoPadrao() {
        dataPublicacaoCursoInput.value = dataAtualFormatoInputCurso();
    }

    function preencherSelectCategorias() {
        categoriaCursoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione uma categoria";
        categoriaCursoSelect.appendChild(opcaoPadrao);

        const categorias = listarCategorias();
        categorias.forEach((categoria) => {
            const opcao = document.createElement("option");
            opcao.value = categoria.id;
            opcao.textContent = categoria.nome;
            categoriaCursoSelect.appendChild(opcao);
        });
    }

    function preencherSelectInstrutores() {
        instrutorCursoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um instrutor";
        instrutorCursoSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            instrutorCursoSelect.appendChild(opcao);
        });
    }

    function buscarNomeCategoria(idCategoria) {
        const categoria = listarCategorias().find((item) => item.id === idCategoria);
        return categoria ? categoria.nome : "-";
    }

    function buscarNomeInstrutor(idInstrutor) {
        const instrutor = listarUsuarios().find((item) => item.id === idInstrutor);
        return instrutor ? instrutor.nomeCompleto : "-";
    }

    function renderizarCursos() {
        const cursos = listarCursos();
        tabelaCursosBody.innerHTML = "";

        if (cursos.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 5;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum curso cadastrado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaCursosBody.appendChild(linhaVazia);
            return;
        }

        cursos.forEach((curso) => {
            const linha = document.createElement("tr");

            const colunaTitulo = document.createElement("td");
            colunaTitulo.textContent = curso.titulo;

            const colunaCategoria = document.createElement("td");
            colunaCategoria.textContent = buscarNomeCategoria(curso.idCategoria);

            const colunaInstrutor = document.createElement("td");
            colunaInstrutor.textContent = buscarNomeInstrutor(curso.idInstrutor);

            const colunaNivel = document.createElement("td");
            colunaNivel.textContent = curso.nivel;

            const colunaAcoes = document.createElement("td");
            const linkModulos = document.createElement("a");
            linkModulos.className = "btn btn-sm btn-outline-secondary";
            linkModulos.href = `./modulos.html?idCurso=${curso.id}`;
            linkModulos.textContent = "Gerenciar módulos";
            colunaAcoes.appendChild(linkModulos);

            linha.appendChild(colunaTitulo);
            linha.appendChild(colunaCategoria);
            linha.appendChild(colunaInstrutor);
            linha.appendChild(colunaNivel);
            linha.appendChild(colunaAcoes);
            tabelaCursosBody.appendChild(linha);
        });
    }

    formCurso.addEventListener("submit", (event) => {
        event.preventDefault();

        const titulo = tituloCursoInput.value.trim();
        const descricao = descricaoCursoInput.value.trim();
        const nivel = nivelCursoSelect.value;
        const idCategoria = Number(categoriaCursoSelect.value);
        const idInstrutor = Number(instrutorCursoSelect.value);
        const dataPublicacao = dataPublicacaoCursoInput.value;

        if (titulo === "") {
            alert("Informe o titulo do curso.");
            tituloCursoInput.focus();
            return;
        }

        if (descricao === "") {
            alert("Informe a descricao do curso.");
            descricaoCursoInput.focus();
            return;
        }

        if (nivel === "") {
            alert("Selecione o nivel do curso.");
            nivelCursoSelect.focus();
            return;
        }

        if (!idCategoria) {
            alert("Selecione a categoria do curso.");
            categoriaCursoSelect.focus();
            return;
        }

        if (!idInstrutor) {
            alert("Selecione o instrutor do curso.");
            instrutorCursoSelect.focus();
            return;
        }

        if (dataPublicacao === "") {
            alert("Informe a data de publicacao.");
            dataPublicacaoCursoInput.focus();
            return;
        }

        cadastrarCurso(titulo, descricao, nivel, idCategoria, idInstrutor, dataPublicacao);
        renderizarCursos();
        formCurso.reset();
        definirDataPublicacaoPadrao();
        tituloCursoInput.focus();
    });

    definirDataPublicacaoPadrao();
    preencherSelectCategorias();
    preencherSelectInstrutores();
    renderizarCursos();
}

const formMatricula = document.getElementById("form-matricula");
const usuarioMatriculaSelect = document.getElementById("usuario-matricula");
const cursoMatriculaSelect = document.getElementById("curso-matricula");
const tabelaMatriculasBody = document.getElementById("tabela-matriculas");

if (formMatricula && usuarioMatriculaSelect && cursoMatriculaSelect && tabelaMatriculasBody) {
    function dataAtualMatricula() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function preencherSelectUsuariosMatricula() {
        usuarioMatriculaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuário";
        usuarioMatriculaSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioMatriculaSelect.appendChild(opcao);
        });
    }

    function preencherSelectCursosMatricula() {
        cursoMatriculaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um curso";
        cursoMatriculaSelect.appendChild(opcaoPadrao);

        const cursos = listarCursos();
        cursos.forEach((curso) => {
            const opcao = document.createElement("option");
            opcao.value = curso.id;
            opcao.textContent = curso.titulo;
            cursoMatriculaSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuario(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarTituloCurso(idCurso) {
        const curso = listarCursos().find((item) => Number(item.id) === Number(idCurso));
        return curso ? curso.titulo : "-";
    }

    function renderizarMatriculas() {
        const matriculas = listarMatriculas();
        tabelaMatriculasBody.innerHTML = "";

        if (matriculas.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 3;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma matrícula cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaMatriculasBody.appendChild(linhaVazia);
            return;
        }

        matriculas.forEach((matricula) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuario(matricula.idUsuario);

            const colunaCurso = document.createElement("td");
            colunaCurso.textContent = buscarTituloCurso(matricula.idCurso);

            const colunaData = document.createElement("td");
            colunaData.textContent = matricula.dataMatricula;

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaCurso);
            linha.appendChild(colunaData);
            tabelaMatriculasBody.appendChild(linha);
        });
    }

    formMatricula.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioMatriculaSelect.value);
        const idCurso = Number(cursoMatriculaSelect.value);

        if (!idUsuario) {
            alert("Selecione o usuário.");
            usuarioMatriculaSelect.focus();
            return;
        }

        if (!idCurso) {
            alert("Selecione o curso.");
            cursoMatriculaSelect.focus();
            return;
        }

        const matriculaDuplicada = listarMatriculas().some((matricula) => {
            return Number(matricula.idUsuario) === idUsuario && Number(matricula.idCurso) === idCurso;
        });

        if (matriculaDuplicada) {
            alert("Esse usuário já está matriculado nesse curso.");
            usuarioMatriculaSelect.focus();
            return;
        }

        cadastrarMatricula(idUsuario, idCurso, dataAtualMatricula());
        renderizarMatriculas();
        formMatricula.reset();
    });

    preencherSelectUsuariosMatricula();
    preencherSelectCursosMatricula();
    renderizarMatriculas();
}

