// Carosello galleria: scorrimento nativo (swipe/drag) + frecce, pallini e autoplay
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsWrap = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const total = slides.length;

    if (!track || total === 0) return;

    let currentIndex = 0;
    let dots = [];
    let autoplayId = null;
    let resumeTimeout = null;

    if (dotsWrap) {
        slides.forEach(function (_, i) {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', 'Vai alla foto ' + (i + 1));
            dot.addEventListener('click', function () {
                goToSlide(i);
                pauseThenResume();
            });
            dotsWrap.appendChild(dot);
        });
        dots = Array.from(dotsWrap.children);
        dots[0].classList.add('active');
    }

    function setActive(index) {
        currentIndex = index;
        dots.forEach(function (dot, i) { dot.classList.toggle('active', i === index); });
    }

    function goToSlide(index) {
        const i = (index + total) % total;
        slides[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }

    // Rileva la slide visibile sia con i pulsanti che con lo swipe manuale
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            const index = Array.prototype.indexOf.call(slides, entry.target);
            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                setActive(index);
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { root: track, threshold: [0, 0.6, 1] });

    slides.forEach(function (slide) { observer.observe(slide); });

    function startAutoplay() {
        clearInterval(autoplayId);
        autoplayId = setInterval(function () { goToSlide(currentIndex + 1); }, 4500);
    }

    function pauseThenResume() {
        clearInterval(autoplayId);
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(startAutoplay, 6000);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(currentIndex - 1); pauseThenResume(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(currentIndex + 1); pauseThenResume(); });

    // Trascinamento con il mouse su desktop (touch usa lo scroll nativo)
    let isDragging = false;
    let dragStartX = 0;
    let scrollStart = 0;

    track.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse') return;
        isDragging = true;
        dragStartX = e.clientX;
        scrollStart = track.scrollLeft;
        clearInterval(autoplayId);
    });

    track.addEventListener('pointermove', function (e) {
        if (!isDragging || e.pointerType !== 'mouse') return;
        track.scrollLeft = scrollStart - (e.clientX - dragStartX);
    });

    window.addEventListener('pointerup', function () {
        if (isDragging) {
            isDragging = false;
            pauseThenResume();
        }
    });

    container.addEventListener('touchstart', function () { clearInterval(autoplayId); }, { passive: true });
    container.addEventListener('touchend', pauseThenResume, { passive: true });
    container.addEventListener('mouseenter', function () { clearInterval(autoplayId); });
    container.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
});
