import { selecionarCotacao } from "./imprimeCotacao.js";

const graficoDolar = document.getElementById("graficoDolar");
const graficoIene = document.getElementById("graficoIene")

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
        }]
    },
});

const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
        label: 'Iene',
        data: [],
        borderWidth: 1
        }]
    },
});

function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return horario;
};

function adicionarDados(grafico, legeda, dados) {
    grafico.data.labels.push(legeda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    });
    grafico.update();
};

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');
let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');

workerDolar.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionarCotacao("dolar", valor);
    adicionarDados(graficoParaDolar, tempo, valor);
})



workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;

    selecionarCotacao("iene", valor);
    adicionarDados(graficoParaIene, tempo, valor);
})