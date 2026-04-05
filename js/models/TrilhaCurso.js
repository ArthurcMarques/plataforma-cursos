import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class TrilhaCurso {
    constructor(idTrilha, idCurso, ordem) {
        this.idTrilha = idTrilha;
        this.idCurso = idCurso;
        this.ordem = ordem;
    }
}

const CHAVE_STORAGE_TRILHAS_CURSOS = "trilhasCursos";

const trilhasCursos = carregarListaDoStorage(CHAVE_STORAGE_TRILHAS_CURSOS).map((item) => {
    return new TrilhaCurso(item.idTrilha, item.idCurso, item.ordem);
});

function cadastrarTrilhaCurso(idTrilha, idCurso, ordem) {
    const novoVinculo = new TrilhaCurso(idTrilha, idCurso, ordem);
    trilhasCursos.push(novoVinculo);
    salvarListaNoStorage(CHAVE_STORAGE_TRILHAS_CURSOS, trilhasCursos);
    return novoVinculo;
}

function listarTrilhasCursos() {
    return trilhasCursos;
}

export { TrilhaCurso, trilhasCursos, cadastrarTrilhaCurso, listarTrilhasCursos };
