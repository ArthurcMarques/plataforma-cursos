import { cadastrarAula, excluirAula, listarAulas } from "./models/Aula.js";
import { cadastrarAvaliacao, excluirAvaliacao, listarAvaliacoes } from "./models/Avaliacao.js";
import { cadastrarAssinatura, excluirAssinatura, listarAssinaturas } from "./models/Assinatura.js";
import { atualizarCategoria, cadastrarCategoria, excluirCategoria, listarCategorias } from "./models/Categoria.js";
import { cadastrarCertificado, excluirCertificado, listarCertificados } from "./models/Certificado.js";
import { atualizarCurso, atualizarTotaisCurso, cadastrarCurso, excluirCurso, listarCursos } from "./models/Curso.js";
import { cadastrarMatricula, excluirMatricula, listarMatriculas } from "./models/Matricula.js";
import { cadastrarModulo, listarModulos } from "./models/Modulo.js";
import { cadastrarPagamento, excluirPagamento, listarPagamentos } from "./models/Pagamento.js";
import { cadastrarPlano, excluirPlano, listarPlanos } from "./models/Plano.js";
import { cadastrarProgressoAula, excluirProgressoAula, listarProgressoAulas } from "./models/ProgressoAula.js";
import { cadastrarTrilha, listarTrilhas } from "./models/Trilha.js";
import { cadastrarTrilhaCurso, excluirTrilhaCurso, listarTrilhasCursos } from "./models/TrilhaCurso.js";
import { atualizarUsuario, cadastrarUsuario, excluirUsuario, listarUsuarios } from "./models/Usuario.js";

const formCategoria = document.getElementById("form-categoria");
const nomeCategoriaInput = document.getElementById("nome-categoria");
const descricaoCategoriaInput = document.getElementById("descricao-categoria");
const tabelaCategoriasBody = document.getElementById("tabela-categorias");
const botaoInserirCategoria = document.getElementById("btn-inserir-categoria");
const modalCategoriaElement = document.getElementById("modal-categoria");
const tituloModalCategoria = document.getElementById("titulo-modal-categoria");
const botaoSalvarCategoria = document.getElementById("btn-salvar-categoria");

if (
    formCategoria &&
    nomeCategoriaInput &&
    descricaoCategoriaInput &&
    tabelaCategoriasBody &&
    botaoInserirCategoria &&
    modalCategoriaElement &&
    tituloModalCategoria &&
    botaoSalvarCategoria
) {
    let idCategoriaEmEdicao = null;
    const modalCategoria = window.bootstrap ? new window.bootstrap.Modal(modalCategoriaElement) : null;

    function configurarModalInsercao() {
        idCategoriaEmEdicao = null;
        tituloModalCategoria.textContent = "Nova Categoria";
        botaoSalvarCategoria.textContent = "Salvar";
        formCategoria.reset();
    }

    function abrirModalInsercao() {
        configurarModalInsercao();
        nomeCategoriaInput.focus();
    }

    function renderizarCategorias() {
        const categorias = listarCategorias();
        tabelaCategoriasBody.innerHTML = "";

        if (categorias.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 3;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma categoria cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaCategoriasBody.appendChild(linhaVazia);
            return;
        }

        categorias.forEach((categoria) => {
            const linha = document.createElement("tr");

            const colunaNome = document.createElement("td");
            colunaNome.textContent = categoria.nome;

            const colunaDescricao = document.createElement("td");
            colunaDescricao.textContent = categoria.descricao || "-";

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropup";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "A\u00e7\u00f5es";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemEditar = document.createElement("li");
            const botaoEditar = document.createElement("button");
            botaoEditar.type = "button";
            botaoEditar.className = "dropdown-item";
            botaoEditar.textContent = "Editar";
            botaoEditar.addEventListener("click", () => {
                idCategoriaEmEdicao = categoria.id;
                nomeCategoriaInput.value = categoria.nome;
                descricaoCategoriaInput.value = categoria.descricao || "";
                tituloModalCategoria.textContent = "Editar Categoria";
                botaoSalvarCategoria.textContent = "Salvar alteracoes";
                if (modalCategoria) {
                    modalCategoria.show();
                }
            });

            itemEditar.appendChild(botaoEditar);

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir esta categoria?");
                if (!confirmar) {
                    return;
                }

                excluirCategoria(categoria.id);
                renderizarCategorias();
            });

            itemExcluir.appendChild(botaoExcluir);
            menu.appendChild(itemEditar);
            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaNome);
            linha.appendChild(colunaDescricao);
            linha.appendChild(colunaAcoes);
            tabelaCategoriasBody.appendChild(linha);
        });
    }

    formCategoria.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = nomeCategoriaInput.value.trim();
        const descricao = descricaoCategoriaInput.value.trim();

        if (nome === "") {
            alert("Informe o nome da categoria.");
            nomeCategoriaInput.focus();
            return;
        }

        const nomeJaExiste = listarCategorias().some((categoria) => {
            return categoria.nome.toLowerCase() === nome.toLowerCase() && Number(categoria.id) !== Number(idCategoriaEmEdicao);
        });

        if (nomeJaExiste) {
            alert("Ja existe uma categoria com esse nome.");
            nomeCategoriaInput.focus();
            return;
        }

        if (idCategoriaEmEdicao === null) {
            cadastrarCategoria(nome, descricao);
        } else {
            atualizarCategoria(idCategoriaEmEdicao, nome, descricao);
        }

        renderizarCategorias();
        configurarModalInsercao();
        if (modalCategoria) {
            modalCategoria.hide();
        }
    });

    botaoInserirCategoria.addEventListener("click", abrirModalInsercao);
    modalCategoriaElement.addEventListener("hidden.bs.modal", configurarModalInsercao);

    renderizarCategorias();
}

const formUsuario = document.getElementById("form-usuario");
const nomeUsuarioInput = document.getElementById("nome-usuario");
const emailUsuarioInput = document.getElementById("email-usuario");
const senhaUsuarioInput = document.getElementById("senha-usuario");
const dataCadastroUsuarioInput = document.getElementById("data-cadastro-usuario");
const tabelaUsuariosBody = document.getElementById("tabela-usuarios");
const botaoInserirUsuario = document.getElementById("btn-inserir-usuario");
const modalUsuarioElement = document.getElementById("modal-usuario");
const tituloModalUsuario = document.getElementById("titulo-modal-usuario");
const botaoSalvarUsuario = document.getElementById("btn-salvar-usuario");

if (
    formUsuario &&
    nomeUsuarioInput &&
    emailUsuarioInput &&
    senhaUsuarioInput &&
    dataCadastroUsuarioInput &&
    tabelaUsuariosBody &&
    botaoInserirUsuario &&
    modalUsuarioElement &&
    tituloModalUsuario &&
    botaoSalvarUsuario
) {
    let idUsuarioEmEdicao = null;
    const modalUsuario = window.bootstrap ? new window.bootstrap.Modal(modalUsuarioElement) : null;

    function emailValido(email) {
        return /^\S+@\S+\.\S+$/.test(email);
    }

    function dataAtualFormatoInput() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function definirDataAtualPadrao() {
        dataCadastroUsuarioInput.value = dataAtualFormatoInput();
    }

    function configurarModalInsercaoUsuario() {
        idUsuarioEmEdicao = null;
        formUsuario.reset();
        definirDataAtualPadrao();
        tituloModalUsuario.textContent = "Novo Usuario";
        botaoSalvarUsuario.textContent = "Salvar";
    }

    function abrirModalInsercaoUsuario() {
        configurarModalInsercaoUsuario();
        nomeUsuarioInput.focus();
    }

    function resetarFormularioUsuario() {
        configurarModalInsercaoUsuario();
    }

    function prepararEdicaoUsuario(usuario) {
        idUsuarioEmEdicao = usuario.id;
        nomeUsuarioInput.value = usuario.nomeCompleto;
        emailUsuarioInput.value = usuario.email;
        senhaUsuarioInput.value = usuario.senha;
        dataCadastroUsuarioInput.value = usuario.dataCadastro;
        tituloModalUsuario.textContent = "Editar Usuario";
        botaoSalvarUsuario.textContent = "Salvar alteracoes";
        if (modalUsuario) {
            modalUsuario.show();
        }
        nomeUsuarioInput.focus();
    }

    function renderizarUsuarios() {
        const usuarios = listarUsuarios();
        tabelaUsuariosBody.innerHTML = "";

        if (usuarios.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 5;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum usuario cadastrado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaUsuariosBody.appendChild(linhaVazia);
            return;
        }

        usuarios.forEach((usuario) => {
            const linha = document.createElement("tr");

            const colunaId = document.createElement("td");
            colunaId.textContent = usuario.id;

            const colunaNome = document.createElement("td");
            colunaNome.textContent = usuario.nomeCompleto;

            const colunaEmail = document.createElement("td");
            colunaEmail.textContent = usuario.email;

            const colunaData = document.createElement("td");
            colunaData.textContent = usuario.dataCadastro;

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropdown";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "A\u00e7\u00f5es";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemEditar = document.createElement("li");
            const botaoEditar = document.createElement("button");
            botaoEditar.type = "button";
            botaoEditar.className = "dropdown-item";
            botaoEditar.textContent = "Editar";
            botaoEditar.addEventListener("click", () => {
                prepararEdicaoUsuario(usuario);
            });
            itemEditar.appendChild(botaoEditar);

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir este usuario?");
                if (!confirmar) {
                    return;
                }

                excluirUsuario(usuario.id);
                if (Number(idUsuarioEmEdicao) === Number(usuario.id)) {
                    resetarFormularioUsuario();
                }
                renderizarUsuarios();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemEditar);
            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaId);
            linha.appendChild(colunaNome);
            linha.appendChild(colunaEmail);
            linha.appendChild(colunaData);
            linha.appendChild(colunaAcoes);
            tabelaUsuariosBody.appendChild(linha);
        });
    }

    formUsuario.addEventListener("submit", (event) => {
        event.preventDefault();

        const nomeCompleto = nomeUsuarioInput.value.trim();
        const email = emailUsuarioInput.value.trim().toLowerCase();
        const senha = senhaUsuarioInput.value.trim();
        const dataCadastro = dataCadastroUsuarioInput.value;

        if (nomeCompleto === "") {
            alert("Informe o nome completo.");
            nomeUsuarioInput.focus();
            return;
        }

        if (email === "") {
            alert("Informe o e-mail.");
            emailUsuarioInput.focus();
            return;
        }

        if (!emailValido(email)) {
            alert("Informe um e-mail valido.");
            emailUsuarioInput.focus();
            return;
        }

        if (senha === "") {
            alert("Informe a senha.");
            senhaUsuarioInput.focus();
            return;
        }

        if (dataCadastro === "") {
            alert("Informe a data de cadastro.");
            dataCadastroUsuarioInput.focus();
            return;
        }

        const emailJaExiste = listarUsuarios().some((usuario) => {
            return usuario.email === email && Number(usuario.id) !== Number(idUsuarioEmEdicao);
        });

        if (emailJaExiste) {
            alert("Ja existe um usuario com esse e-mail.");
            emailUsuarioInput.focus();
            return;
        }

        if (idUsuarioEmEdicao === null) {
            cadastrarUsuario(nomeCompleto, email, senha, dataCadastro);
        } else {
            atualizarUsuario(idUsuarioEmEdicao, nomeCompleto, email, senha, dataCadastro);
        }

        renderizarUsuarios();
        resetarFormularioUsuario();
        if (modalUsuario) {
            modalUsuario.hide();
        }
    });

    botaoInserirUsuario.addEventListener("click", abrirModalInsercaoUsuario);
    modalUsuarioElement.addEventListener("hidden.bs.modal", configurarModalInsercaoUsuario);

    resetarFormularioUsuario();
    renderizarUsuarios();
}

const formCurso = document.getElementById("form-curso");
const tituloCursoInput = document.getElementById("titulo-curso");
const descricaoCursoInput = document.getElementById("descricao-curso");
const nivelCursoSelect = document.getElementById("nivel-curso");
const categoriaCursoSelect = document.getElementById("categoria-curso");
const instrutorCursoSelect = document.getElementById("instrutor-curso");
const dataPublicacaoCursoInput = document.getElementById("data-publicacao-curso");
const tabelaCursosBody = document.getElementById("tabela-cursos");
const filtroCategoriaCursosSelect = document.getElementById("filtro-categoria-cursos");
const botaoInserirCurso = document.getElementById("btn-inserir-curso");
const modalCursoElement = document.getElementById("modal-curso");
const tituloModalCurso = document.getElementById("titulo-modal-curso");
const botaoSalvarCurso = document.getElementById("btn-salvar-curso");

if (
    formCurso &&
    tituloCursoInput &&
    descricaoCursoInput &&
    nivelCursoSelect &&
    categoriaCursoSelect &&
    instrutorCursoSelect &&
    dataPublicacaoCursoInput &&
    tabelaCursosBody &&
    filtroCategoriaCursosSelect &&
    botaoInserirCurso &&
    modalCursoElement &&
    tituloModalCurso &&
    botaoSalvarCurso
) {
    let idCursoEmEdicao = null;
    const modalCurso = window.bootstrap ? new window.bootstrap.Modal(modalCursoElement) : null;

    function dataAtualFormatoInputCurso() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function definirDataPublicacaoPadrao() {
        dataPublicacaoCursoInput.value = dataAtualFormatoInputCurso();
    }

    function configurarModalInsercaoCurso() {
        idCursoEmEdicao = null;
        formCurso.reset();
        definirDataPublicacaoPadrao();
        tituloModalCurso.textContent = "Novo Curso";
        botaoSalvarCurso.textContent = "Salvar";
    }

    function abrirModalInsercaoCurso() {
        preencherSelectCategorias();
        preencherSelectInstrutores();
        configurarModalInsercaoCurso();
        tituloCursoInput.focus();
    }

    function resetarFormularioCurso() {
        configurarModalInsercaoCurso();
    }

    function prepararEdicaoCurso(curso) {
        preencherSelectCategorias();
        preencherSelectInstrutores();
        idCursoEmEdicao = curso.id;
        tituloCursoInput.value = curso.titulo;
        descricaoCursoInput.value = curso.descricao;
        nivelCursoSelect.value = curso.nivel;
        categoriaCursoSelect.value = String(curso.idCategoria);
        instrutorCursoSelect.value = String(curso.idInstrutor);
        dataPublicacaoCursoInput.value = curso.dataPublicacao;
        tituloModalCurso.textContent = "Editar Curso";
        botaoSalvarCurso.textContent = "Salvar alteracoes";
        if (modalCurso) {
            modalCurso.show();
        }
        tituloCursoInput.focus();
    }

    function preencherSelectCategorias() {
        categoriaCursoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione uma categoria";
        categoriaCursoSelect.appendChild(opcaoPadrao);

        const categorias = listarCategorias();
        categorias.forEach((categoria) => {
            const opcao = document.createElement("option");
            opcao.value = categoria.id;
            opcao.textContent = categoria.nome;
            categoriaCursoSelect.appendChild(opcao);
        });
    }

    function preencherSelectFiltroCategorias() {
        filtroCategoriaCursosSelect.innerHTML = "";

        const opcaoTodas = document.createElement("option");
        opcaoTodas.value = "";
        opcaoTodas.textContent = "Todas as categorias";
        filtroCategoriaCursosSelect.appendChild(opcaoTodas);

        const categorias = listarCategorias();
        categorias.forEach((categoria) => {
            const opcao = document.createElement("option");
            opcao.value = categoria.id;
            opcao.textContent = categoria.nome;
            filtroCategoriaCursosSelect.appendChild(opcao);
        });
    }

    function preencherSelectInstrutores() {
        instrutorCursoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um instrutor";
        instrutorCursoSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            instrutorCursoSelect.appendChild(opcao);
        });
    }

    function buscarNomeCategoria(idCategoria) {
        const categoria = listarCategorias().find((item) => item.id === idCategoria);
        return categoria ? categoria.nome : "-";
    }

    function buscarNomeInstrutor(idInstrutor) {
        const instrutor = listarUsuarios().find((item) => item.id === idInstrutor);
        return instrutor ? instrutor.nomeCompleto : "-";
    }

    function calcularResumoCurso(idCurso) {
        const modulos = listarModulos();
        const aulas = listarAulas();
        let totalAulas = 0;
        let totalMinutos = 0;

        modulos.forEach((modulo) => {
            if (Number(modulo.idCurso) !== Number(idCurso)) {
                return;
            }

            aulas.forEach((aula) => {
                if (Number(aula.idModulo) === Number(modulo.id)) {
                    totalAulas += 1;
                    totalMinutos += Number(aula.duracaoMinutos) || 0;
                }
            });
        });

        const totalHoras = Number((totalMinutos / 60).toFixed(1));
        return { totalAulas, totalHoras };
    }

    function renderizarCursos() {
        const idCategoriaFiltro = Number(filtroCategoriaCursosSelect.value);
        const cursos = listarCursos().filter((curso) => {
            if (!idCategoriaFiltro) {
                return true;
            }

            return Number(curso.idCategoria) === idCategoriaFiltro;
        });
        tabelaCursosBody.innerHTML = "";

        if (cursos.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 7;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum curso cadastrado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaCursosBody.appendChild(linhaVazia);
            return;
        }

        cursos.forEach((curso) => {
            const linha = document.createElement("tr");

            const colunaTitulo = document.createElement("td");
            colunaTitulo.textContent = curso.titulo;

            const colunaCategoria = document.createElement("td");
            colunaCategoria.textContent = buscarNomeCategoria(curso.idCategoria);

            const colunaInstrutor = document.createElement("td");
            colunaInstrutor.textContent = buscarNomeInstrutor(curso.idInstrutor);

            const colunaNivel = document.createElement("td");
            colunaNivel.textContent = curso.nivel;

            const resumoCurso = calcularResumoCurso(curso.id);
            const totalAulasCalculado = resumoCurso.totalAulas;
            const totalHorasCalculado = resumoCurso.totalHoras;

            if (
                (Number(curso.totalAulas) || 0) !== totalAulasCalculado ||
                (Number(curso.totalHoras) || 0) !== totalHorasCalculado
            ) {
                atualizarTotaisCurso(curso.id, totalAulasCalculado, totalHorasCalculado);
            }

            const colunaTotalAulas = document.createElement("td");
            colunaTotalAulas.textContent = totalAulasCalculado;

            const colunaTotalHoras = document.createElement("td");
            colunaTotalHoras.textContent = `${totalHorasCalculado} h`;

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropdown";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "A\u00e7\u00f5es";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemEditar = document.createElement("li");
            const botaoEditar = document.createElement("button");
            botaoEditar.type = "button";
            botaoEditar.className = "dropdown-item";
            botaoEditar.textContent = "Editar";
            botaoEditar.addEventListener("click", () => {
                prepararEdicaoCurso(curso);
            });
            itemEditar.appendChild(botaoEditar);

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir este curso?");
                if (!confirmar) {
                    return;
                }

                excluirCurso(curso.id);
                if (Number(idCursoEmEdicao) === Number(curso.id)) {
                    resetarFormularioCurso();
                }
                renderizarCursos();
            });
            itemExcluir.appendChild(botaoExcluir);

            const itemGerenciar = document.createElement("li");
            const linkModulos = document.createElement("a");
            linkModulos.className = "dropdown-item";
            linkModulos.href = `./modulos.html?idCurso=${curso.id}`;
            linkModulos.textContent = "Gerenciar m\u00f3dulos";
            itemGerenciar.appendChild(linkModulos);

            menu.appendChild(itemEditar);
            menu.appendChild(itemExcluir);
            menu.appendChild(itemGerenciar);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaTitulo);
            linha.appendChild(colunaCategoria);
            linha.appendChild(colunaInstrutor);
            linha.appendChild(colunaNivel);
            linha.appendChild(colunaTotalAulas);
            linha.appendChild(colunaTotalHoras);
            linha.appendChild(colunaAcoes);
            tabelaCursosBody.appendChild(linha);
        });
    }

    formCurso.addEventListener("submit", (event) => {
        event.preventDefault();

        const titulo = tituloCursoInput.value.trim();
        const descricao = descricaoCursoInput.value.trim();
        const nivel = nivelCursoSelect.value;
        const idCategoria = Number(categoriaCursoSelect.value);
        const idInstrutor = Number(instrutorCursoSelect.value);
        const dataPublicacao = dataPublicacaoCursoInput.value;

        if (titulo === "") {
            alert("Informe o titulo do curso.");
            tituloCursoInput.focus();
            return;
        }

        if (descricao === "") {
            alert("Informe a descricao do curso.");
            descricaoCursoInput.focus();
            return;
        }

        if (nivel === "") {
            alert("Selecione o nivel do curso.");
            nivelCursoSelect.focus();
            return;
        }

        if (!idCategoria) {
            alert("Selecione a categoria do curso.");
            categoriaCursoSelect.focus();
            return;
        }

        if (!idInstrutor) {
            alert("Selecione o instrutor do curso.");
            instrutorCursoSelect.focus();
            return;
        }

        if (dataPublicacao === "") {
            alert("Informe a data de publicacao.");
            dataPublicacaoCursoInput.focus();
            return;
        }

        if (idCursoEmEdicao === null) {
            cadastrarCurso(titulo, descricao, nivel, idCategoria, idInstrutor, dataPublicacao);
        } else {
            atualizarCurso(idCursoEmEdicao, titulo, descricao, nivel, idCategoria, idInstrutor, dataPublicacao);
        }

        renderizarCursos();
        resetarFormularioCurso();
        if (modalCurso) {
            modalCurso.hide();
        }
    });

    botaoInserirCurso.addEventListener("click", abrirModalInsercaoCurso);
    modalCursoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoCurso);
    filtroCategoriaCursosSelect.addEventListener("change", renderizarCursos);

    resetarFormularioCurso();
    preencherSelectCategorias();
    preencherSelectFiltroCategorias();
    preencherSelectInstrutores();
    renderizarCursos();
}
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
                dropdown.className = "dropdown";

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

            cadastrarModulo(idCursoAtual, titulo, ordem);
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
                dropdown.className = "dropdown";

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

            cadastrarAula(idModuloAtual, titulo, tipoConteudo, urlConteudo, duracaoMinutos, ordem);
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

const formMatricula = document.getElementById("form-matricula");
const usuarioMatriculaSelect = document.getElementById("usuario-matricula");
const cursoMatriculaSelect = document.getElementById("curso-matricula");
const tabelaMatriculasBody = document.getElementById("tabela-matriculas");
const botaoInserirMatricula = document.getElementById("btn-inserir-matricula");
const modalMatriculaElement = document.getElementById("modal-matricula");
const tituloModalMatricula = document.getElementById("titulo-modal-matricula");
const botaoSalvarMatricula = document.getElementById("btn-salvar-matricula");

if (
    formMatricula &&
    usuarioMatriculaSelect &&
    cursoMatriculaSelect &&
    tabelaMatriculasBody &&
    botaoInserirMatricula &&
    modalMatriculaElement &&
    tituloModalMatricula &&
    botaoSalvarMatricula
) {
    const modalMatricula = window.bootstrap ? new window.bootstrap.Modal(modalMatriculaElement) : null;

    function configurarModalInsercaoMatricula() {
        formMatricula.reset();
        tituloModalMatricula.textContent = "Nova Matricula";
        botaoSalvarMatricula.textContent = "Salvar";
    }

    function abrirModalInsercaoMatricula() {
        preencherSelectUsuariosMatricula();
        preencherSelectCursosMatricula();
        configurarModalInsercaoMatricula();
        usuarioMatriculaSelect.focus();
    }

    function dataAtualMatricula() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function preencherSelectUsuariosMatricula() {
        usuarioMatriculaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuÃ¡rio";
        usuarioMatriculaSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioMatriculaSelect.appendChild(opcao);
        });
    }

    function preencherSelectCursosMatricula() {
        cursoMatriculaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um curso";
        cursoMatriculaSelect.appendChild(opcaoPadrao);

        const cursos = listarCursos();
        cursos.forEach((curso) => {
            const opcao = document.createElement("option");
            opcao.value = curso.id;
            opcao.textContent = curso.titulo;
            cursoMatriculaSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuario(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarTituloCurso(idCurso) {
        const curso = listarCursos().find((item) => Number(item.id) === Number(idCurso));
        return curso ? curso.titulo : "-";
    }

    function renderizarMatriculas() {
        const matriculas = listarMatriculas();
        tabelaMatriculasBody.innerHTML = "";

        if (matriculas.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 4;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma matrÃ­cula cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaMatriculasBody.appendChild(linhaVazia);
            return;
        }

        matriculas.forEach((matricula) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuario(matricula.idUsuario);

            const colunaCurso = document.createElement("td");
            colunaCurso.textContent = buscarTituloCurso(matricula.idCurso);

            const colunaData = document.createElement("td");
            colunaData.textContent = matricula.dataMatricula;

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropdown";

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
                const confirmar = window.confirm("Deseja excluir esta matricula?");
                if (!confirmar) {
                    return;
                }

                excluirMatricula(matricula.id);
                renderizarMatriculas();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaCurso);
            linha.appendChild(colunaData);
            linha.appendChild(colunaAcoes);
            tabelaMatriculasBody.appendChild(linha);
        });
    }

    formMatricula.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioMatriculaSelect.value);
        const idCurso = Number(cursoMatriculaSelect.value);

        if (!idUsuario) {
            alert("Selecione o usuÃ¡rio.");
            usuarioMatriculaSelect.focus();
            return;
        }

        if (!idCurso) {
            alert("Selecione o curso.");
            cursoMatriculaSelect.focus();
            return;
        }

        const matriculaDuplicada = listarMatriculas().some((matricula) => {
            return Number(matricula.idUsuario) === idUsuario && Number(matricula.idCurso) === idCurso;
        });

        if (matriculaDuplicada) {
            alert("Esse usuÃ¡rio jÃ¡ estÃ¡ matriculado nesse curso.");
            usuarioMatriculaSelect.focus();
            return;
        }

        cadastrarMatricula(idUsuario, idCurso, dataAtualMatricula());
        renderizarMatriculas();
        configurarModalInsercaoMatricula();
        if (modalMatricula) {
            modalMatricula.hide();
        }
    });

    botaoInserirMatricula.addEventListener("click", abrirModalInsercaoMatricula);
    modalMatriculaElement.addEventListener("hidden.bs.modal", configurarModalInsercaoMatricula);

    configurarModalInsercaoMatricula();
    preencherSelectUsuariosMatricula();
    preencherSelectCursosMatricula();
    renderizarMatriculas();
}

const formProgresso = document.getElementById("form-progresso");
const usuarioProgressoSelect = document.getElementById("usuario-progresso");
const aulaProgressoSelect = document.getElementById("aula-progresso");
const statusProgressoSelect = document.getElementById("status-progresso");
const dataConclusaoInput = document.getElementById("data-conclusao");
const tabelaProgressoBody = document.getElementById("tabela-progresso");
const botaoInserirProgresso = document.getElementById("btn-inserir-progresso");
const modalProgressoElement = document.getElementById("modal-progresso");
const tituloModalProgresso = document.getElementById("titulo-modal-progresso");
const botaoSalvarProgresso = document.getElementById("btn-salvar-progresso");

if (
    formProgresso &&
    usuarioProgressoSelect &&
    aulaProgressoSelect &&
    statusProgressoSelect &&
    dataConclusaoInput &&
    tabelaProgressoBody &&
    botaoInserirProgresso &&
    modalProgressoElement &&
    tituloModalProgresso &&
    botaoSalvarProgresso
) {
    const modalProgresso = window.bootstrap ? new window.bootstrap.Modal(modalProgressoElement) : null;

    function configurarModalInsercaoProgresso() {
        formProgresso.reset();
        tituloModalProgresso.textContent = "Registrar Progresso";
        botaoSalvarProgresso.textContent = "Salvar";
    }

    function abrirModalInsercaoProgresso() {
        preencherSelectUsuariosProgresso();
        preencherSelectAulasProgresso();
        configurarModalInsercaoProgresso();
        usuarioProgressoSelect.focus();
    }

    function preencherSelectUsuariosProgresso() {
        usuarioProgressoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuario";
        usuarioProgressoSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioProgressoSelect.appendChild(opcao);
        });
    }

    function preencherSelectAulasProgresso() {
        aulaProgressoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione uma aula";
        aulaProgressoSelect.appendChild(opcaoPadrao);

        const aulas = listarAulas();
        aulas.forEach((aula) => {
            const opcao = document.createElement("option");
            opcao.value = aula.id;
            opcao.textContent = aula.titulo;
            aulaProgressoSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuarioProgresso(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarTituloAulaProgresso(idAula) {
        const aula = listarAulas().find((item) => Number(item.id) === Number(idAula));
        return aula ? aula.titulo : "-";
    }

    function renderizarProgressoAulas() {
        const progressos = listarProgressoAulas();
        tabelaProgressoBody.innerHTML = "";

        if (progressos.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 5;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum progresso registrado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaProgressoBody.appendChild(linhaVazia);
            return;
        }

        progressos.forEach((progresso) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuarioProgresso(progresso.idUsuario);

            const colunaAula = document.createElement("td");
            colunaAula.textContent = buscarTituloAulaProgresso(progresso.idAula);

            const colunaStatus = document.createElement("td");
            colunaStatus.textContent = progresso.status;

            const colunaData = document.createElement("td");
            colunaData.textContent = progresso.dataConclusao;

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";

            const dropdown = document.createElement("div");
            dropdown.className = "dropdown";

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
                const confirmar = window.confirm("Deseja excluir este progresso?");
                if (!confirmar) {
                    return;
                }

                excluirProgressoAula(progresso.idUsuario, progresso.idAula);
                renderizarProgressoAulas();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaAula);
            linha.appendChild(colunaStatus);
            linha.appendChild(colunaData);
            linha.appendChild(colunaAcoes);
            tabelaProgressoBody.appendChild(linha);
        });
    }

    formProgresso.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioProgressoSelect.value);
        const idAula = Number(aulaProgressoSelect.value);
        const status = statusProgressoSelect.value;
        const dataConclusao = dataConclusaoInput.value;

        if (!idUsuario) {
            alert("Selecione um usuario.");
            usuarioProgressoSelect.focus();
            return;
        }

        if (!idAula) {
            alert("Selecione uma aula.");
            aulaProgressoSelect.focus();
            return;
        }

        if (status === "") {
            alert("Selecione o status.");
            statusProgressoSelect.focus();
            return;
        }

        if (dataConclusao === "") {
            alert("Informe a data.");
            dataConclusaoInput.focus();
            return;
        }

        const progressoDuplicado = listarProgressoAulas().some((progresso) => {
            return Number(progresso.idUsuario) === idUsuario && Number(progresso.idAula) === idAula;
        });

        if (progressoDuplicado) {
            alert("Esse usuario ja registrou progresso nessa aula.");
            usuarioProgressoSelect.focus();
            return;
        }

        cadastrarProgressoAula(idUsuario, idAula, status, dataConclusao);
        renderizarProgressoAulas();
        configurarModalInsercaoProgresso();
        if (modalProgresso) {
            modalProgresso.hide();
        }
    });

    botaoInserirProgresso.addEventListener("click", abrirModalInsercaoProgresso);
    modalProgressoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoProgresso);

    configurarModalInsercaoProgresso();
    preencherSelectUsuariosProgresso();
    preencherSelectAulasProgresso();
    renderizarProgressoAulas();
}

const formAvaliacao = document.getElementById("form-avaliacao");
const usuarioAvaliacaoSelect = document.getElementById("usuario-avaliacao");
const cursoAvaliacaoSelect = document.getElementById("curso-avaliacao");
const notaAvaliacaoSelect = document.getElementById("nota-avaliacao");
const comentarioAvaliacaoInput = document.getElementById("comentario-avaliacao");
const dataAvaliacaoInput = document.getElementById("data-avaliacao");
const tabelaAvaliacoesBody = document.getElementById("tabela-avaliacoes");
const botaoInserirAvaliacao = document.getElementById("btn-inserir-avaliacao");
const modalAvaliacaoElement = document.getElementById("modal-avaliacao");
const tituloModalAvaliacao = document.getElementById("titulo-modal-avaliacao");
const botaoSalvarAvaliacao = document.getElementById("btn-salvar-avaliacao");

if (
    formAvaliacao &&
    usuarioAvaliacaoSelect &&
    cursoAvaliacaoSelect &&
    notaAvaliacaoSelect &&
    comentarioAvaliacaoInput &&
    dataAvaliacaoInput &&
    tabelaAvaliacoesBody &&
    botaoInserirAvaliacao &&
    modalAvaliacaoElement &&
    tituloModalAvaliacao &&
    botaoSalvarAvaliacao
) {
    const modalAvaliacao = window.bootstrap ? new window.bootstrap.Modal(modalAvaliacaoElement) : null;

    function dataAtualFormatoInputAvaliacao() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function configurarModalInsercaoAvaliacao() {
        formAvaliacao.reset();
        dataAvaliacaoInput.value = dataAtualFormatoInputAvaliacao();
        tituloModalAvaliacao.textContent = "Nova Avaliacao";
        botaoSalvarAvaliacao.textContent = "Salvar";
    }

    function abrirModalInsercaoAvaliacao() {
        preencherSelectUsuariosAvaliacao();
        preencherSelectCursosAvaliacao();
        configurarModalInsercaoAvaliacao();
        usuarioAvaliacaoSelect.focus();
    }

    function preencherSelectUsuariosAvaliacao() {
        usuarioAvaliacaoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuario";
        usuarioAvaliacaoSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioAvaliacaoSelect.appendChild(opcao);
        });
    }

    function preencherSelectCursosAvaliacao() {
        cursoAvaliacaoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um curso";
        cursoAvaliacaoSelect.appendChild(opcaoPadrao);

        const cursos = listarCursos();
        cursos.forEach((curso) => {
            const opcao = document.createElement("option");
            opcao.value = curso.id;
            opcao.textContent = curso.titulo;
            cursoAvaliacaoSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuarioAvaliacao(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarTituloCursoAvaliacao(idCurso) {
        const curso = listarCursos().find((item) => Number(item.id) === Number(idCurso));
        return curso ? curso.titulo : "-";
    }

    function renderizarAvaliacoes() {
        const avaliacoes = listarAvaliacoes();
        tabelaAvaliacoesBody.innerHTML = "";

        if (avaliacoes.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 6;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma avaliacao cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaAvaliacoesBody.appendChild(linhaVazia);
            return;
        }

        avaliacoes.forEach((avaliacao) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuarioAvaliacao(avaliacao.idUsuario);

            const colunaCurso = document.createElement("td");
            colunaCurso.textContent = buscarTituloCursoAvaliacao(avaliacao.idCurso);

            const colunaNota = document.createElement("td");
            colunaNota.textContent = avaliacao.nota;

            const colunaComentario = document.createElement("td");
            colunaComentario.textContent = avaliacao.comentario || "-";

            const colunaData = document.createElement("td");
            colunaData.textContent = avaliacao.dataAvaliacao;

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
                const confirmar = window.confirm("Deseja excluir esta avaliacao?");
                if (!confirmar) {
                    return;
                }

                excluirAvaliacao(avaliacao.id);
                renderizarAvaliacoes();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaCurso);
            linha.appendChild(colunaNota);
            linha.appendChild(colunaComentario);
            linha.appendChild(colunaData);
            linha.appendChild(colunaAcoes);
            tabelaAvaliacoesBody.appendChild(linha);
        });
    }

    formAvaliacao.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioAvaliacaoSelect.value);
        const idCurso = Number(cursoAvaliacaoSelect.value);
        const nota = Number(notaAvaliacaoSelect.value);
        const comentario = comentarioAvaliacaoInput.value.trim();
        const dataAvaliacao = dataAvaliacaoInput.value;

        if (!idUsuario) {
            alert("Selecione o usuario.");
            usuarioAvaliacaoSelect.focus();
            return;
        }

        if (!idCurso) {
            alert("Selecione o curso.");
            cursoAvaliacaoSelect.focus();
            return;
        }

        if (!nota || nota < 1 || nota > 5) {
            alert("Selecione uma nota de 1 a 5.");
            notaAvaliacaoSelect.focus();
            return;
        }

        if (dataAvaliacao === "") {
            alert("Informe a data da avaliacao.");
            dataAvaliacaoInput.focus();
            return;
        }

        cadastrarAvaliacao(idUsuario, idCurso, nota, comentario, dataAvaliacao);
        renderizarAvaliacoes();
        configurarModalInsercaoAvaliacao();
        if (modalAvaliacao) {
            modalAvaliacao.hide();
        }
    });

    botaoInserirAvaliacao.addEventListener("click", abrirModalInsercaoAvaliacao);
    modalAvaliacaoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoAvaliacao);

    configurarModalInsercaoAvaliacao();
    preencherSelectUsuariosAvaliacao();
    preencherSelectCursosAvaliacao();
    renderizarAvaliacoes();
}

const formCertificado = document.getElementById("form-certificado");
const usuarioCertificadoSelect = document.getElementById("usuario-certificado");
const cursoCertificadoSelect = document.getElementById("curso-certificado");
const codigoVerificacaoInput = document.getElementById("codigo-verificacao");
const dataEmissaoInput = document.getElementById("data-emissao");
const nomeUsuarioCertificado = document.getElementById("nome-usuario-certificado");
const nomeCursoCertificado = document.getElementById("nome-curso-certificado");
const dataEmissaoCertificado = document.getElementById("data-emissao-certificado");
const codigoVerificacaoCertificado = document.getElementById("codigo-verificacao-certificado");
const tabelaCertificadosBody = document.getElementById("tabela-certificados");
const botaoInserirCertificado = document.getElementById("btn-inserir-certificado");
const modalCertificadoElement = document.getElementById("modal-certificado");
const tituloModalCertificado = document.getElementById("titulo-modal-certificado");
const botaoSalvarCertificado = document.getElementById("btn-salvar-certificado");

if (
    formCertificado &&
    usuarioCertificadoSelect &&
    cursoCertificadoSelect &&
    codigoVerificacaoInput &&
    dataEmissaoInput &&
    nomeUsuarioCertificado &&
    nomeCursoCertificado &&
    dataEmissaoCertificado &&
    codigoVerificacaoCertificado &&
    tabelaCertificadosBody &&
    botaoInserirCertificado &&
    modalCertificadoElement &&
    tituloModalCertificado &&
    botaoSalvarCertificado
) {
    const modalCertificado = window.bootstrap ? new window.bootstrap.Modal(modalCertificadoElement) : null;

    function gerarProximoCodigoCertificado() {
        const certificados = listarCertificados();
        if (certificados.length === 0) {
            return "CERT-001";
        }

        const maiorId = Math.max(...certificados.map((certificado) => Number(certificado.id) || 0));
        const proximoId = maiorId + 1;
        return `CERT-${String(proximoId).padStart(3, "0")}`;
    }

    function dataAtualFormatoInputCertificado() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function configurarModalInsercaoCertificado() {
        formCertificado.reset();
        dataEmissaoInput.value = dataAtualFormatoInputCertificado();
        codigoVerificacaoInput.value = gerarProximoCodigoCertificado();
        tituloModalCertificado.textContent = "Gerar Certificado";
        botaoSalvarCertificado.textContent = "Salvar";
    }

    function abrirModalInsercaoCertificado() {
        preencherSelectUsuariosCertificado();
        preencherSelectCursosCertificado();
        configurarModalInsercaoCertificado();
        usuarioCertificadoSelect.focus();
    }

    function preencherSelectUsuariosCertificado() {
        usuarioCertificadoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um usuario";
        usuarioCertificadoSelect.appendChild(opcaoPadrao);

        const usuarios = listarUsuarios();
        usuarios.forEach((usuario) => {
            const opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.nomeCompleto;
            usuarioCertificadoSelect.appendChild(opcao);
        });
    }

    function preencherSelectCursosCertificado() {
        cursoCertificadoSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione um curso";
        cursoCertificadoSelect.appendChild(opcaoPadrao);

        const cursos = listarCursos();
        cursos.forEach((curso) => {
            const opcao = document.createElement("option");
            opcao.value = curso.id;
            opcao.textContent = curso.titulo;
            cursoCertificadoSelect.appendChild(opcao);
        });
    }

    function buscarNomeUsuarioCertificado(idUsuario) {
        const usuario = listarUsuarios().find((item) => Number(item.id) === Number(idUsuario));
        return usuario ? usuario.nomeCompleto : "-";
    }

    function buscarNomeCursoCertificado(idCurso) {
        const curso = listarCursos().find((item) => Number(item.id) === Number(idCurso));
        return curso ? curso.titulo : "-";
    }

    function statusEhConcluido(status) {
        if (!status) {
            return false;
        }

        return status.toLowerCase().includes("concl");
    }

    function usuarioTemProgressoConcluidoNoCurso(idUsuario, idCurso) {
        const progressos = listarProgressoAulas();
        const aulas = listarAulas();
        const modulos = listarModulos();

        for (let i = 0; i < progressos.length; i += 1) {
            const progresso = progressos[i];

            if (Number(progresso.idUsuario) !== Number(idUsuario)) {
                continue;
            }

            if (!statusEhConcluido(progresso.status)) {
                continue;
            }

            const aula = aulas.find((item) => Number(item.id) === Number(progresso.idAula));
            if (!aula) {
                continue;
            }

            const modulo = modulos.find((item) => Number(item.id) === Number(aula.idModulo));
            if (!modulo) {
                continue;
            }

            if (Number(modulo.idCurso) === Number(idCurso)) {
                return true;
            }
        }

        return false;
    }

    function atualizarVisualCertificado(certificado) {
        if (!certificado) {
            nomeUsuarioCertificado.textContent = "Nome do Usuario";
            nomeCursoCertificado.textContent = "Nome do Curso";
            dataEmissaoCertificado.textContent = "--/--/----";
            codigoVerificacaoCertificado.textContent = "---";
            return;
        }

        nomeUsuarioCertificado.textContent = buscarNomeUsuarioCertificado(certificado.idUsuario);
        nomeCursoCertificado.textContent = buscarNomeCursoCertificado(certificado.idCurso);
        dataEmissaoCertificado.textContent = certificado.dataEmissao;
        codigoVerificacaoCertificado.textContent = certificado.codigoVerificacao;
    }

    function renderizarCertificados() {
        const certificados = listarCertificados();
        tabelaCertificadosBody.innerHTML = "";

        if (certificados.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 5;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhum certificado gerado.";
            linhaVazia.appendChild(colunaVazia);
            tabelaCertificadosBody.appendChild(linhaVazia);
            return;
        }

        certificados.forEach((certificado) => {
            const linha = document.createElement("tr");

            const colunaUsuario = document.createElement("td");
            colunaUsuario.textContent = buscarNomeUsuarioCertificado(certificado.idUsuario);

            const colunaCurso = document.createElement("td");
            colunaCurso.textContent = buscarNomeCursoCertificado(certificado.idCurso);

            const colunaCodigo = document.createElement("td");
            colunaCodigo.textContent = certificado.codigoVerificacao;

            const colunaData = document.createElement("td");
            colunaData.textContent = certificado.dataEmissao;

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

            const itemVisualizar = document.createElement("li");
            const botaoVisualizar = document.createElement("button");
            botaoVisualizar.type = "button";
            botaoVisualizar.className = "dropdown-item";
            botaoVisualizar.textContent = "Visualizar";
            botaoVisualizar.addEventListener("click", () => {
                atualizarVisualCertificado(certificado);
            });
            itemVisualizar.appendChild(botaoVisualizar);

            const itemExcluir = document.createElement("li");
            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "dropdown-item text-danger";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => {
                const confirmar = window.confirm("Deseja excluir este certificado?");
                if (!confirmar) {
                    return;
                }

                excluirCertificado(certificado.id);
                const ultimo = listarCertificados().slice(-1)[0] || null;
                atualizarVisualCertificado(ultimo);
                renderizarCertificados();
                codigoVerificacaoInput.value = gerarProximoCodigoCertificado();
            });
            itemExcluir.appendChild(botaoExcluir);

            menu.appendChild(itemVisualizar);
            menu.appendChild(itemExcluir);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaUsuario);
            linha.appendChild(colunaCurso);
            linha.appendChild(colunaCodigo);
            linha.appendChild(colunaData);
            linha.appendChild(colunaAcoes);
            tabelaCertificadosBody.appendChild(linha);
        });
    }

    formCertificado.addEventListener("submit", (event) => {
        event.preventDefault();

        const idUsuario = Number(usuarioCertificadoSelect.value);
        const idCurso = Number(cursoCertificadoSelect.value);
        const dataEmissao = dataEmissaoInput.value;

        if (!idUsuario) {
            alert("Selecione um usuario.");
            usuarioCertificadoSelect.focus();
            return;
        }

        if (!idCurso) {
            alert("Selecione um curso.");
            cursoCertificadoSelect.focus();
            return;
        }

        if (dataEmissao === "") {
            alert("Informe a data de emissao.");
            dataEmissaoInput.focus();
            return;
        }

        const possuiProgressoConcluido = usuarioTemProgressoConcluidoNoCurso(idUsuario, idCurso);
        if (!possuiProgressoConcluido) {
            alert("Para gerar certificado, registre um progresso concluido do usuario em uma aula desse curso.");
            usuarioCertificadoSelect.focus();
            return;
        }

        const certificadoDuplicado = listarCertificados().some((certificado) => {
            return Number(certificado.idUsuario) === idUsuario && Number(certificado.idCurso) === idCurso;
        });

        if (certificadoDuplicado) {
            alert("Ja existe certificado para esse usuario nesse curso.");
            usuarioCertificadoSelect.focus();
            return;
        }

        const novoCertificado = cadastrarCertificado(idUsuario, idCurso, dataEmissao);
        atualizarVisualCertificado(novoCertificado);
        renderizarCertificados();
        configurarModalInsercaoCertificado();
        if (modalCertificado) {
            modalCertificado.hide();
        }
    });

    botaoInserirCertificado.addEventListener("click", abrirModalInsercaoCertificado);
    modalCertificadoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoCertificado);

    const ultimoCertificado = listarCertificados().slice(-1)[0] || null;
    atualizarVisualCertificado(ultimoCertificado);
    preencherSelectUsuariosCertificado();
    preencherSelectCursosCertificado();
    renderizarCertificados();
    configurarModalInsercaoCertificado();
}

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
            dropdown.className = "dropdown";

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
            dropdown.className = "dropdown";

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
            dropdown.className = "dropdown";

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

const formTrilha = document.getElementById("form-trilha");
const tituloTrilhaInput = document.getElementById("titulo-trilha");
const descricaoTrilhaInput = document.getElementById("descricao-trilha");
const categoriaTrilhaSelect = document.getElementById("categoria-trilha");
const tabelaTrilhasBody = document.getElementById("tabela-trilhas");
const botaoInserirTrilha = document.getElementById("btn-inserir-trilha");
const modalTrilhaElement = document.getElementById("modal-trilha");
const tituloModalTrilha = document.getElementById("titulo-modal-trilha");
const botaoSalvarTrilha = document.getElementById("btn-salvar-trilha");

if (
    formTrilha &&
    tituloTrilhaInput &&
    descricaoTrilhaInput &&
    categoriaTrilhaSelect &&
    tabelaTrilhasBody &&
    botaoInserirTrilha &&
    modalTrilhaElement &&
    tituloModalTrilha &&
    botaoSalvarTrilha
) {
    const modalTrilha = window.bootstrap ? new window.bootstrap.Modal(modalTrilhaElement) : null;

    function configurarModalInsercaoTrilha() {
        formTrilha.reset();
        tituloModalTrilha.textContent = "Nova Trilha";
        botaoSalvarTrilha.textContent = "Salvar";
    }

    function abrirModalInsercaoTrilha() {
        preencherSelectCategoriasTrilha();
        configurarModalInsercaoTrilha();
        tituloTrilhaInput.focus();
    }

    function preencherSelectCategoriasTrilha() {
        categoriaTrilhaSelect.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione uma categoria";
        categoriaTrilhaSelect.appendChild(opcaoPadrao);

        const categorias = listarCategorias();
        categorias.forEach((categoria) => {
            const opcao = document.createElement("option");
            opcao.value = categoria.id;
            opcao.textContent = categoria.nome;
            categoriaTrilhaSelect.appendChild(opcao);
        });
    }

    function buscarNomeCategoriaTrilha(idCategoria) {
        const categoria = listarCategorias().find((item) => Number(item.id) === Number(idCategoria));
        return categoria ? categoria.nome : "-";
    }

    function renderizarTrilhas() {
        const trilhas = listarTrilhas();
        tabelaTrilhasBody.innerHTML = "";

        if (trilhas.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 4;
            colunaVazia.className = "text-center text-muted";
            colunaVazia.textContent = "Nenhuma trilha cadastrada.";
            linhaVazia.appendChild(colunaVazia);
            tabelaTrilhasBody.appendChild(linhaVazia);
            return;
        }

        trilhas.forEach((trilha) => {
            const linha = document.createElement("tr");

            const colunaTitulo = document.createElement("td");
            colunaTitulo.textContent = trilha.titulo;

            const colunaCategoria = document.createElement("td");
            colunaCategoria.textContent = buscarNomeCategoriaTrilha(trilha.idCategoria);

            const colunaDescricao = document.createElement("td");
            colunaDescricao.textContent = trilha.descricao || "-";

            const colunaAcoes = document.createElement("td");
            colunaAcoes.className = "text-center";
            const dropdown = document.createElement("div");
            dropdown.className = "dropdown";

            const botaoAcoes = document.createElement("button");
            botaoAcoes.type = "button";
            botaoAcoes.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
            botaoAcoes.setAttribute("data-bs-toggle", "dropdown");
            botaoAcoes.textContent = "Acoes";

            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            const itemGerenciar = document.createElement("li");
            const linkGerenciar = document.createElement("a");
            linkGerenciar.className = "dropdown-item";
            linkGerenciar.href = `./trilha-cursos.html?idTrilha=${trilha.id}`;
            linkGerenciar.textContent = "Gerenciar cursos";
            itemGerenciar.appendChild(linkGerenciar);

            menu.appendChild(itemGerenciar);
            dropdown.appendChild(botaoAcoes);
            dropdown.appendChild(menu);
            colunaAcoes.appendChild(dropdown);

            linha.appendChild(colunaTitulo);
            linha.appendChild(colunaCategoria);
            linha.appendChild(colunaDescricao);
            linha.appendChild(colunaAcoes);
            tabelaTrilhasBody.appendChild(linha);
        });
    }

    formTrilha.addEventListener("submit", (event) => {
        event.preventDefault();

        const titulo = tituloTrilhaInput.value.trim();
        const descricao = descricaoTrilhaInput.value.trim();
        const idCategoria = Number(categoriaTrilhaSelect.value);

        if (titulo === "") {
            alert("Informe o titulo da trilha.");
            tituloTrilhaInput.focus();
            return;
        }

        if (!idCategoria) {
            alert("Selecione a categoria da trilha.");
            categoriaTrilhaSelect.focus();
            return;
        }

        cadastrarTrilha(titulo, descricao, idCategoria);
        renderizarTrilhas();
        configurarModalInsercaoTrilha();
        if (modalTrilha) {
            modalTrilha.hide();
        }
    });

    botaoInserirTrilha.addEventListener("click", abrirModalInsercaoTrilha);
    modalTrilhaElement.addEventListener("hidden.bs.modal", configurarModalInsercaoTrilha);

    configurarModalInsercaoTrilha();
    preencherSelectCategoriasTrilha();
    renderizarTrilhas();
}

const formTrilhaCursos = document.getElementById("form-trilha-cursos");
const nomeTrilhaSelecionada = document.getElementById("nome-trilha-selecionada");
const cursoTrilhaSelect = document.getElementById("curso-trilha");
const ordemCursoTrilhaInput = document.getElementById("ordem-curso-trilha");
const tabelaTrilhaCursosBody = document.getElementById("tabela-trilha-cursos");
const botaoInserirTrilhaCurso = document.getElementById("btn-inserir-trilha-curso");
const modalTrilhaCursoElement = document.getElementById("modal-trilha-curso");
const tituloModalTrilhaCurso = document.getElementById("titulo-modal-trilha-curso");
const botaoSalvarTrilhaCurso = document.getElementById("btn-salvar-trilha-curso");

if (
    formTrilhaCursos &&
    nomeTrilhaSelecionada &&
    cursoTrilhaSelect &&
    ordemCursoTrilhaInput &&
    tabelaTrilhaCursosBody &&
    botaoInserirTrilhaCurso &&
    modalTrilhaCursoElement &&
    tituloModalTrilhaCurso &&
    botaoSalvarTrilhaCurso
) {
    const modalTrilhaCurso = window.bootstrap ? new window.bootstrap.Modal(modalTrilhaCursoElement) : null;
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idTrilhaAtual = Number(parametrosUrl.get("idTrilha"));

    function configurarModalInsercaoTrilhaCurso() {
        formTrilhaCursos.reset();
        tituloModalTrilhaCurso.textContent = "Adicionar Curso";
        botaoSalvarTrilhaCurso.textContent = "Salvar";
    }

    function abrirModalInsercaoTrilhaCurso() {
        preencherSelectCursosDaTrilha();
        configurarModalInsercaoTrilhaCurso();
        cursoTrilhaSelect.focus();
    }

    function mostrarErroTrilhaCursos(mensagem) {
        nomeTrilhaSelecionada.className = "fw-semibold text-danger";
        nomeTrilhaSelecionada.textContent = mensagem;
        tabelaTrilhaCursosBody.innerHTML = "";

        const linhaErro = document.createElement("tr");
        const colunaErro = document.createElement("td");
        colunaErro.colSpan = 3;
        colunaErro.className = "text-center text-danger";
        colunaErro.textContent = mensagem;
        linhaErro.appendChild(colunaErro);
        tabelaTrilhaCursosBody.appendChild(linhaErro);

        cursoTrilhaSelect.disabled = true;
        ordemCursoTrilhaInput.disabled = true;
        const botaoAdicionar = formTrilhaCursos.querySelector("button[type='submit']");
        if (botaoAdicionar) {
            botaoAdicionar.disabled = true;
        }
        botaoInserirTrilhaCurso.disabled = true;
    }

    const trilhaAtual = listarTrilhas().find((trilha) => Number(trilha.id) === idTrilhaAtual);

    if (!idTrilhaAtual || !trilhaAtual) {
        mostrarErroTrilhaCursos("Trilha nao encontrada.");
    } else {
        nomeTrilhaSelecionada.textContent = trilhaAtual.titulo;

        function preencherSelectCursosDaTrilha() {
            cursoTrilhaSelect.innerHTML = "";

            const opcaoPadrao = document.createElement("option");
            opcaoPadrao.value = "";
            opcaoPadrao.textContent = "Selecione um curso";
            cursoTrilhaSelect.appendChild(opcaoPadrao);

            const cursos = listarCursos();
            cursos.forEach((curso) => {
                const opcao = document.createElement("option");
                opcao.value = curso.id;
                opcao.textContent = curso.titulo;
                cursoTrilhaSelect.appendChild(opcao);
            });
        }

        function buscarNomeCursoTrilha(idCurso) {
            const curso = listarCursos().find((item) => Number(item.id) === Number(idCurso));
            return curso ? curso.titulo : "-";
        }

        function renderizarCursosDaTrilha() {
            const vinculos = listarTrilhasCursos().filter((item) => Number(item.idTrilha) === idTrilhaAtual);
            tabelaTrilhaCursosBody.innerHTML = "";

            if (vinculos.length === 0) {
                const linhaVazia = document.createElement("tr");
                const colunaVazia = document.createElement("td");
                colunaVazia.colSpan = 3;
                colunaVazia.className = "text-center text-muted";
                colunaVazia.textContent = "Nenhum curso vinculado a esta trilha.";
                linhaVazia.appendChild(colunaVazia);
                tabelaTrilhaCursosBody.appendChild(linhaVazia);
                return;
            }

            vinculos.forEach((vinculo) => {
                const linha = document.createElement("tr");

                const colunaCurso = document.createElement("td");
                colunaCurso.textContent = buscarNomeCursoTrilha(vinculo.idCurso);

                const colunaOrdem = document.createElement("td");
                colunaOrdem.textContent = vinculo.ordem;

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
                    const confirmar = window.confirm("Deseja remover este curso da trilha?");
                    if (!confirmar) {
                        return;
                    }

                    excluirTrilhaCurso(vinculo.idTrilha, vinculo.idCurso);
                    renderizarCursosDaTrilha();
                });
                itemExcluir.appendChild(botaoExcluir);

                menu.appendChild(itemExcluir);
                dropdown.appendChild(botaoAcoes);
                dropdown.appendChild(menu);
                colunaAcoes.appendChild(dropdown);

                linha.appendChild(colunaCurso);
                linha.appendChild(colunaOrdem);
                linha.appendChild(colunaAcoes);
                tabelaTrilhaCursosBody.appendChild(linha);
            });
        }

        formTrilhaCursos.addEventListener("submit", (event) => {
            event.preventDefault();

            const idCurso = Number(cursoTrilhaSelect.value);
            const ordem = Number(ordemCursoTrilhaInput.value);

            if (!idCurso) {
                alert("Selecione um curso.");
                cursoTrilhaSelect.focus();
                return;
            }

            if (!ordem) {
                alert("Informe a ordem do curso na trilha.");
                ordemCursoTrilhaInput.focus();
                return;
            }

            const cursoJaVinculado = listarTrilhasCursos().some((item) => {
                return Number(item.idTrilha) === idTrilhaAtual && Number(item.idCurso) === idCurso;
            });

            if (cursoJaVinculado) {
                alert("Esse curso ja foi vinculado a esta trilha.");
                cursoTrilhaSelect.focus();
                return;
            }

            cadastrarTrilhaCurso(idTrilhaAtual, idCurso, ordem);
            renderizarCursosDaTrilha();
            configurarModalInsercaoTrilhaCurso();
            if (modalTrilhaCurso) {
                modalTrilhaCurso.hide();
            }
        });

        botaoInserirTrilhaCurso.addEventListener("click", abrirModalInsercaoTrilhaCurso);
        modalTrilhaCursoElement.addEventListener("hidden.bs.modal", configurarModalInsercaoTrilhaCurso);

        configurarModalInsercaoTrilhaCurso();
        preencherSelectCursosDaTrilha();
        renderizarCursosDaTrilha();
    }
}


