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


const formCategoria = document.getElementById("form-categoria");
const nomeCategoriaInput = document.getElementById("nome-categoria");
const descricaoCategoriaInput = document.getElementById("descricao-categoria");
const tabelaCategoriasBody = document.getElementById("tabela-categorias");
const botaoInserirCategoria = document.getElementById("btn-inserir-categoria");
const modalCategoriaElement = document.getElementById("modal-categoria");
const tituloModalCategoria = document.getElementById("titulo-modal-categoria");
const botaoSalvarCategoria = document.getElementById("btn-salvar-categoria");

if (
    formCategoria &&
    nomeCategoriaInput &&
    descricaoCategoriaInput &&
    tabelaCategoriasBody &&
    botaoInserirCategoria &&
    modalCategoriaElement &&
    tituloModalCategoria &&
    botaoSalvarCategoria
) {
    let idCategoriaEmEdicao = null;
    const modalCategoria = window.bootstrap ? new window.bootstrap.Modal(modalCategoriaElement) : null;

    function configurarModalInsercao() {
        idCategoriaEmEdicao = null;
        tituloModalCategoria.textContent = "Nova Categoria";
        botaoSalvarCategoria.textContent = "Salvar";
        formCategoria.reset();
    }

    function abrirModalInsercao() {
        configurarModalInsercao();
        nomeCategoriaInput.focus();
    }

    function renderizarCategorias() {
        const categorias = listarCategorias();
        tabelaCategoriasBody.innerHTML = "";

        if (categorias.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 3;
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
                idCategoriaEmEdicao = categoria.id;
                nomeCategoriaInput.value = categoria.nome;
                descricaoCategoriaInput.value = categoria.descricao || "";
                tituloModalCategoria.textContent = "Editar Categoria";
                botaoSalvarCategoria.textContent = "Salvar alteracoes";
                if (modalCategoria) {
                    modalCategoria.show();
                }
            });

            itemEditar.appendChild(botaoEditar);

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir esta categoria?");
                if (!confirmar) {
                    return;
                }

                excluirCategoria(categoria.id);
                renderizarCategorias();
            });

            itemExcluir.appendChild(botaoExcluir);
            menu.appendChild(itemEditar);
            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaNome);
            linha.appendChild(colunaDescricao);
            linha.appendChild(colunaAcoes);
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
            return categoria.nome.toLowerCase() === nome.toLowerCase() && Number(categoria.id) !== Number(idCategoriaEmEdicao);
        });

        if (nomeJaExiste) {
            alert("Ja existe uma categoria com esse nome.");
            nomeCategoriaInput.focus();
            return;
        }

        if (idCategoriaEmEdicao === null) {
            cadastrarCategoria(nome, descricao);`r`n            window.showAppAlert("Categoria cadastrada com sucesso.", "success");
        } else {
            atualizarCategoria(idCategoriaEmEdicao, nome, descricao);
        }

        renderizarCategorias();
        configurarModalInsercao();
        if (modalCategoria) {
            modalCategoria.hide();
        }
    });

    botaoInserirCategoria.addEventListener("click", abrirModalInsercao);
    modalCategoriaElement.addEventListener("hidden.bs.modal", configurarModalInsercao);

    renderizarCategorias();
}



