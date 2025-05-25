document.addEventListener('DOMContentLoaded', () => {

    // 1. Efeito do Cabeçalho Fixo ao Rolar (existente)
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Animação de Fade-in nos Elementos ao Rolar (existente)
    const fadeElems = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeElems.forEach(elem => {
        observer.observe(elem);
    });

    // 3. FUNCIONALIDADE DO MENU HAMBÚRGUER (NOVO)
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerActions = document.querySelector('.header-actions');
    const navLinks = document.querySelectorAll('.main-nav a');

    navToggle.addEventListener('click', () => {
        // Alterna a classe 'active' para mostrar/esconder o menu
        mainNav.classList.toggle('active');
        headerActions.classList.toggle('active'); // Mostra as ações também

        // Muda o ícone de hambúrguer para 'X' e vice-versa
        const icon = navToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Impede o scroll do corpo da página quando o menu está aberto
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Permite o scroll novamente
        }
    });
    
    // Fecha o menu ao clicar em um link (útil para páginas de uma só seção)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                headerActions.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });
});