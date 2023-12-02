let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
let intervalId;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function changeSlide(n) {
    currentIndex = (currentIndex + n + slides.length) % slides.length;
    showSlide(currentIndex);
    resetInterval();
}

function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(() => changeSlide(1), 3000);
}

// Initial display
showSlide(currentIndex);

// Auto play
intervalId = setInterval(() => changeSlide(1), 3000); // 3000 milliseconds (3 seconds) interval for auto play
