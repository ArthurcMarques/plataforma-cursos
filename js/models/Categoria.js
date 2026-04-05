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
    return categorias.length + 1;
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

export { Categoria, categorias, gerarIdCategoria, cadastrarCategoria, listarCategorias };
