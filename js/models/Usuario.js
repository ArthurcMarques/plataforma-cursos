import { carregarListaDoStorage, salvarListaNoStorage } from "../storage/localStorage.js";

class Usuario {
    constructor(id, nomeCompleto, email, senha, dataCadastro) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.dataCadastro = dataCadastro;
    }
}

const CHAVE_STORAGE_USUARIOS = "usuarios";

const usuarios = carregarListaDoStorage(CHAVE_STORAGE_USUARIOS).map((item) => {
    return new Usuario(item.id, item.nomeCompleto, item.email, item.senha, item.dataCadastro);
});

function gerarIdUsuario() {
    if (usuarios.length === 0) {
        return 1;
    }

    const maiorId = Math.max(...usuarios.map((usuario) => Number(usuario.id) || 0));
    return maiorId + 1;
}

function cadastrarUsuario(nomeCompleto, email, senha, dataCadastro) {
    const emailMinusculo = email.trim().toLowerCase();
    const novoUsuario = new Usuario(gerarIdUsuario(), nomeCompleto, emailMinusculo, senha, dataCadastro);
    usuarios.push(novoUsuario);
    salvarListaNoStorage(CHAVE_STORAGE_USUARIOS, usuarios);
    return novoUsuario;
}

function listarUsuarios() {
    return usuarios;
}

function atualizarUsuario(id, nomeCompleto, email, senha, dataCadastro) {
    const usuario = usuarios.find((item) => Number(item.id) === Number(id));
    if (!usuario) {
        return null;
    }

    usuario.nomeCompleto = nomeCompleto;
    usuario.email = email.trim().toLowerCase();
    usuario.senha = senha;
    usuario.dataCadastro = dataCadastro;
    salvarListaNoStorage(CHAVE_STORAGE_USUARIOS, usuarios);
    return usuario;
}

function excluirUsuario(id) {
    const indice = usuarios.findIndex((item) => Number(item.id) === Number(id));
    if (indice === -1) {
        return false;
    }

    usuarios.splice(indice, 1);
    salvarListaNoStorage(CHAVE_STORAGE_USUARIOS, usuarios);
    return true;
}

export {
    Usuario,
    usuarios,
    gerarIdUsuario,
    cadastrarUsuario,
    listarUsuarios,
    atualizarUsuario,
    excluirUsuario
};

