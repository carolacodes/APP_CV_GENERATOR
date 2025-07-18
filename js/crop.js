let cropper;
const inputFile = document.getElementById('perfilFile'); //obtenemos el input de tipo file con la foto
const imagenPerfil = document.getElementById('imagen-perfil'); //obtenemos la etiqueta img de perfil
const modal = document.getElementById('modalRecorte'); //obtenemos cont de modal p/ recorte
const imagenRecorte = document.getElementById('imagenRecorte'); //obtenemos et img p/ img que se va a recortar

//escuchamos el evento change del input file
inputFile.addEventListener('change', function (e) {
    const file = e.target.files[0]; //obtenemos el primer archivo seleccionado
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        imagenRecorte.src = event.target.result; //cargamos la img en la etiqueta img del modal
        modal.style.display = "flex"; //mostramos el modal de recorte

        // Esperar a que cargue la imagen
        imagenRecorte.onload = function () {
            if (cropper) cropper.destroy(); //si hay un cropper existente, lo destruimos
            cropper = new Cropper(imagenRecorte, { //inicializamos el cropper
                aspectRatio: 1, // cuadrado
                viewMode: 1
            });
        };
    };
    reader.readAsDataURL(file); //leemos el archivo como una URL de datos
});

// Confirmar recorte
document.getElementById('btnConfirmarRecorte').addEventListener('click', () => {
    const canvas = cropper.getCroppedCanvas({ //creamos un canvas (captura) del recorte
        width: 600, // o 600
        height: 600
    });
    const base64 = canvas.toDataURL("image/png"); //convertimos el canvas a una imagen en base64

    imagenPerfil.src = base64; //actualizamos la img de perfil
    window.datosForm.fotoPerfil = base64; //actualizamos el objeto de datos del formulario

    modal.style.display = "none"; //ocultamos el modal de recorte
    cropper.destroy(); //destruimos el cropper
});

// Cancelar recorte
document.getElementById('btnCancelarRecorte').addEventListener('click', () => {
    modal.style.display = "none"; //ocultamos el modal de recorte
    cropper.destroy(); //destruimos el cropper
});
