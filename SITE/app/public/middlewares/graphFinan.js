function getTotalValueMonth(idEmpresa) {
    fetch(`/financ/getTotalValueMonth/${idEmpresa}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.warn("Nenhum resultado encontrado.");
                    labels = [];
                    valores = [];
                    return;
                }

                return resposta.json();
            } else {
                throw new Error("Houve um erro na API!");
            }
        })
        .then(function (resposta) {
            if (resposta) {
                labelTotalValue = resposta.map(dado => dado.mes);
                valueTotalValue = resposta.map(dado => dado.total_ml);

                console.log("Labels:", labelTotalValue);
                console.log("Valores:", valueTotalValue);

                atualizarGrafico();
            }
        })
        .catch(function (erro) {
            console.error("Erro:", erro);
        });
}

function atualizarGrafico() {
    const divTotalMl = document.getElementById('total_ml_mensal').getContext('2d');
    new Chart(divTotalMl, {
        type: 'line',
        data: {
            labels: labelTotalValue,
            datasets: [
                {
                    label: "Total Gasto(Mensal)",
                    data: valueTotalValue,
                    borderColor: '#FEA301',
                    backgroundColor: '#FEA30150',
                    fill: true,
                    tension: 0,
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor (BRL)',
                    }
                }
            }
        }
    });
}

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