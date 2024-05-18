function filterPostsByCategory(category) {
    // Obtém todas as postagens
    const posts = document.querySelectorAll('.postagem');
    
    // Itera sobre cada postagem
    posts.forEach(post => {
        // Obtém a categoria da postagem
        const postCategory = post.querySelector('p').innerText.split(': ')[1];
        
        // Exibe ou oculta a postagem com base na categoria selecionada
        if (category === "0" || postCategory ===  getCategoryName(category)) {
            post.style.display = 'inline-block';
        } else {
            post.style.display = 'none';
        }
    });
}


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
    return categories[categoryValue];
}