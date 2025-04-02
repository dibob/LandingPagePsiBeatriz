// Importa os dados dos projetos do arquivo projetos.js


// Rolagem suave para os links de navegação
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Função para carregar os projetos dinamicamente
function carregarProjetos() {
    const containerProjetos = document.getElementById('container-projetos');

    if (projetos.length > 0) {
        projetos.forEach(projeto => {
            // Crie os elementos HTML para cada projeto
            const projetoDiv = document.createElement('div');
            projetoDiv.classList.add('projeto');

            const tituloProjeto = document.createElement('h3');
            tituloProjeto.textContent = projeto.nome;

            const descricaoProjetoP = document.createElement('p');
            descricaoProjetoP.textContent = projeto.descricao;

            projetoDiv.appendChild(imagemProjeto);
            projetoDiv.appendChild(tituloProjeto);
            projetoDiv.appendChild(descricaoProjetoP);

            containerProjetos.appendChild(projetoDiv);
        });
    } else {
        // Caso não haja projetos, exibe mensagem
        containerProjetos.innerHTML = '<p>Nenhum projeto encontrado.</p>';
    }
}

// Carrega os projetos quando a página é carregada
window.onload = carregarProjetos;