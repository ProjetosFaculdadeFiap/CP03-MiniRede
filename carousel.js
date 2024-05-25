function showSlide(carousel, index) {
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const carouselInner = carousel.querySelector('.carousel-inner');

    if (index >= totalSlides) {
        index = 0;
    } else if (index < 0) {
        index = totalSlides - 1;
    }

    carousel.dataset.currentIndex = index;
    const offset = -index * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

function nextSlide(button) {
    const carousel = button.closest('.carousel');
    let currentIndex = parseInt(carousel.dataset.currentIndex || 0);
    showSlide(carousel, currentIndex + 1);
}

function prevSlide(button) {
    const carousel = button.closest('.carousel');
    let currentIndex = parseInt(carousel.dataset.currentIndex || 0);
    showSlide(carousel, currentIndex - 1);
}

// Iniciar os carouselssss com o primeiro slide
document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.dataset.currentIndex = 0;
    showSlide(carousel, 0);
});