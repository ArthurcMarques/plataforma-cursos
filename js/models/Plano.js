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
    if (planos.length === 0) {
        return 1;
    }

    const maiorId = Math.max(...planos.map((plano) => Number(plano.id) || 0));
    return maiorId + 1;
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

function excluirPlano(id) {
    const indice = planos.findIndex((item) => Number(item.id) === Number(id));
    if (indice === -1) {
        return false;
    }

    planos.splice(indice, 1);
    salvarListaNoStorage(CHAVE_STORAGE_PLANOS, planos);
    return true;
}

export { Plano, planos, gerarIdPlano, cadastrarPlano, listarPlanos, excluirPlano };
