// main.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica para el menú móvil (sin dependencias)
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        menuOpenIcon.classList.toggle('hidden');
        menuCloseIcon.classList.toggle('hidden');
        // Evita el scroll del body cuando el menú está abierto
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    };

    menuBtn.addEventListener('click', toggleMenu);
    
    // Cierra el menú al hacer clic en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 2. Lógica para el envío del formulario con Formspree
    const contactForm = document.getElementById('contact-form');
    const formSuccessMessage = document.getElementById('form-success');

    async function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formSuccessMessage.classList.remove('hidden');
                form.reset();
                setTimeout(() => {
                    formSuccessMessage.classList.add('hidden');
                }, 5000);
            } else {
                // Manejar errores del servidor
                alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            // Manejar errores de red
            alert('Hubo un error de red. Por favor, revisa tu conexión.');
            console.error('Form submission error:', error);
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // 3. Lógica para animaciones al hacer scroll (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animated');
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores antiguos: simplemente muestra los elementos
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }
});
