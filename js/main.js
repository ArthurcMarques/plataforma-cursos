import { cadastrarCategoria, listarCategorias } from "./models/Categoria.js";
import { cadastrarUsuario, listarUsuarios } from "./models/Usuario.js";

const formCategoria = document.getElementById("form-categoria");
const nomeCategoriaInput = document.getElementById("nome-categoria");
const descricaoCategoriaInput = document.getElementById("descricao-categoria");
const tabelaCategoriasBody = document.getElementById("tabela-categorias");

if (formCategoria && nomeCategoriaInput && descricaoCategoriaInput && tabelaCategoriasBody) {
    function renderizarCategorias() {
        const categorias = listarCategorias();
        tabelaCategoriasBody.innerHTML = "";

        if (categorias.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 2;
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

            linha.appendChild(colunaNome);
            linha.appendChild(colunaDescricao);
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
            return categoria.nome.toLowerCase() === nome.toLowerCase();
        });

        if (nomeJaExiste) {
            alert("Ja existe uma categoria com esse nome.");
            nomeCategoriaInput.focus();
            return;
        }

        cadastrarCategoria(nome, descricao);
        renderizarCategorias();
        formCategoria.reset();
        nomeCategoriaInput.focus();
    });

    renderizarCategorias();
}

const formUsuario = document.getElementById("form-usuario");
const nomeUsuarioInput = document.getElementById("nome-usuario");
const emailUsuarioInput = document.getElementById("email-usuario");
const senhaUsuarioInput = document.getElementById("senha-usuario");
const dataCadastroUsuarioInput = document.getElementById("data-cadastro-usuario");
const tabelaUsuariosBody = document.getElementById("tabela-usuarios");

if (
    formUsuario &&
    nomeUsuarioInput &&
    emailUsuarioInput &&
    senhaUsuarioInput &&
    dataCadastroUsuarioInput &&
    tabelaUsuariosBody
) {
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

    function renderizarUsuarios() {
        const usuarios = listarUsuarios();
        tabelaUsuariosBody.innerHTML = "";

        if (usuarios.length === 0) {
            const linhaVazia = document.createElement("tr");
            const colunaVazia = document.createElement("td");
            colunaVazia.colSpan = 4;
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

            linha.appendChild(colunaId);
            linha.appendChild(colunaNome);
            linha.appendChild(colunaEmail);
            linha.appendChild(colunaData);
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
            return usuario.email === email;
        });

        if (emailJaExiste) {
            alert("Ja existe um usuario com esse e-mail.");
            emailUsuarioInput.focus();
            return;
        }

        cadastrarUsuario(nomeCompleto, email, senha, dataCadastro);
        renderizarUsuarios();
        formUsuario.reset();
        definirDataAtualPadrao();
        nomeUsuarioInput.focus();
    });

    definirDataAtualPadrao();
    renderizarUsuarios();
}

