document.addEventListener('DOMContentLoaded', () => {

    // 1. Efeito do Cabeçalho Fixo ao Rolar
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Animação de Fade-in nos Elementos ao Rolar
    const fadeElems = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // usa o viewport
        rootMargin: '0px',
        threshold: 0.1 // O elemento é considerado visível quando 10% dele está na tela
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe quando o elemento entra na viewport
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                
                // Para de observar o elemento uma vez que ele já ficou visível
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });

});