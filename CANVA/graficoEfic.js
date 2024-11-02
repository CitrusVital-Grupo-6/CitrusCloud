const data = {
    datasets: [
        {
            label: 'Eficiência dos Defensivos',
            data: [
                { x: 1, y: 85 },
                { x: 2, y: 90 },
                { x: 3, y: 75 },
                { x: 4, y: 95 }
            ],
            backgroundColor: '#FEA301', // Cor dos pontos
        },
        {
            label: 'Linha de Referência da Eficiência Ideal',
            data: [
                { x: 0, y: 80 },
                { x: 4, y: 80 }
            ],
            borderColor: 'rgba(255, 99, 132, 1)', // Cor da linha de referência
            type: 'line',
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0 // Remove os pontos da linha de referência
        }
    ]
};

// Configuração do gráfico
const config = {
    type: 'scatter',
    data: data,
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true
            },
            trendlineLinear: {
                style: "rgba(255, 105, 180, .8)",
                lineStyle: "solid",
                width: 2,
                projection: true
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'ID do Defensivo'
                },
                ticks: {
                    callback: function(value) {
                        if (Number.isInteger(value)) {
                            return value; // Mostra apenas números inteiros
                        }
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Eficiência (%)'
                },
                suggestedMin: 40,
                suggestedMax: 100,
                ticks: {
                    stepSize: 15
                }
            }   
        }
    }
};

// Renderizar o gráfico
const ctx = document.getElementById('graficoEfic').getContext('2d');
new Chart(ctx, config);