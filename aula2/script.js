let pontosJogador = 0; // Armazena a pontuação do jogador.
let pontosComputador = 0; // Armazena a pontuação do computador.

function jogar() {
    document.getElementById("botaoJogar").style.display = "none"; // Oculta o botão de "Jogar" após o clique para evitar múltiplos envios 
    document.getElementById("formulario").style.display = "block"; // Exibe o formulário para o jogador interagir com o jogo
}



document.getElementById("jogar").addEventListener("click", function() {
    let nome = document.getElementById("nome").value; // Captura o nome do jogador   
    let idade = Number(document.getElementById("idade").value); // Converte o valor de idade para número. 

    const mensagemDiv = document.getElementById("mensagem");

    mensagemDiv.innerHTML = ""; // Limpa qualquer mensagem anterior 
    mensagemDiv.className = "mensagem"; // Reseta a classe da mensagem para a padrão

    if (idade < 18) {
        mensagemDiv.textContent = "Você não pode jogar."; // Exibe mensagem de restrição
        mensagemDiv.classList.add("erro"); // Adiciona estilo visual de erro
        return;
    }
    
    document.getElementById("formulario").style.display = "none"; // Esconde o formulário após validação

    iniciarJogo(nome); // Chamada para a função principal do jogo
});


function iniciarJogo(nome) {
    const opcoes = { 1: "Pedra", 2: "Papel", 3: "Tesoura" }; // Cria um objeto com as opções do jogo.

    document.getElementById("nome-jogador").textContent = nome; // Insere o nome do jogador em algum local da interface
       
    // Exibe as opções de escolha para o jogador
    document.getElementById("mensagem").innerHTML = `
        <h3>${nome}, escolha:</h3>
        <button onclick="jogarRodada(1, '${nome}')">Pedra</button>
        <button onclick="jogarRodada(2, '${nome}')">Papel</button>
        <button onclick="jogarRodada(3, '${nome}')">Tesoura</button>
    `;
}


function jogarRodada(escolhaJogador, nome) {
    // Objeto com as opções possíveis. 
    const opcoes = { 1: "Pedra", 2: "Papel", 3: "Tesoura" };

    // Escolha aleatória do computador (entre 1 e 3)
    let escolhaComputador = Math.floor(Math.random() * 3) + 1;

    // Limpa a área de mensagens
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = "";

    // Exibe animação de carregamento
    const carregandoDiv = document.createElement("div");
    carregandoDiv.id = "carregando";
    carregandoDiv.innerHTML = `
        <div class="spinner"></div>
        <div class="carregando-texto">Computador está escolhendo...</div>
    `;
    mensagem.appendChild(carregandoDiv);

    // Aguarda 2 segundos antes de mostrar o resultado
    setTimeout(() => {
        mensagem.innerHTML = ""; // Remove o carregamento

        let resultado = "";
        
        // Lógica de comparação das escolhas
        if (escolhaJogador === escolhaComputador) {
            resultado = "Empate!";
        } else if (
            (escolhaJogador === 1 && escolhaComputador === 3) || // Pedra vence Tesoura
            (escolhaJogador === 2 && escolhaComputador === 1) || // Papel vence Pedra
            (escolhaJogador === 3 && escolhaComputador === 2)    // Tesoura vence Papel
        ) {
            resultado = "Você venceu!";
        } else {
            resultado = "Computador venceu!";
        }

        // Atualiza o placar com base no resultado
        if (resultado === "Você venceu!") {
            pontosJogador++;
        } else if (resultado === "Computador venceu!") {
            pontosComputador++;
        }

        // Atualiza o placar na interface
        document.getElementById("placar").innerHTML = `
            👨‍💻 <span id="nome-jogador">${nome}</span>: ${pontosJogador} &nbsp;&nbsp; 🖥️ Computador: ${pontosComputador}
        `;

        // Exibe o resultado da rodada e botões de ação
        mensagem.innerHTML = `
            <p>Você escolheu: <strong>${opcoes[escolhaJogador]}</strong></p>
            <p>Computador escolheu: <strong>${opcoes[escolhaComputador]}</strong></p>
            <p><strong>${resultado}</strong></p>
            <button onclick="iniciarJogo('${nome}')">Jogar novamente</button>
            <button onclick="reiniciarJogo()">Reiniciar</button>
        `;

        
    }, 2000); // Delay de 2 segundos para simular a escolha do computador
}


function reiniciarJogo() {
    location.reload(); // Recarrega a página, reiniciando todo o estado do jogo
}
