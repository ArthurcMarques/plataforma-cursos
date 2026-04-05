function carregarListaDoStorage(chave) {
    if (typeof localStorage === "undefined") {
        return [];
    }

    const valorSalvo = localStorage.getItem(chave);
    if (!valorSalvo) {
        return [];
    }

    try {
        const lista = JSON.parse(valorSalvo);
        return Array.isArray(lista) ? lista : [];
    } catch (erro) {
        return [];
    }
}

function salvarListaNoStorage(chave, lista) {
    if (typeof localStorage === "undefined") {
        return;
    }

    localStorage.setItem(chave, JSON.stringify(lista));
}

export { carregarListaDoStorage, salvarListaNoStorage };
