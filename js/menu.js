// Hamburger Menu Navigation
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    // Nota: blocchiamo lo scroll con "overflow:hidden" su <html> (classe .menu-open)
    // invece che con "position:fixed" sul body, perché js/translate.js forza
    // periodicamente body.style.position/top per nascondere la barra di Google Translate.
    function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.documentElement.classList.add('menu-open');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.documentElement.classList.remove('menu-open');
    }

    // Toggle menu
    if (hamburger) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Chiudi menu quando clicchi un link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Chiudi menu quando clicchi fuori (ma non quando clicchi dentro la mobile-menu)
    document.addEventListener('click', function (event) {
        const isClickInside = (event.target.closest('nav') || event.target.closest('.hamburger') || event.target.closest('.mobile-menu'));
        if (!isClickInside && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Supporto tastiera (ESC chiude il menu)
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Header trasparente in cima, solido dopo lo scroll (solo home page)
    const header = document.querySelector('header:not(.internal)');
    if (header) {
        const applyScrollState = function () {
            header.classList.toggle('is-scrolled', window.scrollY > window.innerHeight * 0.75);
        };
        applyScrollState();
        window.addEventListener('scroll', applyScrollState, { passive: true });
    }
});
