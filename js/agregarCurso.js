document.addEventListener('DOMContentLoaded', () => {
const contenedor = document.getElementById('contenedorCurso');
const btnAgregar = document.getElementById('btnAgregarCurso');
let textCurso = document.getElementById('textCurso');

btnAgregar.addEventListener('click', () => {
    textCurso.remove()
    const curso = document.createElement('div')
    curso.classList.add('curso-item', 'mb-4');
    curso.innerHTML = `
        <div class="row mt-4">
                                        <div class="col text-end">
                                            <button type="button" class="btn btn-eliminar"><i class="bi bi-trash3 icon-trash"></i></button>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col mb-3">
                                            <label for="tituloCurso" class="form-label">Título de Curso</label>
                                            <input type="text" class="form-control mt-1 titulo-curso" id="tituloCurso" aria-describedby="tituloCursoHelp" maxlength="30">
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col mb-3">
                                            <label for="institucionCurso" class="form-label">Institución</label>
                                            <input type="text" class="form-control mt-1 inst-curso" id="institucionCurso" aria-describedby="institucionCursoHelp" maxlength="30">
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col mb-3">
                                            <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
                                            <input type="date" class="form-control mt-1 fechaInicioCurso" id="fechaInicio" name="fechaInicio">
                                        </div>
                                        <div class="col mb-3">
                                            <label for="fechaFin" class="form-label">Fecha de Fin</label>
                                            <input type="date" class="form-control mt-1 fechaFinCurso" id="fechaFin" name="fechaFin">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col mb-3">
                                            <div class="form-check">
                                                <input class="form-check-input check-curso" type="checkbox" value="" id="checkDefault">
                                                <label class="form-check-label" for="checkDefault">
                                                    Presente Actualmente
                                                </label>
                                            </div>
                                        </div>
                                    </div>
    `;
    contenedor.appendChild(curso);

     // 1. Agregar evento al checkbox de "Presente Actualmente"
            // CONTROLAR CHECK Y DESHABILITAR FECHA FIN
            const checkActual = curso.querySelector(".check-curso");
            const inputFechaFin = curso.querySelector(".fechaFinCurso");

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
                guardarCurso();
            });

            // 2. Agregar eventos a todos los inputs de esa experiencia
            curso.querySelectorAll("input").forEach(campo => {
                campo.addEventListener("input", () => {
                    guardarCurso();
                });
                campo.addEventListener("change", () => {
                    guardarCurso();
                });
            });

            // Captura inicial apenas se agrega
            guardarCurso();

            curso.querySelector('.btn-eliminar').addEventListener('click', () => {
                curso.remove();
                guardarCurso(); // Guardamos los cambios al eliminar
                
                actualizarTemplate(window.nombreTemplateSeleccionado);

                const cursoItems = document.querySelectorAll('.curso-item');
                if(cursoItems.length === 0){
                    // Volvemos a crear y mostrar el texto de "Aún no haz agregado..."
                        textCurso = document.createElement('div');
                        textCurso.classList.add('cont-text-exp');
                        textCurso.id = 'textCurso';
                        textCurso.innerHTML = `<p class="text-prev-form">No agregaste un curso. Haz click en el boton para agregar tu curso.</p>`;
                        contenedor.appendChild(textCurso);
                }
            });
})


    function guardarCurso() {
            const todosLosCursos = document.querySelectorAll(".curso-item");

            datosForm.curso = Array.from(todosLosCursos).map(curso => {
                return {
                    tituloCurso: curso.querySelector(".titulo-curso")?.value.trim() || "",
                    institucionCurso: curso.querySelector(".inst-curso")?.value.trim() || "",
                    fechaInicioCurso: curso.querySelector(".fechaInicioCurso")?.value || "",
                    fechaFinCurso: curso.querySelector(".check-curso")?.checked
                        ? "Actualidad"
                        : (curso.querySelector(".fechaFinCurso")?.value || ""),
                    checkCurso: curso.querySelector(".check-curso")?.checked || false
                };
            });
    }
})