document.addEventListener("DOMContentLoaded", () => {
    const verseContainers = document.querySelectorAll('.verse-container');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function toggleHoverClass() {
        verseContainers.forEach(container => {
            if (isElementInViewport(container)) {
                container.classList.add('hover');
            } else {
                container.classList.remove('hover');
            }
        });
    }

    // Call the function once to check the initial state
    toggleHoverClass();

    // Add scroll event listener
    window.addEventListener('scroll', toggleHoverClass);
});


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.nav-button');
    const contents = document.querySelectorAll('.content');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove a classe 'active' de todos os botões
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe 'active' ao botão clicado
            this.classList.add('active');

            contents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active');
                    const firstVerseContainer = content.querySelector('.div');
                    if (firstVerseContainer) {
                        firstVerseContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Mostrar o primeiro conteúdo por padrão e ativar o primeiro botão
    contents[0].classList.add('active');
    buttons[0].classList.add('active');
});

//-----------PWA------------------- ServiceWorker---------------------

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/projetos/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.log('Falha ao registrar o Service Worker:', error);
        });
    });
  }

  