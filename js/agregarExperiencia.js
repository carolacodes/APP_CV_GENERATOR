document.addEventListener('DOMContentLoaded', () => {
const contenedor = document.getElementById('contenedorExperiencias');
const btnAgregar = document.getElementById('btnAgregarExperiencia');
let textExperiencia = document.getElementById('textExperiencia');

    btnAgregar.addEventListener('click', () => {
            textExperiencia.remove()
            const experiencia = document.createElement('div');
            experiencia.classList.add('experiencia-item', 'mb-4');
            experiencia.innerHTML = `
                <div class="row">
                    <div class="col text-end">
                    <button type="button" class="btn btn-eliminar">
                        <i class="bi bi-trash3 icon-trash"></i>
                    </button>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col mb-3">
                    <label class="form-label">Puesto</label>
                    <input type="text" class="form-control mt-1 puestoExp" maxlength="30">
                    </div>
                    <div class="col mb-3">
                    <label class="form-label">Empresa/Lugar</label>
                    <input type="text" class="form-control mt-1 empresaExp" maxlength="30">
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                    <label class="form-label">Fecha de Inicio</label>
                    <input type="date" class="form-control mt-1 fechaInicioExp">
                    </div>
                    <div class="col mb-3">
                    <label class="form-label">Fecha de Fin</label>
                    <input type="date" class="form-control mt-1 fechaFinExp">
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                    <div class="form-check">
                        <input class="form-check-input checkExp" type="checkbox">
                        <label class="form-check-label">Presente Actualmente</label>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                    <label class="form-label">Tarea Desempeñada</label>
                    <textarea class="form-control tareaDesemExp" rows="2" maxlength="150"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                    <label class="form-label">Contacto de Referencia</label>
                    <input type="text" class="form-control mt-1 contactoRefExp" maxlength="30">
                    </div>
                </div>
            `;
            contenedor.appendChild(experiencia);

            // 1. Agregar evento al checkbox de "Presente Actualmente"
            // CONTROLAR CHECK Y DESHABILITAR FECHA FIN
            const checkActual = experiencia.querySelector(".checkExp");
            const inputFechaFin = experiencia.querySelector(".fechaFinExp");

            checkActual.addEventListener("change", () => {
                if (checkActual.checked) {
                    inputFechaFin.type = "text";
                    inputFechaFin.disabled = true;
                    inputFechaFin.value = "Actualidad";
                } else {
                    inputFechaFin.type = "date";
                    inputFechaFin.disabled = false;
                    inputFechaFin.value = "";
                }
                    guardarExperiencias();
            });

            // 2. Agregar eventos a todos los inputs de esa experiencia
            experiencia.querySelectorAll("input, textarea").forEach(campo => {
                campo.addEventListener("input", () => {
                    guardarExperiencias();
                });
                campo.addEventListener("change", () => {
                    guardarExperiencias();
                });
            });

            // Captura inicial apenas se agrega
            guardarExperiencias();

            // Agrega el evento de eliminar al nuevo botón
            experiencia.querySelector('.btn-eliminar').addEventListener('click', () => {
                experiencia.remove()
                
                guardarExperiencias(); // Guardamos los cambios al eliminar
                
                actualizarTemplate(window.nombreTemplateSeleccionado);
                
                // Verificamos si no quedan más .experiencia-item
                const experienciasRestantes = contenedor.querySelectorAll('.experiencia-item');
                if (experienciasRestantes.length === 0) {
                    // Volvemos a crear y mostrar el texto de "Aún no haz agregado..."
                    textExperiencia = document.createElement('div');
                    textExperiencia.classList.add('cont-text-exp');
                    textExperiencia.id = 'textExperiencia';
                    textExperiencia.innerHTML = `<p class="text-prev-form">No agregaste una experiencia. Haz click en el boton para agregar tu experiencia.</p>`;
                    contenedor.appendChild(textExperiencia);
                }

            });
    });

    function guardarExperiencias() {
        const todasLasExperiencias = document.querySelectorAll(".experiencia-item");

        datosForm.experiencia = Array.from(todasLasExperiencias).map(exp => {
            return {
                puestoExperiencia: exp.querySelector(".puestoExp")?.value.trim() || "",
                empresaExperiencia: exp.querySelector(".empresaExp")?.value.trim() || "",
                fechaInicioExperiencia: exp.querySelector(".fechaInicioExp")?.value || "",
                fechaFinExperiencia: exp.querySelector(".checkExp")?.checked
                    ? "Actualidad"
                    : (exp.querySelector(".fechaFinExp")?.value || ""),
                checkExperiencia: exp.querySelector(".checkExp")?.checked || false,
                tareaDesemExperiencia: exp.querySelector(".tareaDesemExp")?.value.trim() || "",
                contactoRefExperiencia: exp.querySelector(".contactoRefExp")?.value.trim() || ""
            };
        });
    }


});