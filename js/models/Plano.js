import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Plano {
    constructor(id, nome, descricao, preco, duracaoMeses) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.duracaoMeses = duracaoMeses;
    }
}

const CHAVE_STORAGE_PLANOS = "planos";

const planos = carregarListaDoStorage(CHAVE_STORAGE_PLANOS).map((item) => {
    return new Plano(item.id, item.nome, item.descricao, item.preco, item.duracaoMeses);
});

function gerarIdPlano() {
    return planos.length + 1;
}

function cadastrarPlano(nome, descricao, preco, duracaoMeses) {
    const novoPlano = new Plano(gerarIdPlano(), nome, descricao, preco, duracaoMeses);
    planos.push(novoPlano);
    salvarListaNoStorage(CHAVE_STORAGE_PLANOS, planos);
    return novoPlano;
}

function listarPlanos() {
    return planos;
}

export { Plano, planos, gerarIdPlano, cadastrarPlano, listarPlanos };
