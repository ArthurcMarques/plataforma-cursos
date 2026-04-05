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
    return assinaturas.length + 1;
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

export { Assinatura, assinaturas, gerarIdAssinatura, cadastrarAssinatura, listarAssinaturas };
