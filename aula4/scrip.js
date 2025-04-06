// Preciso criar uma lista com os jogadores
let personagem = ["", "", ""];
let viloes = ["", "", ""];

let forcaPersonagem = 0;
let forcaViloes = 0;

alert("O array personagem contém: " + personagem);

for(let i = 0; i < 3; i++) {
    let escolhaPersonagem = prompt("Digite o nome do seu personagem " + (i + 1));

    personagem[i] = escolhaPersonagem;
    // Calcular a força de cada jogador e depois somar pra saber a força do time
    forcaPersonagem += Math.floor(Math.random() * 10) + 1;

}

console.log("Agora, o array personagem contém: " + personagem);
console.log("Início Vilões: " + viloes);

let viloesPossiveis = ["Nazare Tedesco", "Odete Roitmann", "Flora", "Carminha", "Laura Prudente da Costa"];

for(let i = 0; i < 3; i++) {
    let indiceAleatorio = Math.floor(Math.random() * 5);
    
    viloes[i] = viloesPossiveis[indiceAleatorio];
    // Calcular a força de cada jogador do time do computador
    forcaViloes += Math.floor(Math.random() * 10) + 1;
}
console.log("Final Vilões: " + viloes);

// Comparar os dois times para saber quem venceu.
if (forcaPersonagem > forcaViloes) {
    alert(`Seu time é mais forte! Você ganhou a disputa de cabo de guerra! Sua força foi ${forcaPersonagem}`);
} else  {
    if (forcaPersonagem < forcaViloes) {
        alert(`Seu time é mais fraco! O computador ganhou o cabo de guerra com força ${forcaViloes}`);
    } else {
        alert(`Empate! Ambos os times têm a mesma força.`);
    }
}