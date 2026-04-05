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
    return pagamentos.length + 1;
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

export { Pagamento, pagamentos, gerarIdPagamento, cadastrarPagamento, listarPagamentos };
