import { cadastrarAula, excluirAula, listarAulas } from "../models/Aula.js";
import { cadastrarAvaliacao, excluirAvaliacao, listarAvaliacoes } from "../models/Avaliacao.js";
import { cadastrarAssinatura, excluirAssinatura, listarAssinaturas } from "../models/Assinatura.js";
import { atualizarCategoria, cadastrarCategoria, excluirCategoria, listarCategorias } from "../models/Categoria.js";
import { cadastrarCertificado, excluirCertificado, listarCertificados } from "../models/Certificado.js";
import { atualizarCurso, atualizarTotaisCurso, cadastrarCurso, excluirCurso, listarCursos } from "../models/Curso.js";
import { cadastrarMatricula, excluirMatricula, listarMatriculas } from "../models/Matricula.js";
import { cadastrarModulo, listarModulos } from "../models/Modulo.js";
import { cadastrarPagamento, excluirPagamento, listarPagamentos } from "../models/Pagamento.js";
import { cadastrarPlano, excluirPlano, listarPlanos } from "../models/Plano.js";
import { cadastrarProgressoAula, excluirProgressoAula, listarProgressoAulas } from "../models/ProgressoAula.js";
import { cadastrarTrilha, listarTrilhas } from "../models/Trilha.js";
import { cadastrarTrilhaCurso, excluirTrilhaCurso, listarTrilhasCursos } from "../models/TrilhaCurso.js";
import { atualizarUsuario, cadastrarUsuario, excluirUsuario, listarUsuarios } from "../models/Usuario.js";


const formPlano = document.getElementById("form-plano");
const nomePlanoInput = document.getElementById("nome-plano");
const descricaoPlanoInput = document.getElementById("descricao-plano");
const precoPlanoInput = document.getElementById("preco-plano");
const duracaoMesesInput = document.getElementById("duracao-meses");
const tabelaPlanosBody = document.getElementById("tabela-planos");
const botaoInserirPlano = document.getElementById("btn-inserir-plano");
const modalPlanoElement = document.getElementById("modal-plano");
const tituloModalPlano = document.getElementById("titulo-modal-plano");
const botaoSalvarPlano = document.getElementById("btn-salvar-plano");

if (
    formPlano &&
    nomePlanoInput &&
    descricaoPlanoInput &&
    precoPlanoInput &&
    duracaoMesesInput &&
    tabelaPlanosBody &&
    botaoInserirPlano &&
    modalPlanoElement &&
    tituloModalPlano &&
    botaoSalvarPlano
) {
    const modalPlano = window.bootstrap ? new window.bootstrap.Modal(modalPlanoElement) : null;

    function configurarModalInsercaoPlano() {
        formPlano.reset();
        window.aplicarDataPadraoHoje(formPlano);
        tituloModalPlano.textContent = "Novo Plano";
        botaoSalvarPlano.textContent = "Salvar";
    }

    function abrirModalInsercaoPlano() {
        configurarModalInsercaoPlano();
        nomePlanoInput.focus();
    }

    function renderizarPlanos() {
        const planos = listarPlanos();
        tabelaPlanosBody.innerHTML = "";

        if (planos.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 5;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum plano cadastrado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaPlanosBody.appendChild(linhaVazia);
            return;
        }

        planos.forEach((plano) => {
            const linha = document.createElement("tr");

            const colunaNome = document.createElement("td");
            colunaNome.textContent = plano.nome;

            const colunaDescricao = document.createElement("td");
            colunaDescricao.textContent = plano.descricao || "-";

            const colunaPreco = document.createElement("td");
            colunaPreco.textContent = `R$ ${Number(plano.preco).toFixed(2)}`;

            const colunaDuracao = document.createElement("td");
            colunaDuracao.textContent = `${plano.duracaoMeses} meses`;

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropup";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "Acoes";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir este plano?");
                if (!confirmar) {
                    return;
                }

                excluirPlano(plano.id);
                renderizarPlanos();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaNome);
            linha.appendChild(colunaDescricao);
            linha.appendChild(colunaPreco);
            linha.appendChild(colunaDuracao);
            linha.appendChild(colunaAcoes);
            tabelaPlanosBody.appendChild(linha);
        });
    }

    formPlano.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = nomePlanoInput.value.trim();
        const descricao = descricaoPlanoInput.value.trim();
        const precoTexto = precoPlanoInput.value;
        const duracaoTexto = duracaoMesesInput.value;
        const preco = Number(precoTexto);
        const duracaoMeses = Number(duracaoTexto);

        if (nome === "") {
            alert("Informe o nome do plano.");
            nomePlanoInput.focus();
            return;
        }

        if (precoTexto === "") {
            alert("Informe o preco.");
            precoPlanoInput.focus();
            return;
        }

        if (Number.isNaN(preco) || preco < 0) {
            alert("Informe um preco valido.");
            precoPlanoInput.focus();
            return;
        }

        if (duracaoTexto === "") {
            alert("Informe a duracao em meses.");
            duracaoMesesInput.focus();
            return;
        }

        if (Number.isNaN(duracaoMeses) || duracaoMeses <= 0) {
            alert("Informe uma duracao valida.");
            duracaoMesesInput.focus();
            return;
        }

        const nomeJaExiste = listarPlanos().some((plano) => {
            return plano.nome.toLowerCase() === nome.toLowerCase();
        });

        if (nomeJaExiste) {
            alert("Ja existe um plano com esse nome.");
            nomePlanoInput.focus();
            return;
        }

        cadastrarPlano(nome, descricao, preco, duracaoMeses);
        window.showAppAlert("Plano cadastrado com sucesso.", "success");
        renderizarPlanos();
        configurarModalInsercaoPlano();
        if (modalPlano) {
            modalPlano.hide();
        }
    });

    botaoInserirPlano.addEventListener("click", abrirModalInsercaoPlano);
    modalPlanoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoPlano);

    configurarModalInsercaoPlano();
    renderizarPlanos();
}

const formAssinatura = document.getElementById("form-assinatura");
const usuarioAssinaturaSelect = document.getElementById("usuario-assinatura");
const planoAssinaturaSelect = document.getElementById("plano-assinatura");
const dataInicioAssinaturaInput = document.getElementById("data-inicio-assinatura");
const dataFimAssinaturaInput = document.getElementById("data-fim-assinatura");
const tabelaAssinaturasBody = document.getElementById("tabela-assinaturas");
const botaoInserirAssinatura = document.getElementById("btn-inserir-assinatura");
const modalAssinaturaElement = document.getElementById("modal-assinatura");
const tituloModalAssinatura = document.getElementById("titulo-modal-assinatura");
const botaoSalvarAssinatura = document.getElementById("btn-salvar-assinatura");

if (
    formAssinatura &&
    usuarioAssinaturaSelect &&
    planoAssinaturaSelect &&
    dataInicioAssinaturaInput &&
    dataFimAssinaturaInput &&
    tabelaAssinaturasBody &&
    botaoInserirAssinatura &&
    modalAssinaturaElement &&
    tituloModalAssinatura &&
    botaoSalvarAssinatura
) {
    const modalAssinatura = window.bootstrap ? new window.bootstrap.Modal(modalAssinaturaElement) : null;

    function configurarModalInsercaoAssinatura() {
        formAssinatura.reset();
        window.aplicarDataPadraoHoje(formAssinatura);
        tituloModalAssinatura.textContent = "Nova Assinatura";
        botaoSalvarAssinatura.textContent = "Salvar";
    }

    function abrirModalInsercaoAssinatura() {
        preencherSelectUsuariosAssinatura();
        preencherSelectPlanosAssinatura();
        configurarModalInsercaoAssinatura();
        usuarioAssinaturaSelect.focus();
    }

    function preencherSelectUsuariosAssinatura() {
        usuarioAssinaturaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuario";
        usuarioAssinaturaSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioAssinaturaSelect.appendChild(opcao);
        });
    }

    function preencherSelectPlanosAssinatura() {
        planoAssinaturaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um plano";
        planoAssinaturaSelect.appendChild(opcaoPadrao);

        const planos = listarPlanos();
        planos.forEach((plano) => {
            const opcao = document.createElement("option");
            opcao.value = plano.id;
            opcao.textContent = plano.nome;
            planoAssinaturaSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuarioAssinatura(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarNomePlanoAssinatura(idPlano) {
        const plano = listarPlanos().find((item) => Number(item.id) === Number(idPlano));
        return plano ? plano.nome : "-";
    }

    function formatarDataParaInput(data) {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function calcularDataFimPelaDuracao(dataInicio, duracaoMeses) {
        if (!dataInicio || !duracaoMeses) {
            return "";
        }

        const dataCalculada = new Date(`${dataInicio}T00:00:00`);
        if (Number.isNaN(dataCalculada.getTime())) {
            return "";
        }

        dataCalculada.setMonth(dataCalculada.getMonth() + Number(duracaoMeses));
        return formatarDataParaInput(dataCalculada);
    }

    function preencherDataFimAutomatica() {
        const idPlano = Number(planoAssinaturaSelect.value);
        const dataInicio = dataInicioAssinaturaInput.value;

        if (!idPlano || dataInicio === "") {
            return;
        }

        const plano = listarPlanos().find((item) => Number(item.id) === idPlano);
        if (!plano) {
            return;
        }

        const dataFimCalculada = calcularDataFimPelaDuracao(dataInicio, plano.duracaoMeses);
        if (dataFimCalculada !== "") {
            dataFimAssinaturaInput.value = dataFimCalculada;
        }
    }

    function renderizarAssinaturas() {
        const assinaturas = listarAssinaturas();
        tabelaAssinaturasBody.innerHTML = "";

        if (assinaturas.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 5;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma assinatura cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaAssinaturasBody.appendChild(linhaVazia);
            return;
        }

        assinaturas.forEach((assinatura) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuarioAssinatura(assinatura.idUsuario);

            const colunaPlano = document.createElement("td");
            colunaPlano.textContent = buscarNomePlanoAssinatura(assinatura.idPlano);

            const colunaDataInicio = document.createElement("td");
            colunaDataInicio.textContent = assinatura.dataInicio;

            const colunaDataFim = document.createElement("td");
            colunaDataFim.textContent = assinatura.dataFim;

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropup";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "Acoes";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir esta assinatura?");
                if (!confirmar) {
                    return;
                }

                excluirAssinatura(assinatura.id);
                renderizarAssinaturas();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaPlano);
            linha.appendChild(colunaDataInicio);
            linha.appendChild(colunaDataFim);
            linha.appendChild(colunaAcoes);
            tabelaAssinaturasBody.appendChild(linha);
        });
    }

    formAssinatura.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioAssinaturaSelect.value);
        const idPlano = Number(planoAssinaturaSelect.value);
        const dataInicio = dataInicioAssinaturaInput.value;

        if (dataFimAssinaturaInput.value === "") {
            preencherDataFimAutomatica();
        }

        const dataFim = dataFimAssinaturaInput.value;

        if (!idUsuario) {
            alert("Selecione um usuario.");
            usuarioAssinaturaSelect.focus();
            return;
        }

        if (!idPlano) {
            alert("Selecione um plano.");
            planoAssinaturaSelect.focus();
            return;
        }

        if (dataInicio === "") {
            alert("Informe a data de inicio.");
            dataInicioAssinaturaInput.focus();
            return;
        }

        if (dataFim === "") {
            alert("Informe a data de fim.");
            dataFimAssinaturaInput.focus();
            return;
        }

        const assinaturaDuplicada = listarAssinaturas().some((assinatura) => {
            return (
                Number(assinatura.idUsuario) === idUsuario &&
                Number(assinatura.idPlano) === idPlano &&
                assinatura.dataInicio === dataInicio &&
                assinatura.dataFim === dataFim
            );
        });

        if (assinaturaDuplicada) {
            alert("Essa assinatura ja foi registrada.");
            usuarioAssinaturaSelect.focus();
            return;
        }

        cadastrarAssinatura(idUsuario, idPlano, dataInicio, dataFim);
        window.showAppAlert("Assinatura registrada com sucesso.", "success");
        renderizarAssinaturas();
        configurarModalInsercaoAssinatura();
        if (modalAssinatura) {
            modalAssinatura.hide();
        }
    });

    planoAssinaturaSelect.addEventListener("change", preencherDataFimAutomatica);
    dataInicioAssinaturaInput.addEventListener("change", preencherDataFimAutomatica);

    botaoInserirAssinatura.addEventListener("click", abrirModalInsercaoAssinatura);
    modalAssinaturaElement.addEventListener("hidden.bs.modal", configurarModalInsercaoAssinatura);

    configurarModalInsercaoAssinatura();
    preencherSelectUsuariosAssinatura();
    preencherSelectPlanosAssinatura();
    renderizarAssinaturas();
}

const formPagamento = document.getElementById("form-pagamento");
const usuarioCheckoutPagamentoSelect = document.getElementById("usuario-checkout-pagamento");
const assinaturaPagamentoSelect = document.getElementById("assinatura-pagamento");
const valorPagoInput = document.getElementById("valor-pago");
const dataPagamentoInput = document.getElementById("data-pagamento");
const metodoPagamentoSelect = document.getElementById("metodo-pagamento");
const idTransacaoInput = document.getElementById("id-transacao");
const tabelaPagamentosBody = document.getElementById("tabela-pagamentos");
const botaoInserirPagamento = document.getElementById("btn-inserir-pagamento");
const modalPagamentoElement = document.getElementById("modal-pagamento");
const tituloModalPagamento = document.getElementById("titulo-modal-pagamento");
const botaoSalvarPagamento = document.getElementById("btn-salvar-pagamento");

if (
    formPagamento &&
    usuarioCheckoutPagamentoSelect &&
    assinaturaPagamentoSelect &&
    valorPagoInput &&
    dataPagamentoInput &&
    metodoPagamentoSelect &&
    idTransacaoInput &&
    tabelaPagamentosBody &&
    botaoInserirPagamento &&
    modalPagamentoElement &&
    tituloModalPagamento &&
    botaoSalvarPagamento
) {
    const modalPagamento = window.bootstrap ? new window.bootstrap.Modal(modalPagamentoElement) : null;

    function configurarModalInsercaoPagamento() {
        formPagamento.reset();
        window.aplicarDataPadraoHoje(formPagamento);
        tituloModalPagamento.textContent = "Novo Pagamento";
        botaoSalvarPagamento.textContent = "Salvar";
    }

    function abrirModalInsercaoPagamento() {
        preencherSelectUsuariosCheckoutPagamento();
        preencherSelectAssinaturasPagamento();
        preencherValorPagoAutomatico();
        configurarModalInsercaoPagamento();
        usuarioCheckoutPagamentoSelect.focus();
    }

    function buscarNomeUsuarioPagamento(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "Usuario";
    }

    function buscarNomePlanoPagamento(idPlano) {
        const plano = listarPlanos().find((item) => Number(item.id) === Number(idPlano));
        return plano ? plano.nome : "Plano";
    }

    function montarDescricaoAssinatura(assinatura) {
        if (!assinatura) {
            return "-";
        }

        const nomeUsuario = buscarNomeUsuarioPagamento(assinatura.idUsuario);
        const nomePlano = buscarNomePlanoPagamento(assinatura.idPlano);
        return `${nomeUsuario} - ${nomePlano}`;
    }

    function preencherSelectAssinaturasPagamento() {
        const idUsuarioSelecionado = Number(usuarioCheckoutPagamentoSelect.value);
        assinaturaPagamentoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione uma assinatura";
        assinaturaPagamentoSelect.appendChild(opcaoPadrao);

        const assinaturas = listarAssinaturas().filter((assinatura) => {
            if (!idUsuarioSelecionado) {
                return true;
            }

            return Number(assinatura.idUsuario) === idUsuarioSelecionado;
        });
        assinaturas.forEach((assinatura) => {
            const opcao = document.createElement("option");
            opcao.value = assinatura.id;
            opcao.textContent = montarDescricaoAssinatura(assinatura);
            assinaturaPagamentoSelect.appendChild(opcao);
        });
    }

    function preencherSelectUsuariosCheckoutPagamento() {
        usuarioCheckoutPagamentoSelect.innerHTML = "";

        const opcaoTodos = document.createElement("option");
        opcaoTodos.value = "";
        opcaoTodos.textContent = "Todos os usuários";
        usuarioCheckoutPagamentoSelect.appendChild(opcaoTodos);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioCheckoutPagamentoSelect.appendChild(opcao);
        });
    }

    function buscarDescricaoAssinaturaPagamento(idAssinatura) {
        const assinatura = listarAssinaturas().find((item) => Number(item.id) === Number(idAssinatura));
        return montarDescricaoAssinatura(assinatura);
    }

    function buscarPrecoPlanoDaAssinatura(idAssinatura) {
        const assinatura = listarAssinaturas().find((item) => Number(item.id) === Number(idAssinatura));
        if (!assinatura) {
            return null;
        }

        const plano = listarPlanos().find((item) => Number(item.id) === Number(assinatura.idPlano));
        if (!plano) {
            return null;
        }

        const preco = Number(plano.preco);
        if (Number.isNaN(preco)) {
            return null;
        }

        return preco;
    }

    function preencherValorPagoAutomatico() {
        const idAssinatura = Number(assinaturaPagamentoSelect.value);

        if (!idAssinatura) {
            valorPagoInput.value = "";
            return;
        }

        const precoPlano = buscarPrecoPlanoDaAssinatura(idAssinatura);
        if (precoPlano !== null) {
            valorPagoInput.value = precoPlano.toFixed(2);
        }
    }

    function renderizarPagamentos() {
        const pagamentos = listarPagamentos();
        tabelaPagamentosBody.innerHTML = "";

        if (pagamentos.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 6;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum pagamento cadastrado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaPagamentosBody.appendChild(linhaVazia);
            return;
        }

        pagamentos.forEach((pagamento) => {
            const linha = document.createElement("tr");

            const colunaAssinatura = document.createElement("td");
            colunaAssinatura.textContent = buscarDescricaoAssinaturaPagamento(pagamento.idAssinatura);

            const colunaValor = document.createElement("td");
            colunaValor.textContent = `R$ ${Number(pagamento.valorPago).toFixed(2)}`;

            const colunaData = document.createElement("td");
            colunaData.textContent = pagamento.dataPagamento;

            const colunaMetodo = document.createElement("td");
            colunaMetodo.textContent = pagamento.metodoPagamento;

            const colunaTransacao = document.createElement("td");
            colunaTransacao.textContent = pagamento.idTransacaoGateway;

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropup";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "Acoes";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir este pagamento?");
                if (!confirmar) {
                    return;
                }

                excluirPagamento(pagamento.id);
                renderizarPagamentos();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaAssinatura);
            linha.appendChild(colunaValor);
            linha.appendChild(colunaData);
            linha.appendChild(colunaMetodo);
            linha.appendChild(colunaTransacao);
            linha.appendChild(colunaAcoes);
            tabelaPagamentosBody.appendChild(linha);
        });
    }

    formPagamento.addEventListener("submit", (event) => {
        event.preventDefault();

        const idAssinatura = Number(assinaturaPagamentoSelect.value);
        const valorPagoTexto = valorPagoInput.value;
        const valorPago = Number(valorPagoTexto);
        const dataPagamento = dataPagamentoInput.value;
        const metodoPagamento = metodoPagamentoSelect.value;
        const idTransacaoGateway = idTransacaoInput.value.trim();

        if (!idAssinatura) {
            alert("Selecione a assinatura.");
            assinaturaPagamentoSelect.focus();
            return;
        }

        if (valorPagoTexto === "") {
            alert("Informe o valor pago.");
            valorPagoInput.focus();
            return;
        }

        if (Number.isNaN(valorPago) || valorPago < 0) {
            alert("Informe um valor valido.");
            valorPagoInput.focus();
            return;
        }

        if (dataPagamento === "") {
            alert("Informe a data do pagamento.");
            dataPagamentoInput.focus();
            return;
        }

        if (metodoPagamento === "") {
            alert("Selecione o metodo de pagamento.");
            metodoPagamentoSelect.focus();
            return;
        }

        if (idTransacaoGateway === "") {
            alert("Informe o ID da transacao.");
            idTransacaoInput.focus();
            return;
        }

        const transacaoJaExiste = listarPagamentos().some((pagamento) => {
            return pagamento.idTransacaoGateway.toLowerCase() === idTransacaoGateway.toLowerCase();
        });

        if (transacaoJaExiste) {
            alert("Ja existe pagamento com esse ID de transacao.");
            idTransacaoInput.focus();
            return;
        }

        cadastrarPagamento(idAssinatura, valorPago, dataPagamento, metodoPagamento, idTransacaoGateway);
        window.showAppAlert("Pagamento registrado com sucesso.", "success");
        renderizarPagamentos();
        configurarModalInsercaoPagamento();
        if (modalPagamento) {
            modalPagamento.hide();
        }
    });

    assinaturaPagamentoSelect.addEventListener("change", preencherValorPagoAutomatico);
    usuarioCheckoutPagamentoSelect.addEventListener("change", () => {
        preencherSelectAssinaturasPagamento();
        preencherValorPagoAutomatico();
    });

    botaoInserirPagamento.addEventListener("click", abrirModalInsercaoPagamento);
    modalPagamentoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoPagamento);

    configurarModalInsercaoPagamento();
    preencherSelectUsuariosCheckoutPagamento();
    preencherSelectAssinaturasPagamento();
    preencherValorPagoAutomatico();
    renderizarPagamentos();
}








