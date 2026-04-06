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


const formModulo = document.getElementById("form-modulo");
const tituloModuloInput = document.getElementById("titulo-modulo");
const ordemModuloInput = document.getElementById("ordem-modulo");
const nomeCursoSelecionado = document.getElementById("nome-curso-selecionado");
const tabelaModulosBody = document.getElementById("tabela-modulos");
const botaoInserirModulo = document.getElementById("btn-inserir-modulo");
const modalModuloElement = document.getElementById("modal-modulo");
const tituloModalModulo = document.getElementById("titulo-modal-modulo");
const botaoSalvarModulo = document.getElementById("btn-salvar-modulo");

if (
    formModulo &&
    tituloModuloInput &&
    ordemModuloInput &&
    nomeCursoSelecionado &&
    tabelaModulosBody &&
    botaoInserirModulo &&
    modalModuloElement &&
    tituloModalModulo &&
    botaoSalvarModulo
) {
    const modalModulo = window.bootstrap ? new window.bootstrap.Modal(modalModuloElement) : null;
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idCursoAtual = Number(parametrosUrl.get("idCurso"));

    function configurarModalInsercaoModulo() {
        formModulo.reset();
        tituloModalModulo.textContent = "Novo Modulo";
        botaoSalvarModulo.textContent = "Salvar";
    }

    function abrirModalInsercaoModulo() {
        configurarModalInsercaoModulo();
        tituloModuloInput.focus();
    }

    function mostrarErroCurso(mensagem) {
        nomeCursoSelecionado.className = "fw-semibold text-danger mb-0";
        nomeCursoSelecionado.textContent = mensagem;
        tabelaModulosBody.innerHTML = "";

        const linhaErro = document.createElement("tr");
        const colunaErro = document.createElement("td");
        colunaErro.colSpan = 3;
        colunaErro.className = "text-center text-danger";
        colunaErro.textContent = mensagem;
        linhaErro.appendChild(colunaErro);
        tabelaModulosBody.appendChild(linhaErro);

        tituloModuloInput.disabled = true;
        ordemModuloInput.disabled = true;
        const botaoCadastrar = formModulo.querySelector("button[type='submit']");
        if (botaoCadastrar) {
            botaoCadastrar.disabled = true;
        }
        botaoInserirModulo.disabled = true;
    }

    const cursoAtual = listarCursos().find((curso) => Number(curso.id) === idCursoAtual);

    if (!idCursoAtual || !cursoAtual) {
        mostrarErroCurso("Curso nao encontrado.");
    } else {
        nomeCursoSelecionado.textContent = cursoAtual.titulo;

        function renderizarModulosCurso() {
            const modulosCurso = listarModulos().filter((modulo) => Number(modulo.idCurso) === idCursoAtual);
            tabelaModulosBody.innerHTML = "";

            if (modulosCurso.length === 0) {
                const linhaVazia = document.createElement("tr");
                const colunaVazia = document.createElement("td");
                colunaVazia.colSpan = 3;
                colunaVazia.className = "text-center text-muted";
                colunaVazia.textContent = "Nenhum modulo cadastrado para este curso.";
                linhaVazia.appendChild(colunaVazia);
                tabelaModulosBody.appendChild(linhaVazia);
                return;
            }

            modulosCurso.forEach((modulo) => {
                const linha = document.createElement("tr");

                const colunaTitulo = document.createElement("td");
                colunaTitulo.textContent = modulo.titulo;

                const colunaOrdem = document.createElement("td");
                colunaOrdem.textContent = modulo.ordem;

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

                const itemGerenciar = document.createElement("li");
                const linkAulas = document.createElement("a");
                linkAulas.className = "dropdown-item";
                linkAulas.href = `./aulas.html?idModulo=${modulo.id}`;
                linkAulas.textContent = "Gerenciar aulas";
                itemGerenciar.appendChild(linkAulas);

                menu.appendChild(itemGerenciar);
                dropdown.appendChild(botaoAcoes);
                dropdown.appendChild(menu);
                colunaAcoes.appendChild(dropdown);

                linha.appendChild(colunaTitulo);
                linha.appendChild(colunaOrdem);
                linha.appendChild(colunaAcoes);
                tabelaModulosBody.appendChild(linha);
            });
        }

        formModulo.addEventListener("submit", (event) => {
            event.preventDefault();

            const titulo = tituloModuloInput.value.trim();
            const ordem = Number(ordemModuloInput.value);

            if (titulo === "") {
                alert("Informe o titulo do modulo.");
                tituloModuloInput.focus();
                return;
            }

            if (!ordem) {
                alert("Informe a ordem do modulo.");
                ordemModuloInput.focus();
                return;
            }

            const ordemJaExiste = listarModulos().some((modulo) => {
                return Number(modulo.idCurso) === idCursoAtual && Number(modulo.ordem) === ordem;
            });

            if (ordemJaExiste) {
                alert("Ja existe um modulo com essa ordem neste curso.");
                ordemModuloInput.focus();
                return;
            }

            cadastrarModulo(idCursoAtual, titulo, ordem);`r`n            window.showAppAlert("Modulo cadastrado com sucesso.", "success");
            renderizarModulosCurso();
            configurarModalInsercaoModulo();
            if (modalModulo) {
                modalModulo.hide();
            }
        });

        botaoInserirModulo.addEventListener("click", abrirModalInsercaoModulo);
        modalModuloElement.addEventListener("hidden.bs.modal", configurarModalInsercaoModulo);

        configurarModalInsercaoModulo();
        renderizarModulosCurso();
    }
}

const formAula = document.getElementById("form-aula");
const nomeModulo = document.getElementById("nome-modulo");
const nomeCurso = document.getElementById("nome-curso");
const tituloAulaInput = document.getElementById("titulo-aula");
const tipoConteudoSelect = document.getElementById("tipo-conteudo");
const urlConteudoInput = document.getElementById("url-conteudo");
const duracaoMinutosInput = document.getElementById("duracao-minutos");
const ordemAulaInput = document.getElementById("ordem-aula");
const tabelaAulasBody = document.getElementById("tabela-aulas");
const botaoInserirAula = document.getElementById("btn-inserir-aula");
const modalAulaElement = document.getElementById("modal-aula");
const tituloModalAula = document.getElementById("titulo-modal-aula");
const botaoSalvarAula = document.getElementById("btn-salvar-aula");

if (
    formAula &&
    nomeModulo &&
    nomeCurso &&
    tituloAulaInput &&
    tipoConteudoSelect &&
    urlConteudoInput &&
    duracaoMinutosInput &&
    ordemAulaInput &&
    tabelaAulasBody &&
    botaoInserirAula &&
    modalAulaElement &&
    tituloModalAula &&
    botaoSalvarAula
) {
    const modalAula = window.bootstrap ? new window.bootstrap.Modal(modalAulaElement) : null;
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idModuloAtual = Number(parametrosUrl.get("idModulo"));

    function configurarModalInsercaoAula() {
        formAula.reset();
        tituloModalAula.textContent = "Nova Aula";
        botaoSalvarAula.textContent = "Salvar";
    }

    function abrirModalInsercaoAula() {
        configurarModalInsercaoAula();
        tituloAulaInput.focus();
    }

    function mostrarErroModulo(mensagem) {
        nomeModulo.className = "fw-semibold text-danger mb-1";
        nomeModulo.textContent = mensagem;
        nomeCurso.textContent = "-";
        tabelaAulasBody.innerHTML = "";

        const linhaErro = document.createElement("tr");
        const colunaErro = document.createElement("td");
        colunaErro.colSpan = 4;
        colunaErro.className = "text-center text-danger";
        colunaErro.textContent = mensagem;
        linhaErro.appendChild(colunaErro);
        tabelaAulasBody.appendChild(linhaErro);

        tituloAulaInput.disabled = true;
        tipoConteudoSelect.disabled = true;
        urlConteudoInput.disabled = true;
        duracaoMinutosInput.disabled = true;
        ordemAulaInput.disabled = true;

        const botaoCadastrar = formAula.querySelector("button[type='submit']");
        if (botaoCadastrar) {
            botaoCadastrar.disabled = true;
        }
        botaoInserirAula.disabled = true;
    }

    const moduloAtual = listarModulos().find((modulo) => Number(modulo.id) === idModuloAtual);

    if (!idModuloAtual || !moduloAtual) {
        mostrarErroModulo("Modulo nao encontrado.");
    } else {
        nomeModulo.textContent = moduloAtual.titulo;

        const cursoRelacionado = listarCursos().find((curso) => {
            return Number(curso.id) === Number(moduloAtual.idCurso);
        });
        nomeCurso.textContent = cursoRelacionado ? cursoRelacionado.titulo : "Curso nao encontrado.";

        function atualizarTotalAulasDoCursoAtual() {
            const idCursoRelacionado = Number(moduloAtual.idCurso);
            if (!idCursoRelacionado) {
                return;
            }

            const modulosDoCurso = listarModulos().filter((modulo) => {
                return Number(modulo.idCurso) === idCursoRelacionado;
            });

            const aulas = listarAulas();
            let totalAulas = 0;
            let totalMinutos = 0;

            modulosDoCurso.forEach((modulo) => {
                aulas.forEach((aula) => {
                    if (Number(aula.idModulo) === Number(modulo.id)) {
                        totalAulas += 1;
                        totalMinutos += Number(aula.duracaoMinutos) || 0;
                    }
                });
            });

            const totalHoras = Number((totalMinutos / 60).toFixed(1));
            atualizarTotaisCurso(idCursoRelacionado, totalAulas, totalHoras);
        }

        function renderizarAulasModulo() {
            const aulasModulo = listarAulas().filter((aula) => Number(aula.idModulo) === idModuloAtual);
            tabelaAulasBody.innerHTML = "";

            if (aulasModulo.length === 0) {
                const linhaVazia = document.createElement("tr");
                const colunaVazia = document.createElement("td");
                colunaVazia.colSpan = 5;
                colunaVazia.className = "text-center text-muted";
                colunaVazia.textContent = "Nenhuma aula cadastrada para este modulo.";
                linhaVazia.appendChild(colunaVazia);
                tabelaAulasBody.appendChild(linhaVazia);
                return;
            }

            aulasModulo.forEach((aula) => {
                const linha = document.createElement("tr");

                const colunaTitulo = document.createElement("td");
                colunaTitulo.textContent = aula.titulo;

                const colunaTipo = document.createElement("td");
                colunaTipo.textContent = aula.tipoConteudo;

                const colunaDuracao = document.createElement("td");
                colunaDuracao.textContent = `${aula.duracaoMinutos} min`;

                const colunaOrdem = document.createElement("td");
                colunaOrdem.textContent = aula.ordem;

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

                if (aula.urlConteudo) {
                    const itemAbrir = document.createElement("li");
                    const linkAbrir = document.createElement("a");
                    linkAbrir.className = "dropdown-item";
                    linkAbrir.href = aula.urlConteudo;
                    linkAbrir.target = "_blank";
                    linkAbrir.rel = "noopener noreferrer";
                    linkAbrir.textContent = "Abrir conteudo";
                    itemAbrir.appendChild(linkAbrir);
                    menu.appendChild(itemAbrir);
                }

                const itemExcluir = document.createElement("li");
                const botaoExcluir = document.createElement("button");
                botaoExcluir.type = "button";
                botaoExcluir.className = "dropdown-item text-danger";
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.addEventListener("click", () => {
                    const confirmar = window.confirm("Deseja excluir esta aula?");
                    if (!confirmar) {
                        return;
                    }

                    excluirAula(aula.id);
                    atualizarTotalAulasDoCursoAtual();
                    renderizarAulasModulo();
                });
                itemExcluir.appendChild(botaoExcluir);
                menu.appendChild(itemExcluir);

                dropdown.appendChild(botaoAcoes);
                dropdown.appendChild(menu);
                colunaAcoes.appendChild(dropdown);

                linha.appendChild(colunaTitulo);
                linha.appendChild(colunaTipo);
                linha.appendChild(colunaDuracao);
                linha.appendChild(colunaOrdem);
                linha.appendChild(colunaAcoes);
                tabelaAulasBody.appendChild(linha);
            });
        }

        formAula.addEventListener("submit", (event) => {
            event.preventDefault();

            const titulo = tituloAulaInput.value.trim();
            const tipoConteudo = tipoConteudoSelect.value;
            const urlConteudo = urlConteudoInput.value.trim();
            const duracaoMinutos = Number(duracaoMinutosInput.value);
            const ordem = Number(ordemAulaInput.value);

            if (titulo === "") {
                alert("Informe o titulo da aula.");
                tituloAulaInput.focus();
                return;
            }

            if (tipoConteudo === "") {
                alert("Selecione o tipo de conteudo.");
                tipoConteudoSelect.focus();
                return;
            }

            if (!duracaoMinutos) {
                alert("Informe a duracao em minutos.");
                duracaoMinutosInput.focus();
                return;
            }

            if (!ordem) {
                alert("Informe a ordem da aula.");
                ordemAulaInput.focus();
                return;
            }

            const ordemJaExiste = listarAulas().some((aula) => {
                return Number(aula.idModulo) === idModuloAtual && Number(aula.ordem) === ordem;
            });

            if (ordemJaExiste) {
                alert("Ja existe uma aula com essa ordem neste modulo.");
                ordemAulaInput.focus();
                return;
            }

            cadastrarAula(idModuloAtual, titulo, tipoConteudo, urlConteudo, duracaoMinutos, ordem);`r`n            window.showAppAlert("Aula cadastrada com sucesso.", "success");
            atualizarTotalAulasDoCursoAtual();
            renderizarAulasModulo();
            configurarModalInsercaoAula();
            if (modalAula) {
                modalAula.hide();
            }
        });

        botaoInserirAula.addEventListener("click", abrirModalInsercaoAula);
        modalAulaElement.addEventListener("hidden.bs.modal", configurarModalInsercaoAula);

        configurarModalInsercaoAula();
        renderizarAulasModulo();
    }
}




