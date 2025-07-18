document.addEventListener('DOMContentLoaded', () => {
    const vistaPreviaContent = document.getElementById("vista-previa-content");
    const btnVistaPrevia = document.getElementById("btnVistaPrevia");
    const items = document.querySelectorAll('.col-carousel');


    // Variable para guardar el path del template seleccionado por el usuario
    let templateSeleccionado = null;

    // Función reutilizable para cargar un template con animación
    function cargarTemplateConAnimacion(rutaTemplate) {
        vistaPreviaContent.style.opacity = 0;

        setTimeout(() => {
            vistaPreviaContent.innerHTML = "";

            fetch(rutaTemplate)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`No se pudo cargar ${rutaTemplate}`);
                    }
                    return res.text();
                })
                .then(html => {
                    const vistaPreviaContenedor = document.createElement('div');
                    vistaPreviaContenedor.classList.add('vista-previa-container');
                    vistaPreviaContenedor.innerHTML = html;
                    vistaPreviaContent.appendChild(vistaPreviaContenedor);


                    // ✅ Actualizar el template justo después de cargarlo
                        const templateName = rutaTemplate.split('/').pop().split('.')[0];
                        window.nombreTemplateSeleccionado = templateName; // lo guardás globalmente
                        actualizarTemplate(window.nombreTemplateSeleccionado);
                    setTimeout(() => {
                        vistaPreviaContenedor.classList.add('visible');
                        vistaPreviaContent.style.opacity = 1;
                    }, 50);
                })
                .catch(err => {
                    console.error('Error al cargar template:', err);
                    vistaPreviaContent.textContent = "Error al cargar la vista previa.";
                    vistaPreviaContent.style.opacity = 1;
                });

        }, 300);
    }

    // Evento click en ítems del carrusel
    items.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                const src = img.getAttribute('src');
                const fileName = src.split('/').pop();
                const templateName = fileName.split('.')[0];
                const templatePath = `./templates/${templateName}.html`;

                templateSeleccionado = templatePath; // Guarda el template elegido
                cargarTemplateConAnimacion(templateSeleccionado); // Muestra la vista previa animada
            }
        });
    });

    // Evento click en el botón de vista previa
    btnVistaPrevia.addEventListener("click", () => {
        const ruta = templateSeleccionado || './templates/template1.html';
        cargarTemplateConAnimacion(ruta);
    });
});
