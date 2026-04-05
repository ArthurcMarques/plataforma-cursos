import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class ProgressoAula {
    constructor(idUsuario, idAula, status, dataConclusao) {
        this.idUsuario = idUsuario;
        this.idAula = idAula;
        this.status = status;
        this.dataConclusao = dataConclusao;
    }
}

const CHAVE_STORAGE_PROGRESSO_AULAS = "progressoAulas";

const progressoAulas = carregarListaDoStorage(CHAVE_STORAGE_PROGRESSO_AULAS).map((item) => {
    return new ProgressoAula(item.idUsuario, item.idAula, item.status, item.dataConclusao);
});

function cadastrarProgressoAula(idUsuario, idAula, status, dataConclusao) {
    const novoProgresso = new ProgressoAula(idUsuario, idAula, status, dataConclusao);
    progressoAulas.push(novoProgresso);
    salvarListaNoStorage(CHAVE_STORAGE_PROGRESSO_AULAS, progressoAulas);
    return novoProgresso;
}

function listarProgressoAulas() {
    return progressoAulas;
}

export { ProgressoAula, progressoAulas, cadastrarProgressoAula, listarProgressoAulas };
