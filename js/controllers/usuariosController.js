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


const formUsuario = document.getElementById("form-usuario");
const nomeUsuarioInput = document.getElementById("nome-usuario");
const emailUsuarioInput = document.getElementById("email-usuario");
const senhaUsuarioInput = document.getElementById("senha-usuario");
const tipoUsuarioSelect = document.getElementById("tipo-usuario");
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
    tipoUsuarioSelect &&
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
        tipoUsuarioSelect.value = "Aluno";
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
        tipoUsuarioSelect.value = usuario.tipoUsuario || "Aluno";
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
            colunaVazia.colSpan = 6;
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

            const colunaTipo = document.createElement("td");
            colunaTipo.textContent = usuario.tipoUsuario || "Aluno";

            const colunaData = document.createElement("td");
            colunaData.textContent = usuario.dataCadastro;

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
            linha.appendChild(colunaTipo);
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
        const tipoUsuario = tipoUsuarioSelect.value;
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

        if (tipoUsuario !== "Aluno" && tipoUsuario !== "Instrutor") {
            alert("Selecione o tipo de usuario.");
            tipoUsuarioSelect.focus();
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
            cadastrarUsuario(nomeCompleto, email, senha, dataCadastro, tipoUsuario);`r`n            window.showAppAlert("Usuario cadastrado com sucesso.", "success");
        } else {
            atualizarUsuario(idUsuarioEmEdicao, nomeCompleto, email, senha, dataCadastro, tipoUsuario);
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



