/*
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btnDescargarPDF").addEventListener("click", async function () {
        const { jsPDF } = window.jspdf;
        const paginas = document.querySelectorAll(".pagina-cv"); // Cada hoja
        const carta = document.getElementById("carta-presentacion");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        for (let i = 0; i < paginas.length; i++) {
            const canvas = await html2canvas(paginas[i], {
                scale: 2,
                useCORS: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: paginas[i].scrollWidth,
                windowHeight: paginas[i].scrollHeight
            });

            const imgData = canvas.toDataURL("image/png");
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (i !== 0) pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        }

        // Si hay carta de presentación visible
        if (!carta.classList.contains("invisible")) {
            const canvasCarta = await html2canvas(carta, {
                scale: 2,
                useCORS: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: carta.scrollWidth,
                windowHeight: carta.scrollHeight
            });

            const imgCarta = canvasCarta.toDataURL("image/png");
            pdf.addPage();
            const cartaWidth = pageWidth - 40;
            const cartaHeight = (canvasCarta.height * cartaWidth) / canvasCarta.width;
            const cartaXPos = (pageWidth - cartaWidth) / 2;
            pdf.addImage(imgCarta, "PNG", cartaXPos, 20, cartaWidth, cartaHeight);
        }

        pdf.save("cv.pdf");
    });
});
*/

//CASO MULTIPAGINA
    document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btnDescargarPDF").addEventListener("click", async function () {
        const { jsPDF } = window.jspdf;
        const paginas = document.querySelectorAll(".pagina-cv"); // Cada hoja
        const carta = document.getElementById("carta-presentacion");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        for (let i = 0; i < paginas.length; i++) {
            const canvas = await html2canvas(paginas[i], {
                scale: 2,
                useCORS: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: paginas[i].scrollWidth,
                windowHeight: paginas[i].scrollHeight
            });

            const imgData = canvas.toDataURL("image/png");
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (i !== 0) pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        }

        // Si hay carta de presentación visible
        if (!carta.classList.contains("invisible")) {
            const canvasCarta = await html2canvas(carta, {
                scale: 2,
                useCORS: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: carta.scrollWidth,
                windowHeight: carta.scrollHeight
            });

            const imgCarta = canvasCarta.toDataURL("image/png");
            pdf.addPage();
            const cartaWidth = pageWidth - 40;
            const cartaHeight = (canvasCarta.height * cartaWidth) / canvasCarta.width;
            const cartaXPos = (pageWidth - cartaWidth) / 2;
            pdf.addImage(imgCarta, "PNG", cartaXPos, 20, cartaWidth, cartaHeight);
        }

        pdf.save("cv.pdf");
    });
});

//OPCION 1
/*
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btnDescargarPDF").addEventListener("click", async function () {
        const { jsPDF } = window.jspdf;
        const contenido = document.getElementById("vista-previa-content");
        const contenidoCarta = document.getElementById("carta-presentacion");
        
        // Scroll al inicio para evitar problemas de render
        window.scrollTo(0, 0);

        try {
            // Configuración común para html2canvas
            const options = {
                scale: 2,
                useCORS: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: contenido.scrollWidth,
                windowHeight: contenido.scrollHeight
            };

            // 1. Generar el CV
            const canvasCv = await html2canvas(contenido, options);
            const imgCv = canvasCv.toDataURL("image/png");
            
            // Crear PDF en formato A4
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });
            
            // Calcular dimensiones para centrar el CV en A4 A4 (210x297mm).
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth; // Ancho completo de la página A4 (210mm)
            const imgHeight = (canvasCv.height * imgWidth) / canvasCv.width;
            
            // Agregar CV al PDF
            pdf.addImage(imgCv, "PNG", 0, 0, imgWidth, imgHeight);
            
            // Verificar si necesita página adicional para CV
            let currentHeight = 10 + imgHeight;
            if (currentHeight > pageHeight) {
                pdf.addPage();
                currentHeight = 10;
            }
            
            // 2. Generar carta de presentación si es visible
            if (!contenidoCarta.classList.contains("invisible")) {
                const canvasCarta = await html2canvas(contenidoCarta, {
                    ...options,
                    windowWidth: contenidoCarta.scrollWidth,
                    windowHeight: contenidoCarta.scrollHeight
                });
                
                const imgCarta = canvasCarta.toDataURL("image/png");
                
                // Calcular dimensiones para centrar la carta en A4
                const cartaWidth = pageWidth - 40; // Margen más grande
                const cartaHeight = (canvasCarta.height * cartaWidth) / canvasCarta.width;
                
                // Agregar nueva página si es necesario
                if (currentHeight + cartaHeight > pageHeight) {
                    pdf.addPage();
                    currentHeight = 10;
                }
                
                // Centrar horizontalmente la carta
                const xPos = (pageWidth - cartaWidth) / 2;
                pdf.addImage(imgCarta, "PNG", xPos, currentHeight, cartaWidth, cartaHeight);
            }
            
            // Descargar PDF
            pdf.save("cv.pdf");
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    });
});
*/

