import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Modulo {
    constructor(id, idCurso, titulo, ordem) {
        this.id = id;
        this.idCurso = idCurso;
        this.titulo = titulo;
        this.ordem = ordem;
    }
}

const CHAVE_STORAGE_MODULOS = "modulos";

const modulos = carregarListaDoStorage(CHAVE_STORAGE_MODULOS).map((item) => {
    return new Modulo(item.id, item.idCurso, item.titulo, item.ordem);
});

function gerarIdModulo() {
    return modulos.length + 1;
}

function cadastrarModulo(idCurso, titulo, ordem) {
    const novoModulo = new Modulo(gerarIdModulo(), idCurso, titulo, ordem);
    modulos.push(novoModulo);
    salvarListaNoStorage(CHAVE_STORAGE_MODULOS, modulos);
    return novoModulo;
}

function listarModulos() {
    return modulos;
}

export { Modulo, modulos, gerarIdModulo, cadastrarModulo, listarModulos };

