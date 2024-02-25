const lista = document.querySelectorAll('[data-lista]');

export function selecionarCotacao(nome, valor) {
    lista.forEach((listaEscolhida) => {
        if (listaEscolhida.id == nome) {
            imprimeCotacao(listaEscolhida, nome, valor);
        }
    })
}

function imprimeCotacao(listaEscolhida, nome, valor) {
    listaEscolhida.innerHTML = '';
    
    const plurais = {
        "dolar": "dolares",
        "iene": "ienes"
    }

    for(let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10) {
    const listaItem = document.createElement('li');
    listaItem.innerHTML = `${multiplicador} ${multiplicador == 1 ? nome : plurais[nome]}: R$${(valor * multiplicador).toFixed(2)}`;
    listaEscolhida.appendChild(listaItem);
    }
}