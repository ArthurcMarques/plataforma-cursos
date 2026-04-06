import { cadastrarAula, excluirAula, listarAulas } from "../models/Aula.js";
import { cadastrarAvaliacao, excluirAvaliacao, listarAvaliacoes } from "../models/Avaliacao.js";
import { cadastrarAssinatura, excluirAssinatura, listarAssinaturas } from "../models/Assinatura.js";
import { atualizarCategoria, cadastrarCategoria, excluirCategoria, listarCategorias } from "../models/Categoria.js";
import { cadastrarCertificado, excluirCertificado, listarCertificados } from "../models/Certificado.js";
import { atualizarCurso, atualizarTotaisCurso, cadastrarCurso, excluirCurso, listarCursos } from "../models/Curso.js";
import { cadastrarMatricula, excluirMatricula, listarMatriculas } from "../models/Matricula.js";
import { cadastrarModulo, listarModulos } from "../models/Modulo.js";
import { cadastrarPagamento, excluirPagamento, listarPagamentos } from "../models/Pagamento.js";
import { cadastrarPlano, excluirPlano, listarPlanos } from "../models/Plano.js";
import { cadastrarProgressoAula, excluirProgressoAula, listarProgressoAulas } from "../models/ProgressoAula.js";
import { cadastrarTrilha, listarTrilhas } from "../models/Trilha.js";
import { cadastrarTrilhaCurso, excluirTrilhaCurso, listarTrilhasCursos } from "../models/TrilhaCurso.js";
import { atualizarUsuario, cadastrarUsuario, excluirUsuario, listarUsuarios } from "../models/Usuario.js";


const formMatricula = document.getElementById("form-matricula");
const usuarioMatriculaSelect = document.getElementById("usuario-matricula");
const cursoMatriculaSelect = document.getElementById("curso-matricula");
const tabelaMatriculasBody = document.getElementById("tabela-matriculas");
const botaoInserirMatricula = document.getElementById("btn-inserir-matricula");
const modalMatriculaElement = document.getElementById("modal-matricula");
const tituloModalMatricula = document.getElementById("titulo-modal-matricula");
const botaoSalvarMatricula = document.getElementById("btn-salvar-matricula");

if (
    formMatricula &&
    usuarioMatriculaSelect &&
    cursoMatriculaSelect &&
    tabelaMatriculasBody &&
    botaoInserirMatricula &&
    modalMatriculaElement &&
    tituloModalMatricula &&
    botaoSalvarMatricula
) {
    const modalMatricula = window.bootstrap ? new window.bootstrap.Modal(modalMatriculaElement) : null;

    function configurarModalInsercaoMatricula() {
        formMatricula.reset();
        tituloModalMatricula.textContent = "Nova Matricula";
        botaoSalvarMatricula.textContent = "Salvar";
    }

    function abrirModalInsercaoMatricula() {
        preencherSelectUsuariosMatricula();
        preencherSelectCursosMatricula();
        configurarModalInsercaoMatricula();
        usuarioMatriculaSelect.focus();
    }

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
        opcaoPadrao.textContent = "Selecione um usuÃ¡rio";
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
            colunaVazia.colSpan = 4;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma matrÃ­cula cadastrada.";
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

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropup";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "Acoes";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir esta matricula?");
                if (!confirmar) {
                    return;
                }

                excluirMatricula(matricula.id);
                renderizarMatriculas();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaCurso);
            linha.appendChild(colunaData);
            linha.appendChild(colunaAcoes);
            tabelaMatriculasBody.appendChild(linha);
        });
    }

    formMatricula.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioMatriculaSelect.value);
        const idCurso = Number(cursoMatriculaSelect.value);

        if (!idUsuario) {
            alert("Selecione o usuÃ¡rio.");
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
            alert("Esse usuÃ¡rio jÃ¡ estÃ¡ matriculado nesse curso.");
            usuarioMatriculaSelect.focus();
            return;
        }

        cadastrarMatricula(idUsuario, idCurso, dataAtualMatricula());
        renderizarMatriculas();
        configurarModalInsercaoMatricula();
        if (modalMatricula) {
            modalMatricula.hide();
        }
    });

    botaoInserirMatricula.addEventListener("click", abrirModalInsercaoMatricula);
    modalMatriculaElement.addEventListener("hidden.bs.modal", configurarModalInsercaoMatricula);

    configurarModalInsercaoMatricula();
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
const botaoInserirProgresso = document.getElementById("btn-inserir-progresso");
const modalProgressoElement = document.getElementById("modal-progresso");
const tituloModalProgresso = document.getElementById("titulo-modal-progresso");
const botaoSalvarProgresso = document.getElementById("btn-salvar-progresso");

if (
    formProgresso &&
    usuarioProgressoSelect &&
    aulaProgressoSelect &&
    statusProgressoSelect &&
    dataConclusaoInput &&
    tabelaProgressoBody &&
    botaoInserirProgresso &&
    modalProgressoElement &&
    tituloModalProgresso &&
    botaoSalvarProgresso
) {
    const modalProgresso = window.bootstrap ? new window.bootstrap.Modal(modalProgressoElement) : null;

    function configurarModalInsercaoProgresso() {
        formProgresso.reset();
        tituloModalProgresso.textContent = "Registrar Progresso";
        botaoSalvarProgresso.textContent = "Salvar";
    }

    function abrirModalInsercaoProgresso() {
        preencherSelectUsuariosProgresso();
        preencherSelectAulasProgresso();
        configurarModalInsercaoProgresso();
        usuarioProgressoSelect.focus();
    }

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
            colunaVazia.colSpan = 5;
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

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropup";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "Acoes";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir este progresso?");
                if (!confirmar) {
                    return;
                }

                excluirProgressoAula(progresso.idUsuario, progresso.idAula);
                renderizarProgressoAulas();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaAula);
            linha.appendChild(colunaStatus);
            linha.appendChild(colunaData);
            linha.appendChild(colunaAcoes);
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
        configurarModalInsercaoProgresso();
        if (modalProgresso) {
            modalProgresso.hide();
        }
    });

    botaoInserirProgresso.addEventListener("click", abrirModalInsercaoProgresso);
    modalProgressoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoProgresso);

    configurarModalInsercaoProgresso();
    preencherSelectUsuariosProgresso();
    preencherSelectAulasProgresso();
    renderizarProgressoAulas();
}

const formAvaliacao = document.getElementById("form-avaliacao");
const usuarioAvaliacaoSelect = document.getElementById("usuario-avaliacao");
const cursoAvaliacaoSelect = document.getElementById("curso-avaliacao");
const notaAvaliacaoSelect = document.getElementById("nota-avaliacao");
const comentarioAvaliacaoInput = document.getElementById("comentario-avaliacao");
const dataAvaliacaoInput = document.getElementById("data-avaliacao");
const tabelaAvaliacoesBody = document.getElementById("tabela-avaliacoes");
const botaoInserirAvaliacao = document.getElementById("btn-inserir-avaliacao");
const modalAvaliacaoElement = document.getElementById("modal-avaliacao");
const tituloModalAvaliacao = document.getElementById("titulo-modal-avaliacao");
const botaoSalvarAvaliacao = document.getElementById("btn-salvar-avaliacao");

if (
    formAvaliacao &&
    usuarioAvaliacaoSelect &&
    cursoAvaliacaoSelect &&
    notaAvaliacaoSelect &&
    comentarioAvaliacaoInput &&
    dataAvaliacaoInput &&
    tabelaAvaliacoesBody &&
    botaoInserirAvaliacao &&
    modalAvaliacaoElement &&
    tituloModalAvaliacao &&
    botaoSalvarAvaliacao
) {
    const modalAvaliacao = window.bootstrap ? new window.bootstrap.Modal(modalAvaliacaoElement) : null;

    function dataAtualFormatoInputAvaliacao() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function configurarModalInsercaoAvaliacao() {
        formAvaliacao.reset();
        dataAvaliacaoInput.value = dataAtualFormatoInputAvaliacao();
        tituloModalAvaliacao.textContent = "Nova Avaliacao";
        botaoSalvarAvaliacao.textContent = "Salvar";
    }

    function abrirModalInsercaoAvaliacao() {
        preencherSelectUsuariosAvaliacao();
        preencherSelectCursosAvaliacao();
        configurarModalInsercaoAvaliacao();
        usuarioAvaliacaoSelect.focus();
    }

    function preencherSelectUsuariosAvaliacao() {
        usuarioAvaliacaoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuario";
        usuarioAvaliacaoSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioAvaliacaoSelect.appendChild(opcao);
        });
    }

    function preencherSelectCursosAvaliacao() {
        cursoAvaliacaoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um curso";
        cursoAvaliacaoSelect.appendChild(opcaoPadrao);

        const cursos = listarCursos();
        cursos.forEach((curso) => {
            const opcao = document.createElement("option");
            opcao.value = curso.id;
            opcao.textContent = curso.titulo;
            cursoAvaliacaoSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuarioAvaliacao(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarTituloCursoAvaliacao(idCurso) {
        const curso = listarCursos().find((item) => Number(item.id) === Number(idCurso));
        return curso ? curso.titulo : "-";
    }

    function renderizarAvaliacoes() {
        const avaliacoes = listarAvaliacoes();
        tabelaAvaliacoesBody.innerHTML = "";

        if (avaliacoes.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 6;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma avaliacao cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaAvaliacoesBody.appendChild(linhaVazia);
            return;
        }

        avaliacoes.forEach((avaliacao) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuarioAvaliacao(avaliacao.idUsuario);

            const colunaCurso = document.createElement("td");
            colunaCurso.textContent = buscarTituloCursoAvaliacao(avaliacao.idCurso);

            const colunaNota = document.createElement("td");
            colunaNota.textContent = avaliacao.nota;

            const colunaComentario = document.createElement("td");
            colunaComentario.textContent = avaliacao.comentario || "-";

            const colunaData = document.createElement("td");
            colunaData.textContent = avaliacao.dataAvaliacao;

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropup";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "Acoes";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir esta avaliacao?");
                if (!confirmar) {
                    return;
                }

                excluirAvaliacao(avaliacao.id);
                renderizarAvaliacoes();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaCurso);
            linha.appendChild(colunaNota);
            linha.appendChild(colunaComentario);
            linha.appendChild(colunaData);
            linha.appendChild(colunaAcoes);
            tabelaAvaliacoesBody.appendChild(linha);
        });
    }

    formAvaliacao.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioAvaliacaoSelect.value);
        const idCurso = Number(cursoAvaliacaoSelect.value);
        const nota = Number(notaAvaliacaoSelect.value);
        const comentario = comentarioAvaliacaoInput.value.trim();
        const dataAvaliacao = dataAvaliacaoInput.value;

        if (!idUsuario) {
            alert("Selecione o usuario.");
            usuarioAvaliacaoSelect.focus();
            return;
        }

        if (!idCurso) {
            alert("Selecione o curso.");
            cursoAvaliacaoSelect.focus();
            return;
        }

        if (!nota || nota < 1 || nota > 5) {
            alert("Selecione uma nota de 1 a 5.");
            notaAvaliacaoSelect.focus();
            return;
        }

        if (dataAvaliacao === "") {
            alert("Informe a data da avaliacao.");
            dataAvaliacaoInput.focus();
            return;
        }

        cadastrarAvaliacao(idUsuario, idCurso, nota, comentario, dataAvaliacao);
        renderizarAvaliacoes();
        configurarModalInsercaoAvaliacao();
        if (modalAvaliacao) {
            modalAvaliacao.hide();
        }
    });

    botaoInserirAvaliacao.addEventListener("click", abrirModalInsercaoAvaliacao);
    modalAvaliacaoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoAvaliacao);

    configurarModalInsercaoAvaliacao();
    preencherSelectUsuariosAvaliacao();
    preencherSelectCursosAvaliacao();
    renderizarAvaliacoes();
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
const botaoInserirCertificado = document.getElementById("btn-inserir-certificado");
const modalCertificadoElement = document.getElementById("modal-certificado");
const tituloModalCertificado = document.getElementById("titulo-modal-certificado");
const botaoSalvarCertificado = document.getElementById("btn-salvar-certificado");

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
    tabelaCertificadosBody &&
    botaoInserirCertificado &&
    modalCertificadoElement &&
    tituloModalCertificado &&
    botaoSalvarCertificado
) {
    const modalCertificado = window.bootstrap ? new window.bootstrap.Modal(modalCertificadoElement) : null;

    function gerarProximoCodigoCertificado() {
        const certificados = listarCertificados();
        if (certificados.length === 0) {
            return "CERT-001";
        }

        const maiorId = Math.max(...certificados.map((certificado) => Number(certificado.id) || 0));
        const proximoId = maiorId + 1;
        return `CERT-${String(proximoId).padStart(3, "0")}`;
    }

    function dataAtualFormatoInputCertificado() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function configurarModalInsercaoCertificado() {
        formCertificado.reset();
        dataEmissaoInput.value = dataAtualFormatoInputCertificado();
        codigoVerificacaoInput.value = gerarProximoCodigoCertificado();
        tituloModalCertificado.textContent = "Gerar Certificado";
        botaoSalvarCertificado.textContent = "Salvar";
    }

    function abrirModalInsercaoCertificado() {
        preencherSelectUsuariosCertificado();
        preencherSelectCursosCertificado();
        configurarModalInsercaoCertificado();
        usuarioCertificadoSelect.focus();
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
            colunaVazia.colSpan = 5;
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

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropup";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "Acoes";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemVisualizar = document.createElement("li");
            const botaoVisualizar = document.createElement("button");
            botaoVisualizar.type = "button";
            botaoVisualizar.className = "dropdown-item";
            botaoVisualizar.textContent = "Visualizar";
            botaoVisualizar.addEventListener("click", () => {
                atualizarVisualCertificado(certificado);
            });
            itemVisualizar.appendChild(botaoVisualizar);

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir este certificado?");
                if (!confirmar) {
                    return;
                }

                excluirCertificado(certificado.id);
                const ultimo = listarCertificados().slice(-1)[0] || null;
                atualizarVisualCertificado(ultimo);
                renderizarCertificados();
                codigoVerificacaoInput.value = gerarProximoCodigoCertificado();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemVisualizar);
            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaCurso);
            linha.appendChild(colunaCodigo);
            linha.appendChild(colunaData);
            linha.appendChild(colunaAcoes);
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
        configurarModalInsercaoCertificado();
        if (modalCertificado) {
            modalCertificado.hide();
        }
    });

    botaoInserirCertificado.addEventListener("click", abrirModalInsercaoCertificado);
    modalCertificadoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoCertificado);

    const ultimoCertificado = listarCertificados().slice(-1)[0] || null;
    atualizarVisualCertificado(ultimoCertificado);
    preencherSelectUsuariosCertificado();
    preencherSelectCursosCertificado();
    renderizarCertificados();
    configurarModalInsercaoCertificado();
}


