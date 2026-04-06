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


const formCurso = document.getElementById("form-curso");
const tituloCursoInput = document.getElementById("titulo-curso");
const descricaoCursoInput = document.getElementById("descricao-curso");
const nivelCursoSelect = document.getElementById("nivel-curso");
const categoriaCursoSelect = document.getElementById("categoria-curso");
const instrutorCursoSelect = document.getElementById("instrutor-curso");
const dataPublicacaoCursoInput = document.getElementById("data-publicacao-curso");
const tabelaCursosBody = document.getElementById("tabela-cursos");
const filtroCategoriaCursosSelect = document.getElementById("filtro-categoria-cursos");
const botaoInserirCurso = document.getElementById("btn-inserir-curso");
const modalCursoElement = document.getElementById("modal-curso");
const tituloModalCurso = document.getElementById("titulo-modal-curso");
const botaoSalvarCurso = document.getElementById("btn-salvar-curso");

if (
    formCurso &&
    tituloCursoInput &&
    descricaoCursoInput &&
    nivelCursoSelect &&
    categoriaCursoSelect &&
    instrutorCursoSelect &&
    dataPublicacaoCursoInput &&
    tabelaCursosBody &&
    filtroCategoriaCursosSelect &&
    botaoInserirCurso &&
    modalCursoElement &&
    tituloModalCurso &&
    botaoSalvarCurso
) {
    let idCursoEmEdicao = null;
    const modalCurso = window.bootstrap ? new window.bootstrap.Modal(modalCursoElement) : null;

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

    function configurarModalInsercaoCurso() {
        idCursoEmEdicao = null;
        formCurso.reset();`r`n        window.aplicarDataPadraoHoje(formCurso);
        definirDataPublicacaoPadrao();
        tituloModalCurso.textContent = "Novo Curso";
        botaoSalvarCurso.textContent = "Salvar";
    }

    function abrirModalInsercaoCurso() {
        preencherSelectCategorias();
        preencherSelectInstrutores();
        configurarModalInsercaoCurso();
        tituloCursoInput.focus();
    }

    function resetarFormularioCurso() {
        configurarModalInsercaoCurso();
    }

    function prepararEdicaoCurso(curso) {
        preencherSelectCategorias();
        preencherSelectInstrutores();
        idCursoEmEdicao = curso.id;
        tituloCursoInput.value = curso.titulo;
        descricaoCursoInput.value = curso.descricao;
        nivelCursoSelect.value = curso.nivel;
        categoriaCursoSelect.value = String(curso.idCategoria);
        instrutorCursoSelect.value = String(curso.idInstrutor);
        dataPublicacaoCursoInput.value = curso.dataPublicacao;
        tituloModalCurso.textContent = "Editar Curso";
        botaoSalvarCurso.textContent = "Salvar alteracoes";
        if (modalCurso) {
            modalCurso.show();
        }
        tituloCursoInput.focus();
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

    function preencherSelectFiltroCategorias() {
        filtroCategoriaCursosSelect.innerHTML = "";

        const opcaoTodas = document.createElement("option");
        opcaoTodas.value = "";
        opcaoTodas.textContent = "Todas as categorias";
        filtroCategoriaCursosSelect.appendChild(opcaoTodas);

        const categorias = listarCategorias();
        categorias.forEach((categoria) => {
            const opcao = document.createElement("option");
            opcao.value = categoria.id;
            opcao.textContent = categoria.nome;
            filtroCategoriaCursosSelect.appendChild(opcao);
        });
    }

    function preencherSelectInstrutores() {
        instrutorCursoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um instrutor";
        instrutorCursoSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios().filter((usuario) => {
            return (usuario.tipoUsuario || "Aluno") === "Instrutor";
        });
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

    function calcularResumoCurso(idCurso) {
        const modulos = listarModulos();
        const aulas = listarAulas();
        let totalAulas = 0;
        let totalMinutos = 0;

        modulos.forEach((modulo) => {
            if (Number(modulo.idCurso) !== Number(idCurso)) {
                return;
            }

            aulas.forEach((aula) => {
                if (Number(aula.idModulo) === Number(modulo.id)) {
                    totalAulas += 1;
                    totalMinutos += Number(aula.duracaoMinutos) || 0;
                }
            });
        });

        const totalHoras = Number((totalMinutos / 60).toFixed(1));
        return { totalAulas, totalHoras };
    }

    function renderizarCursos() {
        const idCategoriaFiltro = Number(filtroCategoriaCursosSelect.value);
        const cursos = listarCursos().filter((curso) => {
            if (!idCategoriaFiltro) {
                return true;
            }

            return Number(curso.idCategoria) === idCategoriaFiltro;
        });
        tabelaCursosBody.innerHTML = "";

        if (cursos.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 7;
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

            const resumoCurso = calcularResumoCurso(curso.id);
            const totalAulasCalculado = resumoCurso.totalAulas;
            const totalHorasCalculado = resumoCurso.totalHoras;

            if (
                (Number(curso.totalAulas) || 0) !== totalAulasCalculado ||
                (Number(curso.totalHoras) || 0) !== totalHorasCalculado
            ) {
                atualizarTotaisCurso(curso.id, totalAulasCalculado, totalHorasCalculado);
            }

            const colunaTotalAulas = document.createElement("td");
            colunaTotalAulas.textContent = totalAulasCalculado;

            const colunaTotalHoras = document.createElement("td");
            colunaTotalHoras.textContent = `${totalHorasCalculado} h`;

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropup";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "A\u00e7\u00f5es";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemEditar = document.createElement("li");
            const botaoEditar = document.createElement("button");
            botaoEditar.type = "button";
            botaoEditar.className = "dropdown-item";
            botaoEditar.textContent = "Editar";
            botaoEditar.addEventListener("click", () => {
                prepararEdicaoCurso(curso);
            });
            itemEditar.appendChild(botaoEditar);

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir este curso?");
                if (!confirmar) {
                    return;
                }

                excluirCurso(curso.id);
                if (Number(idCursoEmEdicao) === Number(curso.id)) {
                    resetarFormularioCurso();
                }
                renderizarCursos();
            });
            itemExcluir.appendChild(botaoExcluir);

            const itemGerenciar = document.createElement("li");
            const linkModulos = document.createElement("a");
            linkModulos.className = "dropdown-item";
            linkModulos.href = `./modulos.html?idCurso=${curso.id}`;
            linkModulos.textContent = "Gerenciar m\u00f3dulos";
            itemGerenciar.appendChild(linkModulos);

            menu.appendChild(itemEditar);
            menu.appendChild(itemExcluir);
            menu.appendChild(itemGerenciar);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaTitulo);
            linha.appendChild(colunaCategoria);
            linha.appendChild(colunaInstrutor);
            linha.appendChild(colunaNivel);
            linha.appendChild(colunaTotalAulas);
            linha.appendChild(colunaTotalHoras);
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

        if (idCursoEmEdicao === null) {
            cadastrarCurso(titulo, descricao, nivel, idCategoria, idInstrutor, dataPublicacao);`r`n            window.showAppAlert("Curso cadastrado com sucesso.", "success");
        } else {
            atualizarCurso(idCursoEmEdicao, titulo, descricao, nivel, idCategoria, idInstrutor, dataPublicacao);
        }

        renderizarCursos();
        resetarFormularioCurso();
        if (modalCurso) {
            modalCurso.hide();
        }
    });

    botaoInserirCurso.addEventListener("click", abrirModalInsercaoCurso);
    modalCursoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoCurso);
    filtroCategoriaCursosSelect.addEventListener("change", renderizarCursos);

    resetarFormularioCurso();
    preencherSelectCategorias();
    preencherSelectFiltroCategorias();
    preencherSelectInstrutores();
    renderizarCursos();
}



