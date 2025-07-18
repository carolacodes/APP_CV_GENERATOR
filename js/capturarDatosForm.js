window.datosForm = {
        nombre: "", 
        puesto: "", 
        perfil: "",
        fotoPerfil: "",
        birthdate: "",
        lugarNacimiento: "",
        edad: "",
        nacionalidad: "",
        nroCelular: "",
        correo: "",
        direccion: "",
        infoAdicional: "",
        cartaPresentacion: "",
        experiencia: [], 
        curso: [],
        educacion: [],
        habilidad: [],
}
document.addEventListener('DOMContentLoaded', () => {
    //INFORMACION BASICA
    capturarInput("nombreCompleto", "nombre");
    capturarInput("nombrePuesto", "puesto");
    capturarInput("perfilProfesional", "perfil");
    //INFORMACION PERSONAL
    capturarInput("birthdate", "birthdate")
    capturarInput("lugarNacimiento", "lugarNacimiento")
    capturarInput("edad", "edad")
    capturarInput("nacionalidad", "nacionalidad")
    //INFORMACION CONTACTO
    capturarInput("nroCelular", "nroCelular")
    capturarInput("correo", "correo")
    capturarInput("direccion", "direccion")
    //OTROS DATOS
    capturarInput("informacionAdicional", "infoAdicional")
    //CARTA PRESENTACION
    capturarInput("cartaPresentacionForm", "cartaPresentacion")

    if(datosForm.cartaPresentacion){
        const contCarta = document.getElementById("carta-presentacion")
        contCarta.style.visibility;
        actualizarCartaVista();
    }

    capturarImagenPerfil()
})


        // Función para capturar valor de un input específico
    function capturarInput(idInput, propiedadDestino) {
        const input = document.getElementById(idInput);

        if (input) {
            input.addEventListener("input", () => {
                datosForm[propiedadDestino] = input.value.trim();
                // Si estamos capturando la carta, actualizamos su visibilidad
                if (idInput === "cartaPresentacionForm") {
                    actualizarCartaVista();
                }
            });
        } else {
            console.warn(`No se encontró el input con id: ${idInput}`);
        }
    }

    function actualizarCartaVista(){
        const cartaDiv = document.getElementById("carta-presentacion");
        const cartaTexto = document.getElementById("cartaPresentacionVista");

        if (datosForm.cartaPresentacion.trim() !== "") {
            cartaDiv.classList.remove("invisible"); // Mostrar
            if (cartaTexto) cartaTexto.innerText = datosForm.cartaPresentacion;
        } else {
            cartaDiv.classList.add("invisible"); // Ocultar
            if (cartaTexto) cartaTexto.innerText = "";
        }
    }

//CAPTURAR IMAGEN DE PERFIL
    function capturarImagenPerfil(){
        const inputFile = document.getElementById("perfilFile");
        const imgPreview = document.getElementById("imagen-perfil");

        //imagen por default si no se selecciona ninguna
        const profileDefault = 'img/8608769.png'
        // Establecemos por defecto solo si no hay imagen recortada
        if (!datosForm.fotoPerfil) {
            imgPreview.src = profileDefault;
            datosForm.fotoPerfil = profileDefault;
        }

        inputFile.addEventListener("change", () => {
            const file = inputFile.files[0];

            // Validar que sea una imagen
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    // Mostramos en el cropper, pero no guardamos aún
                    document.getElementById('imagenRecorte').src = e.target.result;
                    document.getElementById('modalRecorte').style.display = "flex";
                };

                reader.readAsDataURL(file); // Convierte la imagen a base64
            } else {
                imgPreview.src = profileDefault
                datosForm.fotoPerfil = profileDefault; // Restaurar en el objeto también
                inputFile.value = ""; // Limpia el input si no es válido
            }
        });
    }

    const MAX_ITEMS_POR_PAGINA = 10;
    // Función para actualizar los datos en el template cargado
    function actualizarTemplate(templateName) {
        //INFORMACION BASICA
        const nombreTemp = document.getElementById(`${templateName}-nombre`);
        const puestoTemp = document.getElementById(`${templateName}-puesto`);
        const perfilTemp = document.getElementById(`${templateName}-perfil`);
        const fotoPerfilTemp = document.getElementById(`${templateName}-foto-perfil`)
        //INFORMACION PERSONAL
        const fechaNacTemp = document.getElementById(`${templateName}-fechaNac`)
        const edadTemp = document.getElementById(`${templateName}-edad`)
        const lugarNacTemp = document.getElementById(`${templateName}-lugarNac`)
        const nacionalidadTemp = document.getElementById(`${templateName}-nacionalidad`)
        //INFORMACION CONTACTO
        const nroCelularTemp = document.getElementById(`${templateName}-nroCelular`)
        const correoTemp = document.getElementById(`${templateName}-correo`)
        const direccionTemp = document.getElementById(`${templateName}-direccion`)
        //INFORMACION ADICIONAL
        const otrosDatosTemp = document. getElementById(`${templateName}-otrosDatos`)
        /*
            EXPERIENCIA LABORAL
            const experienciaContenedor = document.getElementById(`${templateName}-experiencias`);
            EDUCACION
            const educacionContenedor = document.getElementById(`${templateName}-educacion`);
            CURSOS 
            const cursosContenedor = document.getElementById(`${templateName}-cursos`)
            HABILIDAD
            const habilidadContenedor = document.getElementById(`${templateName}-habilidad`);
        */


        //INFORMACION BASICA
        if (nombreTemp) nombreTemp.textContent = datosForm.nombre;
        if (puestoTemp) puestoTemp.textContent = datosForm.puesto;
        if (perfilTemp) perfilTemp.textContent = datosForm.perfil;
        if (fotoPerfilTemp) fotoPerfilTemp.src = datosForm.fotoPerfil;
        //INFORMACION PERSONAL
        if (fechaNacTemp) fechaNacTemp.textContent = datosForm.birthdate;
        if (edadTemp) edadTemp.textContent = datosForm.edad;
        if (lugarNacTemp) lugarNacTemp.textContent = datosForm.lugarNacimiento;
        if (nacionalidadTemp) nacionalidadTemp.textContent = datosForm.nacionalidad;
        //INFORMACION CONTACTO
        if (nroCelularTemp) nroCelularTemp.textContent = datosForm.nroCelular;
        if (correoTemp) correoTemp.textContent = datosForm.correo;
        if (direccionTemp) direccionTemp.textContent = datosForm.direccion;
        //INFORMACION ADICIONAL
        if (otrosDatosTemp) otrosDatosTemp.textContent = datosForm.infoAdicional;


        // 🔄 Paginación para experiencia, educación, cursos y habilidades:
            const secciones = [
                {
                    nombre: "experiencias",
                    datos: datosForm.experiencia,
                    generarHTML: exp => `
                        <h5 class="${templateName}-h5">Experiencia Laboral: <strong class="${templateName}-strong-title">${exp.puestoExperiencia}</strong></h5>
                        <div class="${templateName}-div-exp"><span class="${templateName}-span-exp">${exp.empresaExperiencia}</span>/<span class="${templateName}-span-fecha-exp">${exp.fechaInicioExperiencia} - ${exp.fechaFinExperiencia}</span></div>
                        <ul class="mb-2 ul-exp-${templateName}">
                            <li><span class="${templateName}-span-descrip">Descripción: </span>${exp.tareaDesemExperiencia}</li>
                            <li><span class="${templateName}-span-cont-ref">Contacto de Referencia: </span> <span class="${templateName}-cont-ref">${exp.contactoRefExperiencia}</span></li>
                        </ul>
                        `
                },
                {
                    nombre: "educacion",
                    datos: datosForm.educacion,
                    generarHTML: edu => `
                    <h5 class="${templateName}-h5">Educacion: <strong class="${templateName}-strong-title">${edu.tituloEducacion}</strong>  <span class="${templateName}-span-nivel-edu">(${edu.nivelEducacion})</span></h5>
                        <div class="${templateName}-div-edu">
                            <span class="${templateName}-span-inst-edu">${edu.institucionEducacion}</span> / <span class="${templateName}-span-fecha-edu">${edu.fechaInicioEducacion} - ${edu.fechaFinEducacion}</span>
                        </div>
                    `
                },
                {
                    nombre: "cursos",
                    datos: datosForm.curso,
                    generarHTML: cur => `
                    <h5 class="${templateName}-h5">Curso: <strong class="${templateName}-strong-title">${cur.tituloCurso}</strong></h5>
                    <div class="${templateName}-div-cur">
                        <span class="${templateName}-span-inst-cur">${cur.institucionCurso}</span> / <span class="${templateName}-span-fecha-cur">${cur.fechaInicioCurso} - ${cur.fechaFinCurso}</span>
                    </div>
                    `
                },
                {
                    nombre: "habilidad",
                    datos: datosForm.habilidad,
                    generarHTML: hab => `
                    <h5 class="${templateName}-h5">Habilidad: <strong class="${templateName}-strong-title">${hab.nombreHabilidad}</strong> </h5>
                    <ul class="ul-habi-${templateName}">
                        <li>${hab.descripcionHabilidad}</li>
                    </ul>
                    `
                }
            ];

            let itemsAgregados = 0;
            let paginaActual = templateName;

            let contenedoresPorPagina = {}; // Cache de contenedores por seccion y por pagina

            secciones.forEach(seccion => {
                seccion.datos.forEach(dato => {
                    if (itemsAgregados >= MAX_ITEMS_POR_PAGINA) {
                        paginaActual = crearNuevaPagina(templateName);
                        itemsAgregados = 0;
                    }
                    
                    // Cachear contenedor solo si aún no fue buscado en esta página
                    if (!contenedoresPorPagina[`${paginaActual}-${seccion.nombre}`]) {
                        contenedoresPorPagina[`${paginaActual}-${seccion.nombre}`] =
                            document.getElementById(`${paginaActual}-${seccion.nombre}`);

                        // Si es una nueva página, asegurarse que esté limpia
                        if (itemsAgregados === 0 && contenedoresPorPagina[`${paginaActual}-${seccion.nombre}`]) {
                            contenedoresPorPagina[`${paginaActual}-${seccion.nombre}`].innerHTML = "";
                        }
                    }

                    const contenedor = contenedoresPorPagina[`${paginaActual}-${seccion.nombre}`];
                    if (!contenedor) return;

                    contenedor.insertAdjacentHTML("beforeend", seccion.generarHTML(dato));
                    itemsAgregados++;
                });
                
            });

            

        /*    
        //EXPERIENCIA LABORAL
        if (experienciaContenedor) {
            // Limpiamos el contenedor primero
            experienciaContenedor.innerHTML = "";

            // Recorremos cada experiencia y la insertamos
            datosForm.experiencia.forEach((exp) => {
                const experienciaHTML = `
                    <ul class="mb-2 ul-exp-template1">
                        <li><strong>Puesto: </strong>${exp.puestoExperiencia}</li>
                        <li><strong>Empresa: </strong>${exp.empresaExperiencia}</li>
                        <li>${exp.fechaInicioExperiencia} - ${exp.fechaFinExperiencia}</li>
                        <li><strong>Descripción: </strong>${exp.tareaDesemExperiencia}</li>
                        <li><strong>Contacto de Referencia: </strong>${exp.contactoRefExperiencia}</li>
                    </ul>
                `;
                experienciaContenedor.insertAdjacentHTML("beforeend", experienciaHTML);
            });
        }

        //EDUCACION
        if(educacionContenedor){
            educacionContenedor.innerHTML = "";
            datosForm.educacion.forEach((edu) => {
                const educacionHTML = `
                        <ul class="mb-2 ul-edu-template1">
                            <li><strong>Nivel: </strong>${edu.nivelEducacion}</li>
                            <li><strong>Institución: </strong>${edu.institucionEducacion}</li>
                            <li><strong>Título: </strong>${edu.tituloEducacion}</li>
                            <li>${edu.fechaInicioEducacion} - ${edu.fechaFinEducacion}</li>
                        </ul>
                `;
                educacionContenedor.insertAdjacentHTML("beforeend", educacionHTML);
            });
        }


        //CURSOS
        if(cursosContenedor){
            cursosContenedor.innerHTML = ""; // Limpiar el contenedor
            datosForm.curso.forEach((cur) => {
                const cursoHTML = `
                        <ul class="mb-2 ul-curso-template1">
                            <li><strong>Título: </strong><span>${cur.tituloCurso}</span></li>
                            <li><strong>Institución: </strong><span>${cur.institucionCurso}</span></li>
                            <li>${cur.fechaInicioCurso} - ${cur.fechaFinCurso}</li>
                        </ul>
                `;
                cursosContenedor.insertAdjacentHTML("beforeend", cursoHTML);
            })
        }

        //HABILIDAD
        if(habilidadContenedor){
            habilidadContenedor.innerHTML = ""; // Limpiar el contenedor
            datosForm.habilidad.forEach((hab) => {
                const habilidadHTML = `
                        <ul>
                            <li><strong>${hab.nombreHabilidad}: </strong><span>${hab.descripcionHabilidad}</span></li>
                        </ul>
            `;
            habilidadContenedor.insertAdjacentHTML("beforeend", habilidadHTML);
            })
        }
        */
        //verificarYAgregarNuevaPagina(templateName);
    }

    function crearNuevaPagina(templateName) {
        const templateActual = document.getElementById(`${templateName}-container`);
        const nuevoIdBase = `${templateName}-pagina-extra-${Date.now()}`;
        const nuevoId = `${nuevoIdBase}-container`;

        const nuevoTemplate = templateActual.cloneNode(true);
        nuevoTemplate.id = nuevoId;

        // Cambiar todos los IDs internos
        const elementosConId = nuevoTemplate.querySelectorAll("[id]");
        elementosConId.forEach(el => {
            const idAntiguo = el.id;
            const nuevoIdInterno = idAntiguo.replace(templateName, nuevoIdBase);
            el.id = nuevoIdInterno;
        });

        // Limpiar las secciones dinámicas (pero solo en las nuevas páginas)
        const camposADepurar = nuevoTemplate.querySelectorAll(`#${nuevoIdBase}-experiencias, #${nuevoIdBase}-educacion, #${nuevoIdBase}-cursos, #${nuevoIdBase}-habilidad`);
        camposADepurar.forEach(campo => campo.innerHTML = "");

        // Limpiar info fija (nombre, contacto, etc.)
        const infoFija = nuevoTemplate.querySelector(`[class*='${templateName}-colum-left']`);
        if (infoFija) {
            const computedStyle = window.getComputedStyle(infoFija);
            const styleInfoFija = computedStyle.backgroundColor;
            infoFija.innerHTML = "";
            infoFija.style.backgroundColor = styleInfoFija; // Restaurar color original
        }
        /*
        const infoFija = nuevoTemplate.querySelector(".temp1-colum-left");
        if (infoFija) {
            infoFija.innerHTML = "";
            infoFija.style.backgroundColor = "#275077"; // Restaurar color de fondo
        } // Solo se deja en la 1ra página
        */
        document.getElementById("vista-previa-content").appendChild(nuevoTemplate);
        console.log(`Nueva página agregada: ${nuevoIdBase}`);
        return nuevoIdBase;
    }



/*
function verificarYAgregarNuevaPagina(templateName) {
    const templateActual = document.getElementById(`${templateName}-container`); // contenedor base del template
    const alturaMaxima = 1300;
    
    if (!templateActual) {
        console.warn(`No se encontró el contenedor con id ${templateName}-container`);
        return;
    }
    
    const altura = templateActual.scrollHeight; // Altura total del contenido del template
    console.log(`Altura actual del template: ${altura}px`);

    if (altura >= alturaMaxima) {
        // Crear un nuevo ID para el duplicado
        const nuevoId = `${templateName}-pagina-extra-${Date.now()}`; // ID único usando timestamp
        //"template1-pagina-extra-1720803140000"

        // Clonar el template actual
        const nuevoTemplate = templateActual.cloneNode(true); // clona todo el nodo y su contenido
        nuevoTemplate.id = nuevoId;

        // Actualizar los IDs internos del nuevo template para que no se repitan
        const elementosConId = nuevoTemplate.querySelectorAll("[id]");
        elementosConId.forEach(el => {
            const idAntiguo = el.id;
            const nuevoIdInterno = idAntiguo.replace(templateName, nuevoId);
            el.id = nuevoIdInterno;
        });

        // Agregar el nuevo template debajo del actual
        const contenedorPadre = document.getElementById("vista-previa-content");
        contenedorPadre.appendChild(nuevoTemplate);

        console.log(`Se agregó una nueva página: ${nuevoId}`);
    }
}
*/
// Función que actualiza el DOM del template si ya está cargado
/*
function actualizarTemplate() {
    const items = document.querySelectorAll('.col-carousel');
    
    // Evento click en ítems del carrusel
    items.forEach(item => {
        item.addEventListener('click', () => {
            var templateSelect //= //el tampletae que se seelecciona
            const img = item.querySelector('img');
            if (img) {
                const src = img.getAttribute('src');
                const fileName = src.split('/').pop();
                const templateName = fileName.split('.')[0];
                templateSelect = templateName;
                
                const nombreTemp = document.querySelector(`#${templateSelect}-nombre`);
                const puestoTemp = document.querySelector(`#${templateSelect}-puesto`);
                const perfilTemp = document.querySelector(`#${templateSelect}-perfil`);

                if (nombreTemp) nombreTemp.textContent = datosUsuario.nombre;
                if (puestoTemp) puestoTemp.textContent = datosUsuario.puesto;
                if (perfilTemp) perfilTemp.textContent = datosUsuario.perfil;
            }
        });
    });

}
*/