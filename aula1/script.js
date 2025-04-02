function conversor() {
    let opcao = prompt('Escolha uma opção:\n1. Wons para Reais\n2. Wons para Dólares\n3. Wons para Euros\n');
    switch (opcao) {
        case '1':
            wonsParaReais();
            break;
        case '2':
            wonsParaDolares();
            break;
        case '3':
            wonsParaEuros();
            break;
        default:
            alert('Opção inválida!');
    }
}

function wonsParaReais() {
    let valorWons = parseFloat(prompt('Digite o valor em Wons: '));
    let umWon = 0.0040;
    let valorReais = valorWons * umWon;
    let valorFormatado = valorReais.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    alert('R$ ' + valorFormatado);
}

function wonsParaDolares() {
    let valorWons = parseFloat(prompt('Digite o valor em Wons: '));
    let umWon = 0.00075;
    let valorDolares = valorWons * umWon;
    let valorFormatado = valorDolares.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    alert('U$ ' + valorFormatado);
}

function wonsParaEuros() {
    let valorWons = parseFloat(prompt('Digite o valor em Wons: '));
    let umWon = 0.00068;
    let valorEuros = valorWons * umWon;
    let valorFormatado = valorEuros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    alert('€ ' + valorFormatado);
}
