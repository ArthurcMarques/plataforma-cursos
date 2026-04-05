import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Matricula {
    constructor(id, idUsuario, idCurso, dataMatricula) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.dataMatricula = dataMatricula;
    }
}

const CHAVE_STORAGE_MATRICULAS = "matriculas";

const matriculas = carregarListaDoStorage(CHAVE_STORAGE_MATRICULAS).map((item) => {
    return new Matricula(item.id, item.idUsuario, item.idCurso, item.dataMatricula);
});

function gerarIdMatricula() {
    return matriculas.length + 1;
}

function cadastrarMatricula(idUsuario, idCurso, dataMatricula) {
    const novaMatricula = new Matricula(gerarIdMatricula(), idUsuario, idCurso, dataMatricula);
    matriculas.push(novaMatricula);
    salvarListaNoStorage(CHAVE_STORAGE_MATRICULAS, matriculas);
    return novaMatricula;
}

function listarMatriculas() {
    return matriculas;
}

export { Matricula, matriculas, gerarIdMatricula, cadastrarMatricula, listarMatriculas };
