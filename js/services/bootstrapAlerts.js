const ALERT_CONTAINER_ID = "app-alert-container";

function garantirContainer() {
    let container = document.getElementById(ALERT_CONTAINER_ID);
    if (container) {
        return container;
    }

    container = document.createElement("div");
    container.id = ALERT_CONTAINER_ID;
    container.className = "position-fixed top-0 start-50 translate-middle-x p-3";
    container.style.zIndex = "1080";
    document.body.appendChild(container);
    return container;
}

function mostrarAlertaBootstrap(mensagem, tipo = "danger") {
    if (!document.body) {
        return;
    }

    const container = garantirContainer();
    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo} alert-dismissible fade show shadow-sm mb-2`;
    alerta.setAttribute("role", "alert");
    alerta.innerHTML = `<span>${mensagem}</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>`;
    container.appendChild(alerta);

    window.setTimeout(() => {
        if (alerta.parentElement) {
            alerta.classList.remove("show");
            alerta.classList.add("hide");
            window.setTimeout(() => alerta.remove(), 200);
        }
    }, 3500);
}

window.showAppAlert = mostrarAlertaBootstrap;
window.alert = (mensagem) => {
    mostrarAlertaBootstrap(String(mensagem), "danger");
};
