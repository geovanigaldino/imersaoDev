// PARTE 1: Lista de perguntas e respostas
const perguntas = [
  {
    pergunta: "Qual elemento HTML é usado para criar um link?",
    respostas: [
      { opcao: "<button>", correto: false },
      { opcao: "<link>", correto: false },
      { opcao: "<a>", correto: true },
      { opcao: "<href>", correto: false },
    ],
  },
  {
    pergunta: "Qual propriedade CSS é usada para mudar a cor do texto?",
    respostas: [
      { opcao: "text-color", correto: false },
      { opcao: "font-color", correto: false },
      { opcao: "color", correto: true },
      { opcao: "text-style", correto: false },
    ],
  },
  {
    pergunta:
      "Qual palavra-chave é usada para declarar uma variável em JavaScript ES6?",
    respostas: [
      { opcao: "var", correto: false },
      { opcao: "let", correto: true },
      { opcao: "int", correto: false },
      { opcao: "define", correto: false },
    ],
  },
  {
    pergunta: "Qual atributo do elemento IMG especifica o caminho da imagem?",
    respostas: [
      // <-- Corrigido aqui
      { opcao: "src", correto: true },
      { opcao: "href", correto: false },
      { opcao: "alt", correto: false },
      { opcao: "path", correto: false },
    ],
  },
  {
    pergunta: "Qual função exibe uma mensagem na janela do navegador?",
    respostas: [
      // <-- Corrigido aqui
      { opcao: "prompt()", correto: false },
      { opcao: "console.log()", correto: false },
      { opcao: "alert()", correto: true },
      { opcao: "print()", correto: false },
    ],
  },
];

// PARTE 2: Pegando os elementos do HTML
const perguntaElemento = document.querySelector(".pergunta");
const respostasElemento = document.querySelector(".respostas");
const progressoElemento = document.querySelector(".progresso");
const textoFinal = document.querySelector(".fim span");
const conteudo = document.querySelector(".conteudo");
const conteudoFinal = document.querySelector(".fim");

// PARTE 3: Variáveis para controle do jogo
let indiceAtual = 0; // Índice da pergunta atual
let acertos = 0; // Contador de acertos

// PARTE 4: Função para carregar uma nova pergunta
function carregarPergunta() {
  progressoElemento.innerHTML = `${indiceAtual + 1}/${perguntas.length}`; // Atualiza o progresso
  const perguntaAtual = perguntas[indiceAtual]; // Pega a pergunta atual
  perguntaElemento.innerHTML = perguntaAtual.pergunta; // Exibe a pergunta

  respostasElemento.innerHTML = ""; // Limpa as respostas anteriores

  // Percorre todas as respostas da pergunta atual
  for (let i = 0; i < perguntaAtual.respostas.length; i++) {
    // Pega a resposta atual com base no índice 'i'
    const resposta = perguntaAtual.respostas[i];
    // Cria um novo elemento 'button' (botão)
    const botao = document.createElement("button");
    // Adiciona a classe CSS 'botao-resposta' ao botão para estilizar
    botao.classList.add("botao-resposta");
    // Define o texto do botão com a opção de resposta (resposta.opcao)
    botao.innerText = resposta.opcao;
    // Adiciona um evento de clique no botão
    botao.onclick = function () {
      // Se a resposta for correta (resposta.correto === true), incrementa o número de acertos
      if (resposta.correto) {
        acertos++; // Incrementa o contador de acertos
      }

      // Avança para a próxima pergunta
      indiceAtual++;

      // Se ainda houver perguntas, carrega a próxima pergunta
      if (indiceAtual < perguntas.length) {
        carregarPergunta(); // Carrega a próxima pergunta
      } else {
        // Se não houver mais perguntas, finaliza o jogo
        finalizarJogo();
      }
    };

    // Adiciona o botão de resposta à tela, dentro do elemento 'respostasElemento'
    respostasElemento.appendChild(botao);
  }
}

// PARTE 5: Função para mostrar a tela final
function finalizarJogo() {
  textoFinal.innerHTML = `Você acertou ${acertos} de ${perguntas.length}`; // Exibe o resultado
  conteudo.style.display = "none"; // Esconde as perguntas
  conteudoFinal.style.display = "flex"; // Mostra a tela final
}

function reiniciarJogo() {
    indiceAtual = 0;
    acertos = 0;
    conteudo.style.display = "flex";
    conteudoFinal.style.display = "none";
    carregarPergunta();
}

const medalhaElemento = document.querySelector(".medalha");

function finalizarJogo() {
  textoFinal.innerHTML = `Você acertou ${acertos} de ${perguntas.length}`;

  // Escolhe a medalha com base no número de acertos
  if (acertos <= 1) {
    medalhaElemento.innerHTML = "🥉 Medalha de Bronze - Continue praticando!";
  } else if (acertos <= 3) {
    medalhaElemento.innerHTML = "🥈 Medalha de Prata - Muito bem!";
  } else {
    medalhaElemento.innerHTML = "🥇 Medalha de Ouro - Excelente!";
  }

  conteudo.style.display = "none";
  conteudoFinal.style.display = "flex";
}

  

// PARTE 6: Iniciando o jogo pela primeira vez
carregarPergunta();
