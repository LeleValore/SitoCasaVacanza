// Animazione "reveal" allo scroll per card e blocchi di contenuto
document.addEventListener('DOMContentLoaded', function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll(
        '.card, .section-header, .feature-block, .attraction-card, .info-card, .highlight-panel, .booking-options .btn-partner, .video-tour-section'
    );

    if (prefersReducedMotion || targets.length === 0) return;

    targets.forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i % 6, 5) * 70 + 'ms';
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
});
