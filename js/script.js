// Carosello Automatico con dissolvenza
let currentImage = 0;
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;

function showNextImage() {
    // Nascondi immagine attuale (rimuovi classe active)
    images[currentImage].classList.remove('active');

    // Passa alla prossima immagine (con reset a 0)
    currentImage = (currentImage + 1) % totalImages;

    // Mostra la nuova immagine (aggiungi classe active)
    images[currentImage].classList.add('active');
}

// Cambia immagine ogni 4 secondi (4000ms)
if (totalImages > 0) {
    setInterval(showNextImage, 4000);
}