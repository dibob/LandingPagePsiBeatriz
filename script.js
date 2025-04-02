document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

async function carregarProjetos() {
    const containerProjetos = document.getElementById('container-projetos');

    try {
        // Obtenha a lista de arquivos na pasta "projetos"
        const resposta = await fetch('/pasta-projetos/');
        const arquivos = await resposta.text();
        const listaArquivos = arquivos.match(/href="([^"]+\.txt)"/g);

        if (listaArquivos) {
            for (const arquivoLink of listaArquivos) {
                const nomeArquivo = arquivoLink.match(/href="([^"]+\.txt)"/)[1];
                const nomeProjeto = nomeArquivo.replace('.txt', '');

                // Leia o conteúdo do arquivo .txt
                const respostaConteudo = await fetch(`/pasta-projetos/${nomeArquivo}`);
                const descricaoProjeto = await respostaConteudo.text();

                // Crie os elementos HTML para o projeto
                const projetoDiv = document.createElement('div');
                projetoDiv.classList.add('projeto');

                const imagemProjeto = document.createElement('img');
                imagemProjeto.src = `imagens/${nomeProjeto}.jpg`; // Certifique-se de ter imagens correspondentes
                imagemProjeto.alt = nomeProjeto;

                const tituloProjeto = document.createElement('h3');
                tituloProjeto.textContent = nomeProjeto;

                const descricaoProjetoP = document.createElement('p');
                descricaoProjetoP.textContent = descricaoProjeto;

                projetoDiv.appendChild(imagemProjeto);
                projetoDiv.appendChild(tituloProjeto);
                projetoDiv.appendChild(descricaoProjetoP);

                containerProjetos.appendChild(projetoDiv);
            }
        } else {
            containerProjetos.innerHTML = '<p>Nenhum projeto encontrado.</p>';
        }
    } catch (erro) {
        console.error('Erro ao carregar projetos:', erro);
        containerProjetos.innerHTML = '<p>Erro ao carregar projetos.</p>';
    }
}

// Chame a função para carregar os projetos quando a página for carregada
window.onload = carregarProjetos;