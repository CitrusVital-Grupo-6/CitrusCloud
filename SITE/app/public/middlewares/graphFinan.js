const divTotalMl = document.getElementById('total_ml_mensal').getContext('2d');

const graficoTotalMl = new Chart(divTotalMl, {
    type: 'line',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                label: 'Agrotóxico A',
                data: [120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340],
                borderColor: '#FEA301',
                backgroundColor: '#FEA30150',
                fill: true,
                tension: 0.3,
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Quantidade (mL)',
                }
            }
        }
    }
});

// -------------------------------------------------------------------
const divGraphDefen = document.getElementById('chart_amount_month').getContext('2d');

const graficoDefensivos = new Chart(divGraphDefen, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                label: 'Defensivo A',
                data: [300, 250, 280, 300, 310, 290, 320, 330, 340, 350, 360, 370],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
            {
                label: 'Defensivo B',
                data: [200, 180, 220, 210, 230, 200, 240, 250, 260, 270, 280, 290],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
            },
            {
                label: 'Defensivo C',
                data: [150, 160, 170, 180, 190, 170, 200, 210, 220, 230, 240, 250],
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Quantidade (mL)',
                }
            }
        }
    }
});

// -------------------------------------------------------------------
const divPizza = document.getElementById('graficoPizza').getContext('2d');

const graficoPizza = new Chart(divPizza, {
    type: 'pie',
    data: {
        labels: ['Defensivo A', 'Defensivo B', 'Defensivo C'],
        datasets: [{
            label: 'Consumo em mL',
            data: [300, 200, 100],
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 99, 132, 0.8)'
            ]
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' // Coloca a legenda à direita do gráfico
            }
        }
    }
});