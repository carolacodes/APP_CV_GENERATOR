document.addEventListener('DOMContentLoaded', () => {
        const btnFormulario = document.getElementById("btnFormulario");
        const btnVistaPrevia = document.getElementById("btnVistaPrevia");
        const formulario = document.getElementById("formulario");
        const vistaPrevia = document.getElementById("vista-previa");

        btnFormulario.addEventListener("click", () => {
            formulario.style.display = "block";
            vistaPrevia.style.display = "none";
        });

        btnVistaPrevia.addEventListener("click", () => {
            formulario.style.display = "none";
            vistaPrevia.style.display = "block";
        });
});