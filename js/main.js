//Menu Responsivo
        function toggleMenu() {
            let menu = document.querySelector('.menu-lateral');
            let escurecer = document.querySelector('.container-menu')
            let botao = document.querySelector('.abrir-menu');
            let carrossel = document.querySelector(".carousel");
            let video = document.querySelector('.video-item');
            
            if(menu.style.display == "flex"){
                menu.style.display = "none";
                botao.style.transform = "rotate(0)";
                escurecer.style.display = "none";
                document.body.style.overflow = 'auto';
                carrossel.style.zIndex = '100';
                video.style.zIndex = '100';
            }
            
            else{
                menu.style.display = "flex";
                botao.style.transform = "rotate(90deg)";
                escurecer.style.display = "block"
                document.body.style.overflow = 'hidden';
                carrossel.style.zIndex = '-1';
                video.style.zIndex = '-1';
            }    
        }

        let menu = document.querySelector('.menu-lateral');
        let escurecer = document.querySelector('.container-menu');
        let botao = document.querySelector('.abrir-menu');
        let carrossel = document.querySelector(".carousel");
        let video = document.querySelector('.video-item');

        document.onclick = function(event) {
            if (event.target == escurecer) {
                menu.style.display = "none";
                botao.style.transform = "rotate(0)";
                escurecer.style.display = "none";
                document.body.style.overflow = 'auto';
                carrossel.style.zIndex = '100';
                video.style.zIndex = '100';
            }
        }


//Carrossel
        let currentSlide = 0;

        // Seleciona todos os slides (imagens e vídeos) e os itens de navegação
        const slides = document.querySelectorAll(".carousel img, .carousel video");
        const navItems = document.querySelectorAll(".nav-imagens video, .nav-imagens img");

        // Função para exibir um slide específico
        function showSlide(index) {
            if (!slides || slides.length === 0 || index < 0 || index >= slides.length) return;

            // Remove a classe 'active' do slide atual
            slides[currentSlide].classList.remove("active");
            navItems[currentSlide].classList.remove("active-nav"); // Remove a borda da navegação anterior

            // Se o slide atual for um vídeo, pausa-o
            if (slides[currentSlide].tagName.toLowerCase() === "video") {
                slides[currentSlide].pause();
                slides[currentSlide].currentTime = 0; // Reinicia o vídeo para o início
            }

            // Atualiza o índice do slide atual
            currentSlide = index;

            // Adiciona a classe 'active' ao novo slide
            slides[currentSlide].classList.add("active");
            navItems[currentSlide].classList.add("active-nav"); // Adiciona a borda ao item de navegação correspondente

            // Se o novo slide for um vídeo, começa a reprodução
            if (slides[currentSlide].tagName.toLowerCase() === "video") {
                slides[currentSlide].play().catch(err => {
                    console.error("Erro ao reproduzir o vídeo:", err);
                });
            }
        }

        // Função para alterar o slide com base no botão (próximo/anterior)
        function changeSlide(direction) {
            const newIndex = (currentSlide + direction + slides.length) % slides.length;
            showSlide(newIndex);
        }

        // Adiciona eventos de clique aos itens de navegação
        navItems.forEach((navItem, index) => {
            if (navItem.tagName.toLowerCase() === "video") {
                navItem.currentTime = 2; // Define o tempo do vídeo para 1 segundo
                navItem.pause(); // Garante que o vídeo esteja pausado
            }

            // Adiciona evento de clique para trocar o slide
            navItem.addEventListener("click", () => {
                showSlide(index);
            });
        });


// Sistema de pesquisa na página de origem
        document.getElementById('search-input')?.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
            const query = document.getElementById('search-input').value.trim(); // Remove espaços em branco
            if (query) {
                // Redireciona para a página de resultados com a pesquisa
                window.location.href = `/produtos.html?search=${encodeURIComponent(query)}`;
            } else {
                // Redireciona para a página de produtos (sem pesquisa)
                window.location.href = `/produtos.html`;
            }
            }
        });
        
        
        // Sistema de filtragem automática na página de destino
        window.addEventListener('DOMContentLoaded', () => {
            // Verifica se está na página de resultados
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
        
            if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const cards = document.querySelectorAll('.card');
        
            // Filtra os cards com base no termo de busca
            cards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                if (!title.includes(query)) {
                card.classList.add('hidden');
                } else {
                card.classList.remove('hidden');
                }
            });
        
            // Opcional: Insere o termo de pesquisa no campo (caso tenha um input na página de destino)
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = searchQuery;
            }
            }
        });
        


/*Âncora*/
        window.onscroll = function() {
            gerenciarBotao();
        };

        function gerenciarBotao() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            // Se o botão ainda não existe, cria
            let ancora = document.getElementById("ancora");
            if (scrollTop > 120) {
                if (!ancora) {
                    ancora = document.createElement("button");
                    ancora.id = "ancora";
                    ancora.className = "ancora";

                    // Adiciona o ícone ao botão
                    const icone = document.createElement("i");
                    icone.className = "fi fi-br-arrow-small-up"; // Ícone de seta para cima do Font Awesome
                    ancora.appendChild(icone);

                    ancora.onclick = scrollToTop;
                    document.body.appendChild(ancora);
                }
                ancora.style.display = "flex";
            } else if (ancora) {
                ancora.style.display = "none";
            }
        }

        // Função para rolar ao topo
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }