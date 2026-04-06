import "./services/bootstrapAlerts.js";

function dataHojeISO() {
    return new Date().toISOString().split("T")[0];
}

function aplicarDataPadraoHoje(escopo = document) {
    if (!escopo || !escopo.querySelectorAll) {
        return;
    }

    const hoje = dataHojeISO();
    const camposData = escopo.querySelectorAll('input[type="date"]');

    camposData.forEach((campo) => {
        if (campo.disabled || campo.readOnly) {
            return;
        }

        if (!campo.value) {
            campo.value = hoje;
        }
    });
}

window.aplicarDataPadraoHoje = aplicarDataPadraoHoje;

document.addEventListener("DOMContentLoaded", () => {
    aplicarDataPadraoHoje();
});

function carregarControllers() {
    const controllers = [
        "./controllers/categoriasController.js",
        "./controllers/usuariosController.js",
        "./controllers/cursosController.js",
        "./controllers/modulosAulasController.js",
        "./controllers/matriculasProgressoController.js",
        "./controllers/planosAssinaturasPagamentosController.js",
        "./controllers/trilhasController.js"
    ];

    controllers.forEach((caminho) => {
        import(caminho);
    });
}

carregarControllers();

