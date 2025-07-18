document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorHabilidad');
    const btnAgregar = document.getElementById('btnAgregarHabilidad');
    let textHabilidad = document.getElementById('textHabilidad');

    btnAgregar.addEventListener('click', () => {
        textHabilidad.remove()
        const habilidad = document.createElement('div')
        habilidad.classList.add('habilidad-item', 'mb-4');
        habilidad.innerHTML = `
            <div class="row mt-4">
                <div class="col text-end">
                    <button type="button" class="btn btn-eliminar"><i class="bi bi-trash3 icon-trash"></i></button>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col mb-3">
                    <label for="nombreHabilidad" class="form-label">Nombre de Habilidad</label>
                    <input type="text" class="form-control mt-1 nombreHabilidad" id="nombreHabilidad" aria-describedby="nombreHabilidadHelp" maxlength="30">
                </div>
            </div>
            <div class="row mt-4">
                <div class="col mb-3">
                    <label for="habilidadDescripcion" class="form-label">Breve Descripcion</label>
                    <textarea class="form-control descripcionHabilidad" id="habilidadDescripcion" rows="2" maxlength="150"></textarea>
                </div>
            </div>
        `;
        contenedor.appendChild(habilidad);

        // 2. Agregar eventos a todos los inputs de esa experiencia
            habilidad.querySelectorAll("input, textarea").forEach(campo => {
                campo.addEventListener("input", () => {
                    guardarHabilidad();
                });
                campo.addEventListener("change", () => {
                    guardarHabilidad();
                });
            });

            // Captura inicial apenas se agrega
            guardarHabilidad();

        habilidad.querySelector('.btn-eliminar').addEventListener('click', () => {
            habilidad.remove();
            guardarHabilidad();
            actualizarTemplate(window.nombreTemplateSeleccionado);
            const habilidadItems = document.querySelectorAll('.habilidad-item');
            if(habilidadItems.length === 0){
                // Volvemos a crear y mostrar el texto de "Aún no haz agregado..."
                    textHabilidad = document.createElement('div');
                    textHabilidad.classList.add('cont-text-exp');
                    textHabilidad.id = 'textHabilidad';
                    textHabilidad.innerHTML = `<p class="text-prev-form">No agregaste un Habilidad. Haz click en el boton para agregar tu Habilidad. De (4-7) habilidades.</p>`;
                    contenedor.appendChild(textHabilidad);
                    btnAgregar.disabled = false;
            } if (habilidadItems.length < 7){
                btnAgregar.disabled = false;
            }

        });
    
    const habilidadItems = document.querySelectorAll('.habilidad-item');
    if (habilidadItems.length >= 7) {
        btnAgregar.disabled = true;
    }
})
    function guardarHabilidad() {
        const todasLasHabilidades = document.querySelectorAll(".habilidad-item");
        datosForm.habilidad = Array.from(todasLasHabilidades).map(habilidad => {
            return {
                nombreHabilidad: habilidad.querySelector(".nombreHabilidad").value,
                descripcionHabilidad: habilidad.querySelector(".descripcionHabilidad").value
            };
        });
    }
})
