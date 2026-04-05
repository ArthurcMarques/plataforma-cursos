import { cadastrarCategoria, listarCategorias } from "./models/Categoria.js";

const formCategoria = document.getElementById("form-categoria");
const nomeCategoriaInput = document.getElementById("nome-categoria");
const descricaoCategoriaInput = document.getElementById("descricao-categoria");
const tabelaCategoriasBody = document.getElementById("tabela-categorias");

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
        alert("Já existe uma categoria com esse nome.");
        nomeCategoriaInput.focus();
        return;
    }

    cadastrarCategoria(nome, descricao);
    renderizarCategorias();
    formCategoria.reset();
    nomeCategoriaInput.focus();
});

renderizarCategorias();
