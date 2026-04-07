import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Assinatura {
    constructor(id, idUsuario, idPlano, dataInicio, dataFim) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idPlano = idPlano;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }
}

const CHAVE_STORAGE_ASSINATURAS = "assinaturas";

const assinaturas = carregarListaDoStorage(CHAVE_STORAGE_ASSINATURAS).map((item) => {
    return new Assinatura(item.id, item.idUsuario, item.idPlano, item.dataInicio, item.dataFim);
});

function gerarIdAssinatura() {
    if (assinaturas.length === 0) {
        return 1;
    }

    const maiorId = Math.max(...assinaturas.map((assinatura) => Number(assinatura.id) || 0));
    return maiorId + 1;
}

function cadastrarAssinatura(idUsuario, idPlano, dataInicio, dataFim) {
    const novaAssinatura = new Assinatura(gerarIdAssinatura(), idUsuario, idPlano, dataInicio, dataFim);
    assinaturas.push(novaAssinatura);
    salvarListaNoStorage(CHAVE_STORAGE_ASSINATURAS, assinaturas);
    return novaAssinatura;
}

function listarAssinaturas() {
    return assinaturas;
}

function excluirAssinatura(id) {
    const indice = assinaturas.findIndex((item) => Number(item.id) === Number(id));
    if (indice === -1) {
        return false;
    }

    assinaturas.splice(indice, 1);
    salvarListaNoStorage(CHAVE_STORAGE_ASSINATURAS, assinaturas);
    return true;
}

export { Assinatura, assinaturas, gerarIdAssinatura, cadastrarAssinatura, listarAssinaturas, excluirAssinatura };

