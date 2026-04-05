import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Matricula {
    constructor(id, idUsuario, idCurso, dataMatricula, dataConclusao = null) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.dataMatricula = dataMatricula;
        this.dataConclusao = dataConclusao;
    }
}

const CHAVE_STORAGE_MATRICULAS = "matriculas";

const matriculas = carregarListaDoStorage(CHAVE_STORAGE_MATRICULAS).map((item) => {
    return new Matricula(item.id, item.idUsuario, item.idCurso, item.dataMatricula, item.dataConclusao);
});

function gerarIdMatricula() {
    if (matriculas.length === 0) {
        return 1;
    }

    const maiorId = Math.max(...matriculas.map((matricula) => Number(matricula.id) || 0));
    return maiorId + 1;
}

function cadastrarMatricula(idUsuario, idCurso, dataMatricula, dataConclusao = null) {
    const novaMatricula = new Matricula(gerarIdMatricula(), idUsuario, idCurso, dataMatricula, dataConclusao);
    matriculas.push(novaMatricula);
    salvarListaNoStorage(CHAVE_STORAGE_MATRICULAS, matriculas);
    return novaMatricula;
}

function listarMatriculas() {
    return matriculas;
}

function excluirMatricula(id) {
    const indice = matriculas.findIndex((item) => Number(item.id) === Number(id));
    if (indice === -1) {
        return false;
    }

    matriculas.splice(indice, 1);
    salvarListaNoStorage(CHAVE_STORAGE_MATRICULAS, matriculas);
    return true;
}

export { Matricula, matriculas, gerarIdMatricula, cadastrarMatricula, listarMatriculas, excluirMatricula };
