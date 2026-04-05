class Usuario {
    constructor(id, nomeCompleto, email, senha, dataCadastro) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.dataCadastro = dataCadastro;
    }
}

const usuarios = [];

function gerarIdUsuario() {
    return usuarios.length + 1;
}

function cadastrarUsuario(nomeCompleto, email, senha, dataCadastro) {
    const emailMinusculo = email.trim().toLowerCase();
    const novoUsuario = new Usuario(gerarIdUsuario(), nomeCompleto, emailMinusculo, senha, dataCadastro);
    usuarios.push(novoUsuario);
    return novoUsuario;
}

function listarUsuarios() {
    return usuarios;
}

export { Usuario, usuarios, gerarIdUsuario, cadastrarUsuario, listarUsuarios };

