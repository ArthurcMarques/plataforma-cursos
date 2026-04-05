import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Curso {
    constructor(id, titulo, descricao, nivel, idCategoria, idInstrutor, dataPublicacao) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.nivel = nivel;
        this.idCategoria = idCategoria;
        this.idInstrutor = idInstrutor;
        this.dataPublicacao = dataPublicacao;
    }
}

const CHAVE_STORAGE_CURSOS = "cursos";

const cursos = carregarListaDoStorage(CHAVE_STORAGE_CURSOS).map((item) => {
    return new Curso(
        item.id,
        item.titulo,
        item.descricao,
        item.nivel,
        item.idCategoria,
        item.idInstrutor,
        item.dataPublicacao
    );
});

function gerarIdCurso() {
    return cursos.length + 1;
}

function cadastrarCurso(titulo, descricao, nivel, idCategoria, idInstrutor, dataPublicacao) {
    const novoCurso = new Curso(
        gerarIdCurso(),
        titulo,
        descricao,
        nivel,
        idCategoria,
        idInstrutor,
        dataPublicacao
    );
    cursos.push(novoCurso);
    salvarListaNoStorage(CHAVE_STORAGE_CURSOS, cursos);
    return novoCurso;
}

function listarCursos() {
    return cursos;
}

export { Curso, cursos, gerarIdCurso, cadastrarCurso, listarCursos };
