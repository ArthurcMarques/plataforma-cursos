import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Curso {
    constructor(id, titulo, descricao, nivel, idCategoria, idInstrutor, dataPublicacao, totalAulas = 0) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.nivel = nivel;
        this.idCategoria = idCategoria;
        this.idInstrutor = idInstrutor;
        this.dataPublicacao = dataPublicacao;
        this.totalAulas = Number(totalAulas) || 0;
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
        item.dataPublicacao,
        item.totalAulas
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
        dataPublicacao,
        0
    );
    cursos.push(novoCurso);
    salvarListaNoStorage(CHAVE_STORAGE_CURSOS, cursos);
    return novoCurso;
}

function listarCursos() {
    return cursos;
}

function atualizarTotalAulasCurso(idCurso, totalAulas) {
    const curso = cursos.find((item) => Number(item.id) === Number(idCurso));
    if (!curso) {
        return null;
    }

    curso.totalAulas = Number(totalAulas) || 0;
    salvarListaNoStorage(CHAVE_STORAGE_CURSOS, cursos);
    return curso;
}

export { Curso, cursos, gerarIdCurso, cadastrarCurso, listarCursos, atualizarTotalAulasCurso };
