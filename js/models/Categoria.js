class Categoria {
    constructor(id, nome, descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}

const categorias = [];

function gerarIdCategoria() {
    return categorias.length + 1;
}

function cadastrarCategoria(nome, descricao) {
    const novaCategoria = new Categoria(gerarIdCategoria(), nome, descricao);
    categorias.push(novaCategoria);
    return novaCategoria;
}

function listarCategorias() {
    return categorias;
}

export { Categoria, categorias, gerarIdCategoria, cadastrarCategoria, listarCategorias };
