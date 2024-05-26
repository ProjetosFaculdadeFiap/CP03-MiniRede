document.addEventListener('DOMContentLoaded', () => {

    /* Carregando Inputs */
    const tituloFilme = document.querySelector("#titulo");
    const categoriaFilme = document.querySelector("#categoria");
    const resenhaFilme = document.querySelector("#resenha");
    const capaFilme = document.querySelector("#capa");
    const imagemFilme = document.querySelector("#imagemFilme");
    const imagemAtor = document.querySelector("#imagemAtor");
    const reviewFilme = document.querySelector("#estrelas");
    const btnPostar = document.querySelector(".btn-postar");
    const listaPostagens = document.querySelector("#listapostagens");

    
    const filtroCategoria = document.querySelector("#filter-categoria");

    // Lista dos posts/timeline
    let listaPostagensArray = [];

    // Botão postar
    btnPostar.addEventListener('click', function(event) {
        event.preventDefault();

        // Criar um novo post| JSON
        const novoPost = {
            nome: tituloFilme.value,
            categoria: categoriaFilme.value,
            resenha: resenhaFilme.value,
            capa: capaFilme.value,
            imagem: imagemFilme.value,
            ator: imagemAtor.value,
            review: reviewFilme.value,
        };

        // Adicionar o novo post à lista de postagens
        listaPostagensArray.unshift(novoPost);

        // Renderizar a lista de postagens
        renderizarNaTela();

        // Limpar Inputs
        tituloFilme.value = '';
        categoriaFilme.value = '0';
        resenhaFilme.value = '';
        capaFilme.value = '';
        imagemFilme.value = '';
        imagemAtor.value = '';
        reviewFilme.value = '0';
    });

    function renderizarNaTela() {
        listaPostagens.innerHTML = '';

        // Variável para contar o número de cards renderizados
        let cardsRenderizados = 0;

        // Renderizar cada post na lista de postagens
        listaPostagensArray.forEach((filme, index) => {
            //Criando uma lista> Card
            let card = document.createElement('li');
            card.className = 'card';
            card.dataset.categoria = filme.categoria; 
            // Adiciona um atributo dataset-categoria para filtragem

            const cardTitle = document.createElement('h2');
            cardTitle.textContent = filme.nome;

            const cardCategoria = document.createElement('p');
            cardCategoria.textContent = "Categoria: " + getCategoryName(filme.categoria);

            const cardResenha = document.createElement('p');
            cardResenha.textContent = filme.resenha;
            cardResenha.className = 'resenha-content';

            const cardReview = document.createElement('p');
            cardReview.textContent = "Estrelas: " + filme.review;

            // Botão Editar
            let btnEditar = document.createElement('button');
            btnEditar.className = 'button';
            btnEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> <span>Editar</span>';
            btnEditar.addEventListener('click', function() {
                // Função de edição a ser implementada
            });

            // Botão Remover
            let btnRemover = document.createElement('button');
            btnRemover.className = 'button';
            btnRemover.innerHTML = 'Remover';
            btnRemover.addEventListener('click', function() {
                // Função de remoção a ser implementado
            
            });

            card.appendChild(cardTitle);
            card.appendChild(cardCategoria);
            card.appendChild(cardResenha);
            card.appendChild(cardReview);
            

            // Filtra as imagens válidas (não vazias)
            const images = [filme.capa, filme.imagem, filme.ator].filter(image => image); 

            // Verifica se há pelo menos uma imagem
            if (images.length > 0) {
                let carousel = document.createElement('div');
                carousel.className = 'carousel';

                const carouselInner = document.createElement('div');
                carouselInner.className = 'carousel-inner';
                
                // Adiciona as imagens do post como slides do carrossel
                images.forEach((image, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.className = 'carousel-item';
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `Imagem ${index + 1}`;
                    carouselItem.appendChild(img);
                    carouselInner.appendChild(carouselItem);
                });

                //Botão Carrossel-1
                const nextButton = document.createElement('button');
                nextButton.innerHTML = '&#10095;';
                nextButton.className = 'carousel-control next'; 
                nextButton.addEventListener('click', function() {
                    nextSlide(this);
                });
                //Botão Carrossel-2
                const prevButton = document.createElement('button');
                prevButton.innerHTML = '&#10094;';
                prevButton.className = 'carousel-control prev'; 
                prevButton.addEventListener('click', function() {
                    prevSlide(this);
                });

                carousel.appendChild(carouselInner);
                carousel.appendChild(prevButton);
                carousel.appendChild(nextButton);

                card.appendChild(carousel);
                
            }
            card.appendChild(btnEditar);
            card.appendChild(btnRemover);
            
            listaPostagens.appendChild(card);
            cardsRenderizados++;
        });

        // Verifica se pelo menos um card foi renderizado
        if (cardsRenderizados > 0) {
            // Se pelo menos um card foi renderizado, exibe a borda
            listaPostagens.style.border = '1px solid #ff69b4';
            listaPostagens.style.borderRadius = '10px';
            listaPostagens.style.padding = '32px';
            listaPostagens.style.margin = '15px 0';
            listaPostagens.style.display = 'inline-block';
        } else {
            // Se nenhum card foi renderizado, oculta a borda
            listaPostagens.style.display = 'none';
        }

        // Aplica o filtro de categoria
        filterPostsByCategory(filtroCategoria.value);
    }

    // Função para obter o nome da categoria
    function getCategoryName(categoryValue) {
        const categories = {
            "1": "Ação",
            "2": "Comédia",
            "3": "Drama",
            "4": "Romance",
            "5": "Documentário",
            "6": "Suspense",
            "7": "Terror",
            "8": "Ficção Científica"
        };
        return categories[categoryValue] || "Desconhecida";
    }
    // Função de filtro
    filtroCategoria.addEventListener('change', function() {
        filterPostsByCategory(filtroCategoria.value);
    });

    function filterPostsByCategory(category) {
        const posts = document.querySelectorAll('#listapostagens .card');

        posts.forEach(post => {
            const postCategory = post.dataset.categoria;

            if (category === "0" || postCategory === category) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
});
