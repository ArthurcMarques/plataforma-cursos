import { cadastrarAula, listarAulas } from "./models/Aula.js";
import { cadastrarAssinatura, listarAssinaturas } from "./models/Assinatura.js";
import { cadastrarCategoria, listarCategorias } from "./models/Categoria.js";
import { cadastrarCertificado, listarCertificados } from "./models/Certificado.js";
import { atualizarTotalAulasCurso, cadastrarCurso, listarCursos } from "./models/Curso.js";
import { cadastrarMatricula, listarMatriculas } from "./models/Matricula.js";
import { cadastrarModulo, listarModulos } from "./models/Modulo.js";
import { cadastrarPlano, listarPlanos } from "./models/Plano.js";
import { cadastrarProgressoAula, listarProgressoAulas } from "./models/ProgressoAula.js";
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

    function contarAulasDoCurso(idCurso) {
        const modulos = listarModulos();
        const aulas = listarAulas();
        let totalAulas = 0;

        modulos.forEach((modulo) => {
            if (Number(modulo.idCurso) !== Number(idCurso)) {
                return;
            }

            aulas.forEach((aula) => {
                if (Number(aula.idModulo) === Number(modulo.id)) {
                    totalAulas += 1;
                }
            });
        });

        return totalAulas;
    }

    function renderizarCursos() {
        const cursos = listarCursos();
        tabelaCursosBody.innerHTML = "";

        if (cursos.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 6;
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

            const totalAulasCalculado = contarAulasDoCurso(curso.id);
            if ((Number(curso.totalAulas) || 0) !== totalAulasCalculado) {
                atualizarTotalAulasCurso(curso.id, totalAulasCalculado);
            }

            const colunaTotalAulas = document.createElement("td");
            colunaTotalAulas.textContent = totalAulasCalculado;

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
            linha.appendChild(colunaTotalAulas);
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

const formModulo = document.getElementById("form-modulo");
const tituloModuloInput = document.getElementById("titulo-modulo");
const ordemModuloInput = document.getElementById("ordem-modulo");
const nomeCursoSelecionado = document.getElementById("nome-curso-selecionado");
const tabelaModulosBody = document.getElementById("tabela-modulos");

if (formModulo && tituloModuloInput && ordemModuloInput && nomeCursoSelecionado && tabelaModulosBody) {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idCursoAtual = Number(parametrosUrl.get("idCurso"));

    function mostrarErroCurso(mensagem) {
        nomeCursoSelecionado.className = "fw-semibold text-danger mb-0";
        nomeCursoSelecionado.textContent = mensagem;
        tabelaModulosBody.innerHTML = "";

        const linhaErro = document.createElement("tr");
        const colunaErro = document.createElement("td");
        colunaErro.colSpan = 3;
        colunaErro.className = "text-center text-danger";
        colunaErro.textContent = mensagem;
        linhaErro.appendChild(colunaErro);
        tabelaModulosBody.appendChild(linhaErro);

        tituloModuloInput.disabled = true;
        ordemModuloInput.disabled = true;
        const botaoCadastrar = formModulo.querySelector("button[type='submit']");
        if (botaoCadastrar) {
            botaoCadastrar.disabled = true;
        }
    }

    const cursoAtual = listarCursos().find((curso) => Number(curso.id) === idCursoAtual);

    if (!idCursoAtual || !cursoAtual) {
        mostrarErroCurso("Curso nao encontrado.");
    } else {
        nomeCursoSelecionado.textContent = cursoAtual.titulo;

        function renderizarModulosCurso() {
            const modulosCurso = listarModulos().filter((modulo) => Number(modulo.idCurso) === idCursoAtual);
            tabelaModulosBody.innerHTML = "";

            if (modulosCurso.length === 0) {
                const linhaVazia = document.createElement("tr");
                const colunaVazia = document.createElement("td");
                colunaVazia.colSpan = 3;
                colunaVazia.className = "text-center text-muted";
                colunaVazia.textContent = "Nenhum modulo cadastrado para este curso.";
                linhaVazia.appendChild(colunaVazia);
                tabelaModulosBody.appendChild(linhaVazia);
                return;
            }

            modulosCurso.forEach((modulo) => {
                const linha = document.createElement("tr");

                const colunaTitulo = document.createElement("td");
                colunaTitulo.textContent = modulo.titulo;

                const colunaOrdem = document.createElement("td");
                colunaOrdem.textContent = modulo.ordem;

                const colunaAcoes = document.createElement("td");
                const linkAulas = document.createElement("a");
                linkAulas.className = "btn btn-sm btn-outline-secondary";
                linkAulas.href = `./aulas.html?idModulo=${modulo.id}`;
                linkAulas.textContent = "Gerenciar aulas";
                colunaAcoes.appendChild(linkAulas);

                linha.appendChild(colunaTitulo);
                linha.appendChild(colunaOrdem);
                linha.appendChild(colunaAcoes);
                tabelaModulosBody.appendChild(linha);
            });
        }

        formModulo.addEventListener("submit", (event) => {
            event.preventDefault();

            const titulo = tituloModuloInput.value.trim();
            const ordem = Number(ordemModuloInput.value);

            if (titulo === "") {
                alert("Informe o titulo do modulo.");
                tituloModuloInput.focus();
                return;
            }

            if (!ordem) {
                alert("Informe a ordem do modulo.");
                ordemModuloInput.focus();
                return;
            }

            const ordemJaExiste = listarModulos().some((modulo) => {
                return Number(modulo.idCurso) === idCursoAtual && Number(modulo.ordem) === ordem;
            });

            if (ordemJaExiste) {
                alert("Ja existe um modulo com essa ordem neste curso.");
                ordemModuloInput.focus();
                return;
            }

            cadastrarModulo(idCursoAtual, titulo, ordem);
            renderizarModulosCurso();
            formModulo.reset();
            tituloModuloInput.focus();
        });

        renderizarModulosCurso();
    }
}

const formAula = document.getElementById("form-aula");
const nomeModulo = document.getElementById("nome-modulo");
const nomeCurso = document.getElementById("nome-curso");
const tituloAulaInput = document.getElementById("titulo-aula");
const tipoConteudoSelect = document.getElementById("tipo-conteudo");
const urlConteudoInput = document.getElementById("url-conteudo");
const duracaoMinutosInput = document.getElementById("duracao-minutos");
const ordemAulaInput = document.getElementById("ordem-aula");
const tabelaAulasBody = document.getElementById("tabela-aulas");

if (
    formAula &&
    nomeModulo &&
    nomeCurso &&
    tituloAulaInput &&
    tipoConteudoSelect &&
    urlConteudoInput &&
    duracaoMinutosInput &&
    ordemAulaInput &&
    tabelaAulasBody
) {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idModuloAtual = Number(parametrosUrl.get("idModulo"));

    function mostrarErroModulo(mensagem) {
        nomeModulo.className = "fw-semibold text-danger mb-1";
        nomeModulo.textContent = mensagem;
        nomeCurso.textContent = "-";
        tabelaAulasBody.innerHTML = "";

        const linhaErro = document.createElement("tr");
        const colunaErro = document.createElement("td");
        colunaErro.colSpan = 4;
        colunaErro.className = "text-center text-danger";
        colunaErro.textContent = mensagem;
        linhaErro.appendChild(colunaErro);
        tabelaAulasBody.appendChild(linhaErro);

        tituloAulaInput.disabled = true;
        tipoConteudoSelect.disabled = true;
        urlConteudoInput.disabled = true;
        duracaoMinutosInput.disabled = true;
        ordemAulaInput.disabled = true;

        const botaoCadastrar = formAula.querySelector("button[type='submit']");
        if (botaoCadastrar) {
            botaoCadastrar.disabled = true;
        }
    }

    const moduloAtual = listarModulos().find((modulo) => Number(modulo.id) === idModuloAtual);

    if (!idModuloAtual || !moduloAtual) {
        mostrarErroModulo("Modulo nao encontrado.");
    } else {
        nomeModulo.textContent = moduloAtual.titulo;

        const cursoRelacionado = listarCursos().find((curso) => {
            return Number(curso.id) === Number(moduloAtual.idCurso);
        });
        nomeCurso.textContent = cursoRelacionado ? cursoRelacionado.titulo : "Curso nao encontrado.";

        function atualizarTotalAulasDoCursoAtual() {
            const idCursoRelacionado = Number(moduloAtual.idCurso);
            if (!idCursoRelacionado) {
                return;
            }

            const modulosDoCurso = listarModulos().filter((modulo) => {
                return Number(modulo.idCurso) === idCursoRelacionado;
            });

            const aulas = listarAulas();
            let totalAulas = 0;

            modulosDoCurso.forEach((modulo) => {
                aulas.forEach((aula) => {
                    if (Number(aula.idModulo) === Number(modulo.id)) {
                        totalAulas += 1;
                    }
                });
            });

            atualizarTotalAulasCurso(idCursoRelacionado, totalAulas);
        }

        function renderizarAulasModulo() {
            const aulasModulo = listarAulas().filter((aula) => Number(aula.idModulo) === idModuloAtual);
            tabelaAulasBody.innerHTML = "";

            if (aulasModulo.length === 0) {
                const linhaVazia = document.createElement("tr");
                const colunaVazia = document.createElement("td");
                colunaVazia.colSpan = 4;
                colunaVazia.className = "text-center text-muted";
                colunaVazia.textContent = "Nenhuma aula cadastrada para este modulo.";
                linhaVazia.appendChild(colunaVazia);
                tabelaAulasBody.appendChild(linhaVazia);
                return;
            }

            aulasModulo.forEach((aula) => {
                const linha = document.createElement("tr");

                const colunaTitulo = document.createElement("td");
                colunaTitulo.textContent = aula.titulo;

                const colunaTipo = document.createElement("td");
                colunaTipo.textContent = aula.tipoConteudo;

                const colunaDuracao = document.createElement("td");
                colunaDuracao.textContent = `${aula.duracaoMinutos} min`;

                const colunaOrdem = document.createElement("td");
                colunaOrdem.textContent = aula.ordem;

                linha.appendChild(colunaTitulo);
                linha.appendChild(colunaTipo);
                linha.appendChild(colunaDuracao);
                linha.appendChild(colunaOrdem);
                tabelaAulasBody.appendChild(linha);
            });
        }

        formAula.addEventListener("submit", (event) => {
            event.preventDefault();

            const titulo = tituloAulaInput.value.trim();
            const tipoConteudo = tipoConteudoSelect.value;
            const urlConteudo = urlConteudoInput.value.trim();
            const duracaoMinutos = Number(duracaoMinutosInput.value);
            const ordem = Number(ordemAulaInput.value);

            if (titulo === "") {
                alert("Informe o titulo da aula.");
                tituloAulaInput.focus();
                return;
            }

            if (tipoConteudo === "") {
                alert("Selecione o tipo de conteudo.");
                tipoConteudoSelect.focus();
                return;
            }

            if (!duracaoMinutos) {
                alert("Informe a duracao em minutos.");
                duracaoMinutosInput.focus();
                return;
            }

            if (!ordem) {
                alert("Informe a ordem da aula.");
                ordemAulaInput.focus();
                return;
            }

            const ordemJaExiste = listarAulas().some((aula) => {
                return Number(aula.idModulo) === idModuloAtual && Number(aula.ordem) === ordem;
            });

            if (ordemJaExiste) {
                alert("Ja existe uma aula com essa ordem neste modulo.");
                ordemAulaInput.focus();
                return;
            }

            cadastrarAula(idModuloAtual, titulo, tipoConteudo, urlConteudo, duracaoMinutos, ordem);
            atualizarTotalAulasDoCursoAtual();
            renderizarAulasModulo();
            formAula.reset();
            tituloAulaInput.focus();
        });

        renderizarAulasModulo();
    }
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

const formProgresso = document.getElementById("form-progresso");
const usuarioProgressoSelect = document.getElementById("usuario-progresso");
const aulaProgressoSelect = document.getElementById("aula-progresso");
const statusProgressoSelect = document.getElementById("status-progresso");
const dataConclusaoInput = document.getElementById("data-conclusao");
const tabelaProgressoBody = document.getElementById("tabela-progresso");

if (
    formProgresso &&
    usuarioProgressoSelect &&
    aulaProgressoSelect &&
    statusProgressoSelect &&
    dataConclusaoInput &&
    tabelaProgressoBody
) {
    function preencherSelectUsuariosProgresso() {
        usuarioProgressoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuario";
        usuarioProgressoSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioProgressoSelect.appendChild(opcao);
        });
    }

    function preencherSelectAulasProgresso() {
        aulaProgressoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione uma aula";
        aulaProgressoSelect.appendChild(opcaoPadrao);

        const aulas = listarAulas();
        aulas.forEach((aula) => {
            const opcao = document.createElement("option");
            opcao.value = aula.id;
            opcao.textContent = aula.titulo;
            aulaProgressoSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuarioProgresso(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarTituloAulaProgresso(idAula) {
        const aula = listarAulas().find((item) => Number(item.id) === Number(idAula));
        return aula ? aula.titulo : "-";
    }

    function renderizarProgressoAulas() {
        const progressos = listarProgressoAulas();
        tabelaProgressoBody.innerHTML = "";

        if (progressos.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 4;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum progresso registrado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaProgressoBody.appendChild(linhaVazia);
            return;
        }

        progressos.forEach((progresso) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuarioProgresso(progresso.idUsuario);

            const colunaAula = document.createElement("td");
            colunaAula.textContent = buscarTituloAulaProgresso(progresso.idAula);

            const colunaStatus = document.createElement("td");
            colunaStatus.textContent = progresso.status;

            const colunaData = document.createElement("td");
            colunaData.textContent = progresso.dataConclusao;

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaAula);
            linha.appendChild(colunaStatus);
            linha.appendChild(colunaData);
            tabelaProgressoBody.appendChild(linha);
        });
    }

    formProgresso.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioProgressoSelect.value);
        const idAula = Number(aulaProgressoSelect.value);
        const status = statusProgressoSelect.value;
        const dataConclusao = dataConclusaoInput.value;

        if (!idUsuario) {
            alert("Selecione um usuario.");
            usuarioProgressoSelect.focus();
            return;
        }

        if (!idAula) {
            alert("Selecione uma aula.");
            aulaProgressoSelect.focus();
            return;
        }

        if (status === "") {
            alert("Selecione o status.");
            statusProgressoSelect.focus();
            return;
        }

        if (dataConclusao === "") {
            alert("Informe a data.");
            dataConclusaoInput.focus();
            return;
        }

        const progressoDuplicado = listarProgressoAulas().some((progresso) => {
            return Number(progresso.idUsuario) === idUsuario && Number(progresso.idAula) === idAula;
        });

        if (progressoDuplicado) {
            alert("Esse usuario ja registrou progresso nessa aula.");
            usuarioProgressoSelect.focus();
            return;
        }

        cadastrarProgressoAula(idUsuario, idAula, status, dataConclusao);
        renderizarProgressoAulas();
        formProgresso.reset();
    });

    preencherSelectUsuariosProgresso();
    preencherSelectAulasProgresso();
    renderizarProgressoAulas();
}

const formCertificado = document.getElementById("form-certificado");
const usuarioCertificadoSelect = document.getElementById("usuario-certificado");
const cursoCertificadoSelect = document.getElementById("curso-certificado");
const codigoVerificacaoInput = document.getElementById("codigo-verificacao");
const dataEmissaoInput = document.getElementById("data-emissao");
const nomeUsuarioCertificado = document.getElementById("nome-usuario-certificado");
const nomeCursoCertificado = document.getElementById("nome-curso-certificado");
const dataEmissaoCertificado = document.getElementById("data-emissao-certificado");
const codigoVerificacaoCertificado = document.getElementById("codigo-verificacao-certificado");
const tabelaCertificadosBody = document.getElementById("tabela-certificados");

if (
    formCertificado &&
    usuarioCertificadoSelect &&
    cursoCertificadoSelect &&
    codigoVerificacaoInput &&
    dataEmissaoInput &&
    nomeUsuarioCertificado &&
    nomeCursoCertificado &&
    dataEmissaoCertificado &&
    codigoVerificacaoCertificado &&
    tabelaCertificadosBody
) {
    function gerarProximoCodigoCertificado() {
        const proximoId = listarCertificados().length + 1;
        return `CERT-${String(proximoId).padStart(3, "0")}`;
    }

    function preencherSelectUsuariosCertificado() {
        usuarioCertificadoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuario";
        usuarioCertificadoSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioCertificadoSelect.appendChild(opcao);
        });
    }

    function preencherSelectCursosCertificado() {
        cursoCertificadoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um curso";
        cursoCertificadoSelect.appendChild(opcaoPadrao);

        const cursos = listarCursos();
        cursos.forEach((curso) => {
            const opcao = document.createElement("option");
            opcao.value = curso.id;
            opcao.textContent = curso.titulo;
            cursoCertificadoSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuarioCertificado(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarNomeCursoCertificado(idCurso) {
        const curso = listarCursos().find((item) => Number(item.id) === Number(idCurso));
        return curso ? curso.titulo : "-";
    }

    function statusEhConcluido(status) {
        if (!status) {
            return false;
        }

        return status.toLowerCase().includes("concl");
    }

    function usuarioTemProgressoConcluidoNoCurso(idUsuario, idCurso) {
        const progressos = listarProgressoAulas();
        const aulas = listarAulas();
        const modulos = listarModulos();

        for (let i = 0; i < progressos.length; i += 1) {
            const progresso = progressos[i];

            if (Number(progresso.idUsuario) !== Number(idUsuario)) {
                continue;
            }

            if (!statusEhConcluido(progresso.status)) {
                continue;
            }

            const aula = aulas.find((item) => Number(item.id) === Number(progresso.idAula));
            if (!aula) {
                continue;
            }

            const modulo = modulos.find((item) => Number(item.id) === Number(aula.idModulo));
            if (!modulo) {
                continue;
            }

            if (Number(modulo.idCurso) === Number(idCurso)) {
                return true;
            }
        }

        return false;
    }

    function atualizarVisualCertificado(certificado) {
        if (!certificado) {
            nomeUsuarioCertificado.textContent = "Nome do Usuario";
            nomeCursoCertificado.textContent = "Nome do Curso";
            dataEmissaoCertificado.textContent = "--/--/----";
            codigoVerificacaoCertificado.textContent = "---";
            return;
        }

        nomeUsuarioCertificado.textContent = buscarNomeUsuarioCertificado(certificado.idUsuario);
        nomeCursoCertificado.textContent = buscarNomeCursoCertificado(certificado.idCurso);
        dataEmissaoCertificado.textContent = certificado.dataEmissao;
        codigoVerificacaoCertificado.textContent = certificado.codigoVerificacao;
    }

    function renderizarCertificados() {
        const certificados = listarCertificados();
        tabelaCertificadosBody.innerHTML = "";

        if (certificados.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 4;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum certificado gerado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaCertificadosBody.appendChild(linhaVazia);
            return;
        }

        certificados.forEach((certificado) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuarioCertificado(certificado.idUsuario);

            const colunaCurso = document.createElement("td");
            colunaCurso.textContent = buscarNomeCursoCertificado(certificado.idCurso);

            const colunaCodigo = document.createElement("td");
            colunaCodigo.textContent = certificado.codigoVerificacao;

            const colunaData = document.createElement("td");
            colunaData.textContent = certificado.dataEmissao;

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaCurso);
            linha.appendChild(colunaCodigo);
            linha.appendChild(colunaData);
            tabelaCertificadosBody.appendChild(linha);
        });
    }

    formCertificado.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioCertificadoSelect.value);
        const idCurso = Number(cursoCertificadoSelect.value);
        const dataEmissao = dataEmissaoInput.value;

        if (!idUsuario) {
            alert("Selecione um usuario.");
            usuarioCertificadoSelect.focus();
            return;
        }

        if (!idCurso) {
            alert("Selecione um curso.");
            cursoCertificadoSelect.focus();
            return;
        }

        if (dataEmissao === "") {
            alert("Informe a data de emissao.");
            dataEmissaoInput.focus();
            return;
        }

        const possuiProgressoConcluido = usuarioTemProgressoConcluidoNoCurso(idUsuario, idCurso);
        if (!possuiProgressoConcluido) {
            alert("Para gerar certificado, registre um progresso concluido do usuario em uma aula desse curso.");
            usuarioCertificadoSelect.focus();
            return;
        }

        const certificadoDuplicado = listarCertificados().some((certificado) => {
            return Number(certificado.idUsuario) === idUsuario && Number(certificado.idCurso) === idCurso;
        });

        if (certificadoDuplicado) {
            alert("Ja existe certificado para esse usuario nesse curso.");
            usuarioCertificadoSelect.focus();
            return;
        }

        const novoCertificado = cadastrarCertificado(idUsuario, idCurso, dataEmissao);
        atualizarVisualCertificado(novoCertificado);
        renderizarCertificados();
        formCertificado.reset();
        codigoVerificacaoInput.value = gerarProximoCodigoCertificado();
    });

    const ultimoCertificado = listarCertificados().slice(-1)[0] || null;
    atualizarVisualCertificado(ultimoCertificado);
    preencherSelectUsuariosCertificado();
    preencherSelectCursosCertificado();
    renderizarCertificados();
    codigoVerificacaoInput.value = gerarProximoCodigoCertificado();
}

const formPlano = document.getElementById("form-plano");
const nomePlanoInput = document.getElementById("nome-plano");
const descricaoPlanoInput = document.getElementById("descricao-plano");
const precoPlanoInput = document.getElementById("preco-plano");
const duracaoMesesInput = document.getElementById("duracao-meses");
const tabelaPlanosBody = document.getElementById("tabela-planos");

if (
    formPlano &&
    nomePlanoInput &&
    descricaoPlanoInput &&
    precoPlanoInput &&
    duracaoMesesInput &&
    tabelaPlanosBody
) {
    function renderizarPlanos() {
        const planos = listarPlanos();
        tabelaPlanosBody.innerHTML = "";

        if (planos.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 4;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum plano cadastrado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaPlanosBody.appendChild(linhaVazia);
            return;
        }

        planos.forEach((plano) => {
            const linha = document.createElement("tr");

            const colunaNome = document.createElement("td");
            colunaNome.textContent = plano.nome;

            const colunaDescricao = document.createElement("td");
            colunaDescricao.textContent = plano.descricao || "-";

            const colunaPreco = document.createElement("td");
            colunaPreco.textContent = `R$ ${Number(plano.preco).toFixed(2)}`;

            const colunaDuracao = document.createElement("td");
            colunaDuracao.textContent = `${plano.duracaoMeses} meses`;

            linha.appendChild(colunaNome);
            linha.appendChild(colunaDescricao);
            linha.appendChild(colunaPreco);
            linha.appendChild(colunaDuracao);
            tabelaPlanosBody.appendChild(linha);
        });
    }

    formPlano.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = nomePlanoInput.value.trim();
        const descricao = descricaoPlanoInput.value.trim();
        const precoTexto = precoPlanoInput.value;
        const duracaoTexto = duracaoMesesInput.value;
        const preco = Number(precoTexto);
        const duracaoMeses = Number(duracaoTexto);

        if (nome === "") {
            alert("Informe o nome do plano.");
            nomePlanoInput.focus();
            return;
        }

        if (precoTexto === "") {
            alert("Informe o preco.");
            precoPlanoInput.focus();
            return;
        }

        if (Number.isNaN(preco) || preco < 0) {
            alert("Informe um preco valido.");
            precoPlanoInput.focus();
            return;
        }

        if (duracaoTexto === "") {
            alert("Informe a duracao em meses.");
            duracaoMesesInput.focus();
            return;
        }

        if (Number.isNaN(duracaoMeses) || duracaoMeses <= 0) {
            alert("Informe uma duracao valida.");
            duracaoMesesInput.focus();
            return;
        }

        const nomeJaExiste = listarPlanos().some((plano) => {
            return plano.nome.toLowerCase() === nome.toLowerCase();
        });

        if (nomeJaExiste) {
            alert("Ja existe um plano com esse nome.");
            nomePlanoInput.focus();
            return;
        }

        cadastrarPlano(nome, descricao, preco, duracaoMeses);
        renderizarPlanos();
        formPlano.reset();
        nomePlanoInput.focus();
    });

    renderizarPlanos();
}

const formAssinatura = document.getElementById("form-assinatura");
const usuarioAssinaturaSelect = document.getElementById("usuario-assinatura");
const planoAssinaturaSelect = document.getElementById("plano-assinatura");
const dataInicioAssinaturaInput = document.getElementById("data-inicio-assinatura");
const dataFimAssinaturaInput = document.getElementById("data-fim-assinatura");
const tabelaAssinaturasBody = document.getElementById("tabela-assinaturas");

if (
    formAssinatura &&
    usuarioAssinaturaSelect &&
    planoAssinaturaSelect &&
    dataInicioAssinaturaInput &&
    dataFimAssinaturaInput &&
    tabelaAssinaturasBody
) {
    function preencherSelectUsuariosAssinatura() {
        usuarioAssinaturaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuario";
        usuarioAssinaturaSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioAssinaturaSelect.appendChild(opcao);
        });
    }

    function preencherSelectPlanosAssinatura() {
        planoAssinaturaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um plano";
        planoAssinaturaSelect.appendChild(opcaoPadrao);

        const planos = listarPlanos();
        planos.forEach((plano) => {
            const opcao = document.createElement("option");
            opcao.value = plano.id;
            opcao.textContent = plano.nome;
            planoAssinaturaSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuarioAssinatura(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarNomePlanoAssinatura(idPlano) {
        const plano = listarPlanos().find((item) => Number(item.id) === Number(idPlano));
        return plano ? plano.nome : "-";
    }

    function formatarDataParaInput(data) {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function calcularDataFimPelaDuracao(dataInicio, duracaoMeses) {
        if (!dataInicio || !duracaoMeses) {
            return "";
        }

        const dataCalculada = new Date(`${dataInicio}T00:00:00`);
        if (Number.isNaN(dataCalculada.getTime())) {
            return "";
        }

        dataCalculada.setMonth(dataCalculada.getMonth() + Number(duracaoMeses));
        return formatarDataParaInput(dataCalculada);
    }

    function preencherDataFimAutomatica() {
        const idPlano = Number(planoAssinaturaSelect.value);
        const dataInicio = dataInicioAssinaturaInput.value;

        if (!idPlano || dataInicio === "") {
            return;
        }

        const plano = listarPlanos().find((item) => Number(item.id) === idPlano);
        if (!plano) {
            return;
        }

        const dataFimCalculada = calcularDataFimPelaDuracao(dataInicio, plano.duracaoMeses);
        if (dataFimCalculada !== "") {
            dataFimAssinaturaInput.value = dataFimCalculada;
        }
    }

    function renderizarAssinaturas() {
        const assinaturas = listarAssinaturas();
        tabelaAssinaturasBody.innerHTML = "";

        if (assinaturas.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 4;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma assinatura cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaAssinaturasBody.appendChild(linhaVazia);
            return;
        }

        assinaturas.forEach((assinatura) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuarioAssinatura(assinatura.idUsuario);

            const colunaPlano = document.createElement("td");
            colunaPlano.textContent = buscarNomePlanoAssinatura(assinatura.idPlano);

            const colunaDataInicio = document.createElement("td");
            colunaDataInicio.textContent = assinatura.dataInicio;

            const colunaDataFim = document.createElement("td");
            colunaDataFim.textContent = assinatura.dataFim;

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaPlano);
            linha.appendChild(colunaDataInicio);
            linha.appendChild(colunaDataFim);
            tabelaAssinaturasBody.appendChild(linha);
        });
    }

    formAssinatura.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioAssinaturaSelect.value);
        const idPlano = Number(planoAssinaturaSelect.value);
        const dataInicio = dataInicioAssinaturaInput.value;

        if (dataFimAssinaturaInput.value === "") {
            preencherDataFimAutomatica();
        }

        const dataFim = dataFimAssinaturaInput.value;

        if (!idUsuario) {
            alert("Selecione um usuario.");
            usuarioAssinaturaSelect.focus();
            return;
        }

        if (!idPlano) {
            alert("Selecione um plano.");
            planoAssinaturaSelect.focus();
            return;
        }

        if (dataInicio === "") {
            alert("Informe a data de inicio.");
            dataInicioAssinaturaInput.focus();
            return;
        }

        if (dataFim === "") {
            alert("Informe a data de fim.");
            dataFimAssinaturaInput.focus();
            return;
        }

        const assinaturaDuplicada = listarAssinaturas().some((assinatura) => {
            return (
                Number(assinatura.idUsuario) === idUsuario &&
                Number(assinatura.idPlano) === idPlano &&
                assinatura.dataInicio === dataInicio &&
                assinatura.dataFim === dataFim
            );
        });

        if (assinaturaDuplicada) {
            alert("Essa assinatura ja foi registrada.");
            usuarioAssinaturaSelect.focus();
            return;
        }

        cadastrarAssinatura(idUsuario, idPlano, dataInicio, dataFim);
        renderizarAssinaturas();
        formAssinatura.reset();
    });

    planoAssinaturaSelect.addEventListener("change", preencherDataFimAutomatica);
    dataInicioAssinaturaInput.addEventListener("change", preencherDataFimAutomatica);

    preencherSelectUsuariosAssinatura();
    preencherSelectPlanosAssinatura();
    renderizarAssinaturas();
}

