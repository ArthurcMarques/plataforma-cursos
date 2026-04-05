import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Certificado {
    constructor(id, idUsuario, idCurso, codigoVerificacao, dataEmissao, idTrilha = null) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.codigoVerificacao = codigoVerificacao;
        this.dataEmissao = dataEmissao;
        this.idTrilha = idTrilha;
    }
}

const CHAVE_STORAGE_CERTIFICADOS = "certificados";

const certificados = carregarListaDoStorage(CHAVE_STORAGE_CERTIFICADOS).map((item) => {
    return new Certificado(item.id, item.idUsuario, item.idCurso, item.codigoVerificacao, item.dataEmissao, item.idTrilha);
});

function gerarIdCertificado() {
    if (certificados.length === 0) {
        return 1;
    }

    const maiorId = Math.max(...certificados.map((certificado) => Number(certificado.id) || 0));
    return maiorId + 1;
}

function gerarCodigoVerificacao(idCertificado) {
    return `CERT-${String(idCertificado).padStart(3, "0")}`;
}

function cadastrarCertificado(idUsuario, idCurso, dataEmissao, idTrilha = null) {
    const id = gerarIdCertificado();
    const codigoVerificacao = gerarCodigoVerificacao(id);
    const novoCertificado = new Certificado(id, idUsuario, idCurso, codigoVerificacao, dataEmissao, idTrilha);

    certificados.push(novoCertificado);
    salvarListaNoStorage(CHAVE_STORAGE_CERTIFICADOS, certificados);
    return novoCertificado;
}

function listarCertificados() {
    return certificados;
}

function excluirCertificado(id) {
    const indice = certificados.findIndex((item) => Number(item.id) === Number(id));
    if (indice === -1) {
        return false;
    }

    certificados.splice(indice, 1);
    salvarListaNoStorage(CHAVE_STORAGE_CERTIFICADOS, certificados);
    return true;
}

export {
    Certificado,
    certificados,
    gerarIdCertificado,
    gerarCodigoVerificacao,
    cadastrarCertificado,
    listarCertificados,
    excluirCertificado
};
