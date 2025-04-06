// Seleciona elementos da interface do usuário
const selectMoeda = document.getElementById("moeda");
const campoValor = document.getElementById("valor-won");
const botaoConverter = document.getElementById("botao-converter");

// Adiciona evento para converter valor
selectMoeda.addEventListener("change", function () {
    // Habilita/desabilita campo de valor e botão de converter com base na seleção
    if (selectMoeda.value !== "") {
    campoValor.disabled = false;
    botaoConverter.disabled = false;
    } else {
    campoValor.disabled = true;
    botaoConverter.disabled = true;
    }
});

function conversor() {
    // Obtém valor e moeda selecionada
    const valor = parseFloat(document.getElementById("valor-won").value);
    const moeda = document.getElementById("moeda").value;

    let resultado = "";

    // Verifica se o valor é válido
    if (isNaN(valor) || valor <= 0) {
        document.getElementById("resultado").textContent =
        "Por favor, insira um valor válido em Wons.";
        return;
    }

    // Realiza a conversão com base na moeda selecionada
    switch (moeda) {
        case "real":
        resultado = wonsParaReais(valor);
        break;
        case "dolar":
        resultado = wonsParaDolares(valor);
        break;
        case "euro":
        resultado = wonsParaEuros(valor);
        break;
        default:
        alert("Opção inválida!");
        return;
    }

    // Exibe o resultado e limpa o campo de valor
    document.getElementById("resultado").textContent = `${resultado}`;
    campoValor.value = "";
}

function wonsParaReais(valorWons) {
    // Define taxa de câmbio e calcula valor em Reais
    let umWon = 0.004;
    let valorReais = valorWons * umWon;
    // Formata o valor para exibição
    let valorFormatado = valorReais.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `O valor de ${valorWons} em Wons convertido para Reais é igual a R$${valorFormatado}.`;
}

function wonsParaDolares(valorWons) {
    // Define taxa de câmbio e calcula valor em Dólares
    let umWon = 0.00075;
    let valorDolares = valorWons * umWon;
    // Formata o valor para exibição
    let valorFormatado = valorDolares.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `O valor de ${valorWons} em Wons convertido para Dólar é igual a U$${valorFormatado}.`;
}

function wonsParaEuros(valorWons) {
    // Define taxa de câmbio e calcula valor em Euros
    let umWon = 0.00068;
    let valorEuros = valorWons * umWon;
    // Formata o valor para exibição
    let valorFormatado = valorEuros.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `O valor de ${valorWons} em Wons convertido para Euros é igual a €${valorFormatado}.`;
}

document.getElementById("botao-limpar").addEventListener("click", limparCampos);

// Adiciona evento para limpar campos
document.getElementById("botao-limpar").addEventListener("click", limparCampos);

function limparCampos() {
    // Seleciona elementos da interface do usuário
    const campoValor = document.getElementById("valor-won");
    const selectMoeda = document.getElementById("moeda");
    const resultado = document.getElementById("resultado");
    const botaoConverter = document.getElementById("botao-converter");

    // Limpa os campos
    campoValor.value = "";
    selectMoeda.value = "";
    resultado.textContent = "";

    // Desabilita entrada e botão
    campoValor.disabled = true;
    botaoConverter.disabled = true;

    // Foca no select
    selectMoeda.focus();
}