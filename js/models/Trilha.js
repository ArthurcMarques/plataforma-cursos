import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Trilha {
    constructor(id, titulo, descricao, idCategoria) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.idCategoria = idCategoria;
    }
}

const CHAVE_STORAGE_TRILHAS = "trilhas";

const trilhas = carregarListaDoStorage(CHAVE_STORAGE_TRILHAS).map((item) => {
    return new Trilha(item.id, item.titulo, item.descricao, item.idCategoria);
});

function gerarIdTrilha() {
    return trilhas.length + 1;
}

function cadastrarTrilha(titulo, descricao, idCategoria) {
    const novaTrilha = new Trilha(gerarIdTrilha(), titulo, descricao, idCategoria);
    trilhas.push(novaTrilha);
    salvarListaNoStorage(CHAVE_STORAGE_TRILHAS, trilhas);
    return novaTrilha;
}

function listarTrilhas() {
    return trilhas;
}

export { Trilha, trilhas, gerarIdTrilha, cadastrarTrilha, listarTrilhas };

