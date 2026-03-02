// Hamburger Menu Navigation
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    // Toggle menu
    if (hamburger) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Aggiorna aria-expanded
            const isExpanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Chiudi menu quando clicchi un link
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Chiudi menu quando clicchi fuori (ma non quando clicchi dentro la mobile-menu)
    document.addEventListener('click', function (event) {
        const isClickInside = (event.target.closest('nav') || event.target.closest('.hamburger') || event.target.closest('.mobile-menu'));
        if (!isClickInside && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Supporto tastiera (ESC chiude il menu)
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});
