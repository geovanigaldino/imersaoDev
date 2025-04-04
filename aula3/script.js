function jogar() {
    let rodada = 1;          // Contador de rodadas
    let vidas = 3;           // Quantidade de vidas do jogador
    let totalRodadas = 5;     // Total de rodadas para vencer
    let venceu = false;      // Flag para verificar vitória

    // Mensagem de boas-vindas com as regras do jogo
    alert("Boas-vindas ao Desafio dos Vidros!\nVocê tem 3 vidas.\nVocê precisa sobreviver a 5 rodadas.");

    // Solicita e valida o nome do jogador
    let nome = prompt("Por favor, digite seu nome:").toUpperCase();
    // Verifica se o nome é válido (não vazio)
    while (!nome || nome.trim() === "") {
        alert("Nome inválido! Por favor, digite um nome válido.");
        nome = prompt("Por favor, digite seu nome:");
    }

    // Mensagem personalizada com o nome do jogador
    alert(`Olá ${nome}, boa sorte!`);

    // Loop principal do jogo - executa enquanto houver rodadas restantes
    while (rodada <= totalRodadas) {
        // Solicita a escolha do jogador (1, 2 ou 3)
        let escolhaJogador = parseInt(prompt(`Jogada ${rodada}:\nEscolha um vidro: 1, 2 ou 3`));

        // Valida a entrada do jogador (deve ser 1, 2 ou 3)
        while (![1, 2, 3].includes(escolhaJogador)) {
            alert("Escolha inválida! Escolha 1, 2 ou 3.");
            escolhaJogador = parseInt(prompt(`Jogada ${rodada}:\nEscolha um vidro: 1, 2 ou 3`));
        }

        // Gera aleatoriamente o vidro quebrado (1-3)
        let pisoQuebrado = Math.floor(Math.random() * 3) + 1;

        // Verifica se o jogador escolheu o vidro quebrado
        if (escolhaJogador === pisoQuebrado) {
            vidas--;  // Reduz uma vida

            // Verifica se o jogador perdeu todas as vidas
            if (vidas === 0) {
                alert("Suas vidas acabaram! Você perdeu!");
                break;  // Termina o jogo
            }

            // Mensagem de vidro quebrado e vidas restantes
            alert(`Vidro quebrado!\nVocê perdeu uma vida!\nVidas restantes: ${vidas}`);
        } else {
            // Mensagem de acerto e incentivo
            alert(`Boa escolha! Você avançou com segurança.\nContinue assim, a vitória está próxima!\nVidas restantes: ${vidas}`);
        }
        rodada++;  // Incrementa o contador de rodadas
    }

    // Verificação final de vitória
    // Se o jogador completou todas as rodadas e ainda tem vidas
    if (rodada > totalRodadas && vidas > 0) {
        venceu = true;
        alert(`Parabéns, você venceu!\nCom ${vidas} vidas restantes!`);
    }
}