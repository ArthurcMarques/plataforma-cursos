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

import "./controllers/categoriasController.js";
import "./controllers/usuariosController.js";
import "./controllers/cursosController.js";
import "./controllers/modulosAulasController.js";
import "./controllers/matriculasProgressoController.js";
import "./controllers/planosAssinaturasPagamentosController.js";
import "./controllers/trilhasController.js";
