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
    return usuarios.length + 1;
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

export { Usuario, usuarios, gerarIdUsuario, cadastrarUsuario, listarUsuarios };

