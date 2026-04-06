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


const formTrilha = document.getElementById("form-trilha");
const tituloTrilhaInput = document.getElementById("titulo-trilha");
const descricaoTrilhaInput = document.getElementById("descricao-trilha");
const categoriaTrilhaSelect = document.getElementById("categoria-trilha");
const tabelaTrilhasBody = document.getElementById("tabela-trilhas");
const botaoInserirTrilha = document.getElementById("btn-inserir-trilha");
const modalTrilhaElement = document.getElementById("modal-trilha");
const tituloModalTrilha = document.getElementById("titulo-modal-trilha");
const botaoSalvarTrilha = document.getElementById("btn-salvar-trilha");

if (
    formTrilha &&
    tituloTrilhaInput &&
    descricaoTrilhaInput &&
    categoriaTrilhaSelect &&
    tabelaTrilhasBody &&
    botaoInserirTrilha &&
    modalTrilhaElement &&
    tituloModalTrilha &&
    botaoSalvarTrilha
) {
    const modalTrilha = window.bootstrap ? new window.bootstrap.Modal(modalTrilhaElement) : null;

    function configurarModalInsercaoTrilha() {
        formTrilha.reset();
        tituloModalTrilha.textContent = "Nova Trilha";
        botaoSalvarTrilha.textContent = "Salvar";
    }

    function abrirModalInsercaoTrilha() {
        preencherSelectCategoriasTrilha();
        configurarModalInsercaoTrilha();
        tituloTrilhaInput.focus();
    }

    function preencherSelectCategoriasTrilha() {
        categoriaTrilhaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione uma categoria";
        categoriaTrilhaSelect.appendChild(opcaoPadrao);

        const categorias = listarCategorias();
        categorias.forEach((categoria) => {
            const opcao = document.createElement("option");
            opcao.value = categoria.id;
            opcao.textContent = categoria.nome;
            categoriaTrilhaSelect.appendChild(opcao);
        });
    }

    function buscarNomeCategoriaTrilha(idCategoria) {
        const categoria = listarCategorias().find((item) => Number(item.id) === Number(idCategoria));
        return categoria ? categoria.nome : "-";
    }

    function renderizarTrilhas() {
        const trilhas = listarTrilhas();
        tabelaTrilhasBody.innerHTML = "";

        if (trilhas.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 4;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma trilha cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaTrilhasBody.appendChild(linhaVazia);
            return;
        }

        trilhas.forEach((trilha) => {
            const linha = document.createElement("tr");

            const colunaTitulo = document.createElement("td");
            colunaTitulo.textContent = trilha.titulo;

            const colunaCategoria = document.createElement("td");
            colunaCategoria.textContent = buscarNomeCategoriaTrilha(trilha.idCategoria);

            const colunaDescricao = document.createElement("td");
            colunaDescricao.textContent = trilha.descricao || "-";

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";
            const dropdown = document.createElement("div");
            dropdown.className = "dropdown";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "Acoes";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemGerenciar = document.createElement("li");
            const linkGerenciar = document.createElement("a");
            linkGerenciar.className = "dropdown-item";
            linkGerenciar.href = `./trilha-cursos.html?idTrilha=${trilha.id}`;
            linkGerenciar.textContent = "Gerenciar cursos";
            itemGerenciar.appendChild(linkGerenciar);

            menu.appendChild(itemGerenciar);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaTitulo);
            linha.appendChild(colunaCategoria);
            linha.appendChild(colunaDescricao);
            linha.appendChild(colunaAcoes);
            tabelaTrilhasBody.appendChild(linha);
        });
    }

    formTrilha.addEventListener("submit", (event) => {
        event.preventDefault();

        const titulo = tituloTrilhaInput.value.trim();
        const descricao = descricaoTrilhaInput.value.trim();
        const idCategoria = Number(categoriaTrilhaSelect.value);

        if (titulo === "") {
            alert("Informe o titulo da trilha.");
            tituloTrilhaInput.focus();
            return;
        }

        if (!idCategoria) {
            alert("Selecione a categoria da trilha.");
            categoriaTrilhaSelect.focus();
            return;
        }

        cadastrarTrilha(titulo, descricao, idCategoria);
        renderizarTrilhas();
        configurarModalInsercaoTrilha();
        if (modalTrilha) {
            modalTrilha.hide();
        }
    });

    botaoInserirTrilha.addEventListener("click", abrirModalInsercaoTrilha);
    modalTrilhaElement.addEventListener("hidden.bs.modal", configurarModalInsercaoTrilha);

    configurarModalInsercaoTrilha();
    preencherSelectCategoriasTrilha();
    renderizarTrilhas();
}

const formTrilhaCursos = document.getElementById("form-trilha-cursos");
const nomeTrilhaSelecionada = document.getElementById("nome-trilha-selecionada");
const cursoTrilhaSelect = document.getElementById("curso-trilha");
const ordemCursoTrilhaInput = document.getElementById("ordem-curso-trilha");
const tabelaTrilhaCursosBody = document.getElementById("tabela-trilha-cursos");
const botaoInserirTrilhaCurso = document.getElementById("btn-inserir-trilha-curso");
const modalTrilhaCursoElement = document.getElementById("modal-trilha-curso");
const tituloModalTrilhaCurso = document.getElementById("titulo-modal-trilha-curso");
const botaoSalvarTrilhaCurso = document.getElementById("btn-salvar-trilha-curso");

if (
    formTrilhaCursos &&
    nomeTrilhaSelecionada &&
    cursoTrilhaSelect &&
    ordemCursoTrilhaInput &&
    tabelaTrilhaCursosBody &&
    botaoInserirTrilhaCurso &&
    modalTrilhaCursoElement &&
    tituloModalTrilhaCurso &&
    botaoSalvarTrilhaCurso
) {
    const modalTrilhaCurso = window.bootstrap ? new window.bootstrap.Modal(modalTrilhaCursoElement) : null;
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idTrilhaAtual = Number(parametrosUrl.get("idTrilha"));

    function configurarModalInsercaoTrilhaCurso() {
        formTrilhaCursos.reset();
        tituloModalTrilhaCurso.textContent = "Adicionar Curso";
        botaoSalvarTrilhaCurso.textContent = "Salvar";
    }

    function abrirModalInsercaoTrilhaCurso() {
        preencherSelectCursosDaTrilha();
        configurarModalInsercaoTrilhaCurso();
        cursoTrilhaSelect.focus();
    }

    function mostrarErroTrilhaCursos(mensagem) {
        nomeTrilhaSelecionada.className = "fw-semibold text-danger";
        nomeTrilhaSelecionada.textContent = mensagem;
        tabelaTrilhaCursosBody.innerHTML = "";

        const linhaErro = document.createElement("tr");
        const colunaErro = document.createElement("td");
        colunaErro.colSpan = 3;
        colunaErro.className = "text-center text-danger";
        colunaErro.textContent = mensagem;
        linhaErro.appendChild(colunaErro);
        tabelaTrilhaCursosBody.appendChild(linhaErro);

        cursoTrilhaSelect.disabled = true;
        ordemCursoTrilhaInput.disabled = true;
        const botaoAdicionar = formTrilhaCursos.querySelector("button[type='submit']");
        if (botaoAdicionar) {
            botaoAdicionar.disabled = true;
        }
        botaoInserirTrilhaCurso.disabled = true;
    }

    const trilhaAtual = listarTrilhas().find((trilha) => Number(trilha.id) === idTrilhaAtual);

    if (!idTrilhaAtual || !trilhaAtual) {
        mostrarErroTrilhaCursos("Trilha nao encontrada.");
    } else {
        nomeTrilhaSelecionada.textContent = trilhaAtual.titulo;

        function preencherSelectCursosDaTrilha() {
            cursoTrilhaSelect.innerHTML = "";

            const opcaoPadrao = document.createElement("option");
            opcaoPadrao.value = "";
            opcaoPadrao.textContent = "Selecione um curso";
            cursoTrilhaSelect.appendChild(opcaoPadrao);

            const cursos = listarCursos();
            cursos.forEach((curso) => {
                const opcao = document.createElement("option");
                opcao.value = curso.id;
                opcao.textContent = curso.titulo;
                cursoTrilhaSelect.appendChild(opcao);
            });
        }

        function buscarNomeCursoTrilha(idCurso) {
            const curso = listarCursos().find((item) => Number(item.id) === Number(idCurso));
            return curso ? curso.titulo : "-";
        }

        function renderizarCursosDaTrilha() {
            const vinculos = listarTrilhasCursos().filter((item) => Number(item.idTrilha) === idTrilhaAtual);
            tabelaTrilhaCursosBody.innerHTML = "";

            if (vinculos.length === 0) {
                const linhaVazia = document.createElement("tr");
                const colunaVazia = document.createElement("td");
                colunaVazia.colSpan = 3;
                colunaVazia.className = "text-center text-muted";
                colunaVazia.textContent = "Nenhum curso vinculado a esta trilha.";
                linhaVazia.appendChild(colunaVazia);
                tabelaTrilhaCursosBody.appendChild(linhaVazia);
                return;
            }

            vinculos.forEach((vinculo) => {
                const linha = document.createElement("tr");

                const colunaCurso = document.createElement("td");
                colunaCurso.textContent = buscarNomeCursoTrilha(vinculo.idCurso);

                const colunaOrdem = document.createElement("td");
                colunaOrdem.textContent = vinculo.ordem;

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
                    const confirmar = window.confirm("Deseja remover este curso da trilha?");
                    if (!confirmar) {
                        return;
                    }

                    excluirTrilhaCurso(vinculo.idTrilha, vinculo.idCurso);
                    renderizarCursosDaTrilha();
                });
                itemExcluir.appendChild(botaoExcluir);

                menu.appendChild(itemExcluir);
                dropdown.appendChild(botaoAcoes);
                dropdown.appendChild(menu);
                colunaAcoes.appendChild(dropdown);

                linha.appendChild(colunaCurso);
                linha.appendChild(colunaOrdem);
                linha.appendChild(colunaAcoes);
                tabelaTrilhaCursosBody.appendChild(linha);
            });
        }

        formTrilhaCursos.addEventListener("submit", (event) => {
            event.preventDefault();

            const idCurso = Number(cursoTrilhaSelect.value);
            const ordem = Number(ordemCursoTrilhaInput.value);

            if (!idCurso) {
                alert("Selecione um curso.");
                cursoTrilhaSelect.focus();
                return;
            }

            if (!ordem) {
                alert("Informe a ordem do curso na trilha.");
                ordemCursoTrilhaInput.focus();
                return;
            }

            const cursoJaVinculado = listarTrilhasCursos().some((item) => {
                return Number(item.idTrilha) === idTrilhaAtual && Number(item.idCurso) === idCurso;
            });

            if (cursoJaVinculado) {
                alert("Esse curso ja foi vinculado a esta trilha.");
                cursoTrilhaSelect.focus();
                return;
            }

            cadastrarTrilhaCurso(idTrilhaAtual, idCurso, ordem);
            renderizarCursosDaTrilha();
            configurarModalInsercaoTrilhaCurso();
            if (modalTrilhaCurso) {
                modalTrilhaCurso.hide();
            }
        });

        botaoInserirTrilhaCurso.addEventListener("click", abrirModalInsercaoTrilhaCurso);
        modalTrilhaCursoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoTrilhaCurso);

        configurarModalInsercaoTrilhaCurso();
        preencherSelectCursosDaTrilha();
        renderizarCursosDaTrilha();
    }
}



