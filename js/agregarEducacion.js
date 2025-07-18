document.addEventListener('DOMContentLoaded', () => {
const contenedor = document.getElementById('contenedorEducacion');
const btnAgregar = document.getElementById('btnAgregarEducacion');
let textEducacion = document.getElementById('textEducacion');

btnAgregar.addEventListener('click', () => {
    textEducacion.remove()
    const educacion = document.createElement('div')
    educacion.classList.add('educacion-item', 'mb-4');
    educacion.innerHTML = `
        <div class="row mt-4">
                                        <div class="col text-end">
                                            <button type="button" class="btn btn-eliminar"><i class="bi bi-trash3 icon-trash"></i></button>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col mb-3">
                                            <label for="nivelEducacion" class="form-label">Nivel de Educación</label>
                                            <input type="text" class="form-control mt-1 nivelEdu" id="nivelEducacion" aria-describedby="nivelEducacionHelp" maxlength="30">
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col mb-3">
                                            <label for="institucion" class="form-label">Institución</label>
                                            <input type="text" class="form-control mt-1 instEdu" id="institucion" aria-describedby="institucionHelp" maxlength="40">
                                        </div>
                                        <div class="col mb-3">
                                            <label for="titulo" class="form-label">Título</label>
                                            <input type="text" class="form-control mt-1 tituloEdu" id="titulo" aria-describedby="tituloHelp" maxlength="40">
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col mb-3">
                                            <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
                                            <input type="date" class="form-control mt-1 fechaInicioEdu" id="fechaInicio" name="fechaInicio">
                                        </div>
                                        <div class="col mb-3">
                                            <label for="fechaFin" class="form-label">Fecha de Fin</label>
                                            <input type="date" class="form-control mt-1 fechaFinEdu" id="fechaFin" name="fechaFin">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col mb-3">
                                            <div class="form-check">
                                                <input class="form-check-input check-edu" type="checkbox" value="" id="checkDefault">
                                                <label class="form-check-label" for="checkDefault">
                                                    Presente Actualmente
                                                </label>
                                            </div>
                                        </div>
                                    </div>
    `;
    contenedor.appendChild(educacion);

    // 1. Agregar evento al checkbox de "Presente Actualmente"
    // CONTROLAR CHECK Y DESHABILITAR FECHA FIN
            const checkActual = educacion.querySelector(".check-edu");
            const inputFechaFin = educacion.querySelector(".fechaFinEdu");

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
                guardarEducacion();
            });

            // 2. Agregar eventos a todos los inputs de esa experiencia
            educacion.querySelectorAll("input").forEach(campo => {
                campo.addEventListener("input", () => {
                    guardarEducacion();
                });
                campo.addEventListener("change", () => {
                    guardarEducacion();
                });
            });

            // Captura inicial apenas se agrega
            guardarEducacion();


    educacion.querySelector('.btn-eliminar').addEventListener('click', () => {
        educacion.remove();
        guardarEducacion(); // Guardamos los cambios al eliminar

        actualizarTemplate(window.nombreTemplateSeleccionado);

    const educacionItems = document.querySelectorAll('.educacion-item');
    if(educacionItems.length === 0){
        // Volvemos a crear y mostrar el texto de "Aún no haz agregado..."
            textEducacion = document.createElement('div');
            textEducacion.classList.add('cont-text-exp');
            textEducacion.id = 'textEducacion';
            textEducacion.innerHTML = `<p class="text-prev-form">No agregaste una educación. Haz click en el boton para agregar tu educación.</p>`;
            contenedor.appendChild(textEducacion);
    }
    });
})

    function guardarEducacion() {
            const todosLosEducacion = document.querySelectorAll(".educacion-item");

            datosForm.educacion = Array.from(todosLosEducacion).map(educacion => {
                return {
                    nivelEducacion: educacion.querySelector(".nivelEdu")?.value.trim() || "",
                    tituloEducacion: educacion.querySelector(".tituloEdu")?.value.trim() || "",
                    institucionEducacion: educacion.querySelector(".instEdu")?.value.trim() || "",
                    fechaInicioEducacion: educacion.querySelector(".fechaInicioEdu")?.value || "",
                    fechaFinEducacion: educacion.querySelector(".check-edu")?.checked
                        ? "Actualidad"
                        : (educacion.querySelector(".fechaFinEdu")?.value || ""),
                    checkCurso: educacion.querySelector(".check-edu")?.checked || false
                };
                
            });
    }


})