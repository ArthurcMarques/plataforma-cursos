import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Aula {
    constructor(id, idModulo, titulo, tipoConteudo, urlConteudo, duracaoMinutos, ordem) {
        this.id = id;
        this.idModulo = idModulo;
        this.titulo = titulo;
        this.tipoConteudo = tipoConteudo;
        this.urlConteudo = urlConteudo;
        this.duracaoMinutos = duracaoMinutos;
        this.ordem = ordem;
    }
}

const CHAVE_STORAGE_AULAS = "aulas";

const aulas = carregarListaDoStorage(CHAVE_STORAGE_AULAS).map((item) => {
    return new Aula(
        item.id,
        item.idModulo,
        item.titulo,
        item.tipoConteudo,
        item.urlConteudo,
        item.duracaoMinutos,
        item.ordem
    );
});

function gerarIdAula() {
    if (aulas.length === 0) {
        return 1;
    }

    const maiorId = Math.max(...aulas.map((aula) => Number(aula.id) || 0));
    return maiorId + 1;
}

function cadastrarAula(idModulo, titulo, tipoConteudo, urlConteudo, duracaoMinutos, ordem) {
    const novaAula = new Aula(
        gerarIdAula(),
        idModulo,
        titulo,
        tipoConteudo,
        urlConteudo,
        duracaoMinutos,
        ordem
    );
    aulas.push(novaAula);
    salvarListaNoStorage(CHAVE_STORAGE_AULAS, aulas);
    return novaAula;
}

function listarAulas() {
    return aulas;
}

function excluirAula(id) {
    const indice = aulas.findIndex((item) => Number(item.id) === Number(id));
    if (indice === -1) {
        return false;
    }

    aulas.splice(indice, 1);
    salvarListaNoStorage(CHAVE_STORAGE_AULAS, aulas);
    return true;
}

export { Aula, aulas, gerarIdAula, cadastrarAula, listarAulas, excluirAula };

