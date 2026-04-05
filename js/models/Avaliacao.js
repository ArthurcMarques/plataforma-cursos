import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Avaliacao {
    constructor(id, idUsuario, idCurso, nota, comentario, dataAvaliacao) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.nota = nota;
        this.comentario = comentario;
        this.dataAvaliacao = dataAvaliacao;
    }
}

const CHAVE_STORAGE_AVALIACOES = "avaliacoes";

const avaliacoes = carregarListaDoStorage(CHAVE_STORAGE_AVALIACOES).map((item) => {
    return new Avaliacao(item.id, item.idUsuario, item.idCurso, item.nota, item.comentario, item.dataAvaliacao);
});

function gerarIdAvaliacao() {
    if (avaliacoes.length === 0) {
        return 1;
    }

    const maiorId = Math.max(...avaliacoes.map((avaliacao) => Number(avaliacao.id) || 0));
    return maiorId + 1;
}

function cadastrarAvaliacao(idUsuario, idCurso, nota, comentario, dataAvaliacao) {
    const novaAvaliacao = new Avaliacao(
        gerarIdAvaliacao(),
        idUsuario,
        idCurso,
        nota,
        comentario,
        dataAvaliacao
    );

    avaliacoes.push(novaAvaliacao);
    salvarListaNoStorage(CHAVE_STORAGE_AVALIACOES, avaliacoes);
    return novaAvaliacao;
}

function listarAvaliacoes() {
    return avaliacoes;
}

function excluirAvaliacao(id) {
    const indice = avaliacoes.findIndex((item) => Number(item.id) === Number(id));
    if (indice === -1) {
        return false;
    }

    avaliacoes.splice(indice, 1);
    salvarListaNoStorage(CHAVE_STORAGE_AVALIACOES, avaliacoes);
    return true;
}

export {
    Avaliacao,
    avaliacoes,
    gerarIdAvaliacao,
    cadastrarAvaliacao,
    listarAvaliacoes,
    excluirAvaliacao
};
