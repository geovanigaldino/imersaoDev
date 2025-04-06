// Array contendo os personagens de The Originals (Mikaelsons e aliados)
const personagens = [
  { nome: "Klaus Mikaelson", tipo: "Híbrido", imagem: "assets/imagens/klaus-mikaelson.webp" },
  { nome: "Elijah Mikaelson", tipo: "Original", imagem: "assets/imagens/elijah-mikaelson.webp" },
  { nome: "Rebekah Mikaelson", tipo: "Original", imagem: "assets/imagens/rebekah-mikaelson.webp" },
  { nome: "Hayley Marshall", tipo: "Lobisomem", imagem: "assets/imagens/hayley-marshall.webp" },
  { nome: "Freya Mikaelson", tipo: "Bruxa", imagem: "assets/imagens/freya-mikaelson.webp" },
  { nome: "Hope Mikaelson", tipo: "Bruxa", imagem: "assets/imagens/hope-mikaelson.webp" }
];

// Array contendo os vilões de The Originals
const viloes = [
  { nome: "Dahlia", tipo: "Bruxa ancestral" },
  { nome: "Esther Mikaelson", tipo: "Bruxa Original" },
  { nome: "Mikael", tipo: "Original Caçador" },
  { nome: "Lucien Castle", tipo: "Vampiro evoluído" },
  { nome: "Aurora de Martel", tipo: "Vampira instável" },
  { nome: "Tristan de Martel", tipo: "Vampiro antigo" },
  { nome: "Marcel Gerard", tipo: "Supervampiro" },
  { nome: "The Hollow", tipo: "Magia ancestral" }
];

/**
 * Cria os elementos select para escolha dos personagens
 * Gera 3 selects com todos os personagens disponíveis
 */
function criarSelectPersonagens() {
  const container = document.getElementById("seletores-container");
  container.innerHTML = ''; // Limpa o container antes de criar novos selects

  // Cria 3 selects (para escolher 3 personagens)
  for (let i = 1; i <= 3; i++) {
    const select = document.createElement("select");
    select.id = `personagem-${i}`;
    select.className = "personagem-select";

    // Cria a opção placeholder padrão
    const placeholder = document.createElement("option");
    placeholder.textContent = `Personagem ${i}`;
    placeholder.value = "";
    placeholder.disabled = placeholder.selected = true; // Desabilita e seleciona por padrão
    select.appendChild(placeholder);

    // Adiciona cada personagem como uma opção no select
    personagens.forEach(p => {
      const option = document.createElement("option");
      option.value = p.nome;
      option.textContent = `${p.nome} (${p.tipo})`; // Mostra nome e tipo
      option.dataset.imagem = p.imagem || ""; // Armazena o caminho da imagem
      select.appendChild(option);
    });

    container.appendChild(select);
  }
}

/**
 * Mostra uma mensagem temporária na tela
 * @param {string} texto - O texto da mensagem
 * @param {number} tempo - Tempo em milissegundos que a mensagem ficará visível (padrão: 3000ms)
 */
function mostrarMensagem(texto, tempo = 3000) {
  const mensagemDiv = document.getElementById('mensagem-alerta');
  mensagemDiv.textContent = texto;
  mensagemDiv.classList.add('mostrar');
  
  // Remove a mensagem após o tempo especificado
  setTimeout(() => {
      mensagemDiv.classList.remove('mostrar');
  }, tempo);
}

/**
 * Inicia o jogo validando as escolhas e calculando o resultado
 */
function iniciarJogo() {
  const escolhas = [];
  const selects = document.querySelectorAll(".personagem-select");
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = ""; // Limpa resultados anteriores

  // Verifica se todos os selects foram preenchidos e evita duplicatas
  const selecoes = new Set(); // Usa Set para armazenar escolhas únicas
  let todosPreenchidos = true;

  selects.forEach((select, index) => {
      const valor = select.value;

      if (valor === "") {
          todosPreenchidos = false;
          return;
      }

      if (selecoes.has(valor)) {
          mostrarMensagem("Você não pode escolher o mesmo personagem mais de uma vez!");
          todosPreenchidos = false;
          return;
      }

      selecoes.add(valor);
      escolhas.push(valor);
  });

  // Validação final das escolhas
  if (!todosPreenchidos || selecoes.size !== 3) {
      mostrarMensagem("Você precisa escolher 3 personagens diferentes!");
      return;
  }

  // Processa as escolhas válidas
  exibirPersonagensEscolhidos(escolhas, resultadoDiv);
  const viloesSorteados = sortearViloes();
  exibirViloes(viloesSorteados, resultadoDiv);
  calcularResultado(escolhas, viloesSorteados, resultadoDiv);
}

/**
 * Exibe os personagens escolhidos pelo jogador
 * @param {Array} escolhas - Array com os nomes dos personagens escolhidos
 * @param {HTMLElement} container - Elemento DOM onde será exibido o resultado
 */
function exibirPersonagensEscolhidos(escolhas, container) {
  container.innerHTML += "<h2>Seus Personagens:</h2>";
  const personagensContainer = document.createElement("div");
  personagensContainer.className = "personagens-escolhidos";

  // Para cada personagem escolhido, cria um elemento de exibição
  escolhas.forEach(nome => {
    const personagem = personagens.find(p => p.nome === nome);
    const container = document.createElement("div");
    container.className = "personagem-container";

    // Cria container para a imagem do personagem
    const imgContainer = document.createElement("div");
    imgContainer.className = "personagem-imagem";

    if (personagem.imagem) {
      const img = new Image();
      img.src = personagem.imagem;
      img.alt = personagem.nome;
      img.style.cssText = "width:100%;height:100%;object-fit:cover";
      imgContainer.appendChild(img);
    } else {
      imgContainer.textContent = "Sem imagem";
    }

    // Monta o HTML do personagem com imagem e informações
    container.innerHTML += `
      ${imgContainer.outerHTML}
      <div><strong>${personagem.nome}</strong><br>${personagem.tipo}</div>
    `;
    personagensContainer.appendChild(container);
  });

  container.appendChild(personagensContainer);
}

/**
 * Sorteia 3 vilões aleatórios sem repetição
 * @returns {Array} Array com 3 vilões sorteados
 */
function sortearViloes() {
  const viloesDisponiveis = [...viloes]; // Cria cópia do array original
  
  // Sorteia 3 vilões únicos
  return Array.from({ length: 3 }, () => {
    const indice = Math.floor(Math.random() * viloesDisponiveis.length);
    return viloesDisponiveis.splice(indice, 1)[0]; // Remove o vilão sorteado do array disponível
  });
}

/**
 * Exibe os vilões sorteados para a batalha
 * @param {Array} viloesSorteados - Array com os vilões sorteados
 * @param {HTMLElement} container - Elemento DOM onde será exibido o resultado
 */
function exibirViloes(viloesSorteados, container) {
  container.innerHTML += "<h2>Vilões Sorteados:</h2>";
  
  // Cria um elemento para cada vilão sorteado
  viloesSorteados.forEach(v => {
    const vilaoDiv = document.createElement("div");
    vilaoDiv.className = "vilao-container";
    vilaoDiv.innerHTML = `<strong>${v.nome}</strong> (${v.tipo})`;
    container.appendChild(vilaoDiv);
  });
}

/**
 * Calcula o resultado da batalha entre personagens e vilões
 * @param {Array} escolhas - Personagens escolhidos pelo jogador
 * @param {Array} viloesSorteados - Vilões sorteados para a batalha
 * @param {HTMLElement} container - Elemento DOM onde será exibido o resultado
 */
function calcularResultado(escolhas, viloesSorteados, container) {
  // Gera forças aleatórias para cada personagem e vilão
  const forcasPersonagens = escolhas.map(() => sorteiaUmNumero());
  const forcaPersonagens = forcasPersonagens.reduce((a, b) => a + b, 0); // Soma total
  
  const forcasViloes = viloesSorteados.map(() => sorteiaUmNumero());
  const forcaViloes = forcasViloes.reduce((a, b) => a + b, 0); // Soma total

  const resultadoJogo = document.createElement("div");
  resultadoJogo.className = "resultado-jogo";
  
  // Determina o resultado com base nas forças totais
  if (forcaPersonagens > forcaViloes) {
    resultadoJogo.innerHTML = `
      <h3 class="vitoria">O clã Mikaelson triunfou sobre as sombras!</h3>
      <p>O legado de sangue falou mais alto.</p>
      <p>Força do seu clã: ${forcaPersonagens} (${forcasPersonagens.join(" + ")})</p>
      <p>Força dos vilões: ${forcaViloes} (${forcasViloes.join(" + ")})</p>
    `;
  } else if (forcaPersonagens < forcaViloes) {
    resultadoJogo.innerHTML = `
      <h3 class="derrota">Seu clã foi dizimado pelas trevas!</h3>
      <p>Nem mesmo o sangue dos Mikaelson foi suficiente.</p>
      <p>Força do seu clã: ${forcaPersonagens} (${forcasPersonagens.join(" + ")})</p>
      <p>Força dos vilões: ${forcaViloes} (${forcasViloes.join(" + ")})</p>
    `;
  } else {
    resultadoJogo.innerHTML = `
      <h3 class="empate">A batalha terminou em equilíbrio sombrio...</h3>
      <p>Ambos os lados provaram sua força: ${forcaPersonagens}</p>
    `;
  }

  container.appendChild(resultadoJogo);
}

/**
 * Gera um número aleatório entre 1 e 10 para representar a força de um personagem/vilão
 * @returns {number} Número aleatório entre 1 e 10
 */
function sorteiaUmNumero() {
  return Math.floor(Math.random() * 10) + 1;
}

/**
 * Reinicia o jogo, limpando as seleções e resultados
 */
function reiniciarJogo() {
  document.querySelectorAll(".personagem-select").forEach(select => {
    select.selectedIndex = 0; // Reseta cada select para a opção padrão
  });
  document.getElementById("resultado").innerHTML = ""; // Limpa o resultado
}

// Inicialização do jogo quando a página carrega
window.onload = criarSelectPersonagens;

// Event listeners para os botões
document.getElementById("botao-iniciar").addEventListener("click", iniciarJogo);
document.getElementById("botao-reiniciar").addEventListener("click", reiniciarJogo);