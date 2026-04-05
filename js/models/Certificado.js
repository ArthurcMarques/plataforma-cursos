import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Certificado {
    constructor(id, idUsuario, idCurso, codigoVerificacao, dataEmissao) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.codigoVerificacao = codigoVerificacao;
        this.dataEmissao = dataEmissao;
    }
}

const CHAVE_STORAGE_CERTIFICADOS = "certificados";

const certificados = carregarListaDoStorage(CHAVE_STORAGE_CERTIFICADOS).map((item) => {
    return new Certificado(item.id, item.idUsuario, item.idCurso, item.codigoVerificacao, item.dataEmissao);
});

function gerarIdCertificado() {
    return certificados.length + 1;
}

function gerarCodigoVerificacao(idCertificado) {
    return `CERT-${String(idCertificado).padStart(3, "0")}`;
}

function cadastrarCertificado(idUsuario, idCurso, dataEmissao) {
    const id = gerarIdCertificado();
    const codigoVerificacao = gerarCodigoVerificacao(id);
    const novoCertificado = new Certificado(id, idUsuario, idCurso, codigoVerificacao, dataEmissao);

    certificados.push(novoCertificado);
    salvarListaNoStorage(CHAVE_STORAGE_CERTIFICADOS, certificados);
    return novoCertificado;
}

function listarCertificados() {
    return certificados;
}

export {
    Certificado,
    certificados,
    gerarIdCertificado,
    gerarCodigoVerificacao,
    cadastrarCertificado,
    listarCertificados
};
