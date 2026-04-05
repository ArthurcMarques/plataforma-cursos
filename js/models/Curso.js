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

const cursos = [];

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
    return novoCurso;
}

function listarCursos() {
    return cursos;
}

export { Curso, cursos, gerarIdCurso, cadastrarCurso, listarCursos };
