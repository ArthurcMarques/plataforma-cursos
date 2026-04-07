import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Pagamento {
    constructor(id, idAssinatura, valorPago, dataPagamento, metodoPagamento, idTransacaoGateway) {
        this.id = id;
        this.idAssinatura = idAssinatura;
        this.valorPago = valorPago;
        this.dataPagamento = dataPagamento;
        this.metodoPagamento = metodoPagamento;
        this.idTransacaoGateway = idTransacaoGateway;
    }
}

const CHAVE_STORAGE_PAGAMENTOS = "pagamentos";

const pagamentos = carregarListaDoStorage(CHAVE_STORAGE_PAGAMENTOS).map((item) => {
    return new Pagamento(
        item.id,
        item.idAssinatura,
        item.valorPago,
        item.dataPagamento,
        item.metodoPagamento,
        item.idTransacaoGateway
    );
});

function gerarIdPagamento() {
    if (pagamentos.length === 0) {
        return 1;
    }

    const maiorId = Math.max(...pagamentos.map((pagamento) => Number(pagamento.id) || 0));
    return maiorId + 1;
}

function cadastrarPagamento(idAssinatura, valorPago, dataPagamento, metodoPagamento, idTransacaoGateway) {
    const novoPagamento = new Pagamento(
        gerarIdPagamento(),
        idAssinatura,
        valorPago,
        dataPagamento,
        metodoPagamento,
        idTransacaoGateway
    );

    pagamentos.push(novoPagamento);
    salvarListaNoStorage(CHAVE_STORAGE_PAGAMENTOS, pagamentos);
    return novoPagamento;
}

function listarPagamentos() {
    return pagamentos;
}

function excluirPagamento(id) {
    const indice = pagamentos.findIndex((item) => Number(item.id) === Number(id));
    if (indice === -1) {
        return false;
    }

    pagamentos.splice(indice, 1);
    salvarListaNoStorage(CHAVE_STORAGE_PAGAMENTOS, pagamentos);
    return true;
}

export { Pagamento, pagamentos, gerarIdPagamento, cadastrarPagamento, listarPagamentos, excluirPagamento };

