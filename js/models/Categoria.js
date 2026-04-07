import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Categoria {
    constructor(id, nome, descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}

const CHAVE_STORAGE_CATEGORIAS = "categorias";

const categorias = carregarListaDoStorage(CHAVE_STORAGE_CATEGORIAS).map((item) => {
    return new Categoria(item.id, item.nome, item.descricao);
});

function gerarIdCategoria() {
    if (categorias.length === 0) {
        return 1;
    }

    const maiorId = Math.max(...categorias.map((categoria) => Number(categoria.id) || 0));
    return maiorId + 1;
}

function cadastrarCategoria(nome, descricao) {
    const novaCategoria = new Categoria(gerarIdCategoria(), nome, descricao);
    categorias.push(novaCategoria);
    salvarListaNoStorage(CHAVE_STORAGE_CATEGORIAS, categorias);
    return novaCategoria;
}

function listarCategorias() {
    return categorias;
}

function atualizarCategoria(id, nome, descricao) {
    const categoria = categorias.find((item) => Number(item.id) === Number(id));
    if (!categoria) {
        return null;
    }

    categoria.nome = nome;
    categoria.descricao = descricao;
    salvarListaNoStorage(CHAVE_STORAGE_CATEGORIAS, categorias);
    return categoria;
}

function excluirCategoria(id) {
    const indice = categorias.findIndex((item) => Number(item.id) === Number(id));
    if (indice === -1) {
        return false;
    }

    categorias.splice(indice, 1);
    salvarListaNoStorage(CHAVE_STORAGE_CATEGORIAS, categorias);
    return true;
}

export {
    Categoria,
    categorias,
    gerarIdCategoria,
    cadastrarCategoria,
    listarCategorias,
    atualizarCategoria,
    excluirCategoria
};

