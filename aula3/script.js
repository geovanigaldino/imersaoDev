function jogar() {
    let rodada = 1;
    let vidas = 3;
    let venceu = false;

    while (rodada <= 3) {
        console.log("Rodada: " + rodada);

        let escolhaJogador = parseInt(prompt(`Jogada ${rodada}: Escolha um vidro (1, 2, 3)?`));

        // Garante que o jogador só pode escolher 1, 2 ou 3
        while (![1, 2, 3].includes(escolhaJogador)) {
            alert("Escolha inválida! Escolha 1, 2 ou 3.");
            escolhaJogador = parseInt(prompt(`Jogada ${rodada}: Escolha um vidro (1, 2, 3)?`));
        }

        let pisoQuebrado = Math.floor(Math.random() * 3) + 1;

        if (escolhaJogador === pisoQuebrado) {
            vidas--;

            if (vidas === 0) {
                alert("Você perdeu!");
                break; 
            }

            alert(`Você perdeu uma vida!\nVidas restantes: ${vidas}`);
        } else {
            alert(`Passou!\nPiso quebrado estava na ponte ${pisoQuebrado}`);
        }

        rodada++;
    }

    // Se o jogador chegou até a 4ª rodada e ainda tem vidas, ele venceu
    if (rodada > 3 && vidas > 0) {
        venceu = true;
        alert("Parabéns, você venceu!");
    }
}