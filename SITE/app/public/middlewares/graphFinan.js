let graficoTotalMl;

function getTotalValueMonth(idEmpresa, filtro) {
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

                if(isTelaInicializada){
                    atualizarGrafico()
                } else {
                    criarGrafico();
                }
            }
        })
        .catch(function (erro) {
            console.error("Erro:", erro);
        });
}

function criarGrafico() {
    divTotalMl = document.getElementById('total_ml_mensal').getContext('2d');

    graficoTotalMl = new Chart(divTotalMl, {
        type: 'bar', // Define o tipo principal como 'bar'
        data: {
            labels: labelTotalValue,
            datasets: [
                {
                    type: 'bar', // Define este dataset como barras
                    label: "Gasto Mensal",
                    data: valueTotalValue,
                    backgroundColor: '#FEA30150', // Cor semitransparente
                    borderColor: '#FEA301', // Cor da borda
                    borderWidth: 1,
                },
                {
                    type: 'line', // Define este dataset como linha
                    label: "Total Acumulado",
                    data: valueTotalValue.map((value, index) => 
                        valueTotalValue.slice(0, index + 1).reduce((acc, curr) => acc + curr, 0) // Cálculo acumulado
                    ),
                    borderColor: '#0288D1',
                    backgroundColor: '#0288D150',
                    fill: false,
                    tension: 0.4,
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
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

function atualizarGrafico() {
    if (graficoTotalMl) {
        // Atualiza os dados do gráfico existente
        graficoTotalMl.data.labels = labelTotalValue; // Atualiza as labels
        graficoTotalMl.data.datasets[0].data = valueTotalValue; // Atualiza o dataset de barras
        graficoTotalMl.data.datasets[1].data = valueTotalValue.map((value, index) =>
            valueTotalValue.slice(0, index + 1).reduce((acc, curr) => acc + curr, 0) // Recalcula os acumulados
        );
        graficoTotalMl.update(); // Atualiza o gráfico
    } else {
        // Cria um novo gráfico se ainda não existir
        divTotalMl = document.getElementById('total_ml_mensal').getContext('2d');
        graficoTotalMl = new Chart(divTotalMl, {
            type: 'bar',
            data: {
                labels: labelTotalValue,
                datasets: [
                    {
                        type: 'bar',
                        label: "Gasto Mensal",
                        data: valueTotalValue,
                        backgroundColor: '#FEA30150',
                        borderColor: '#FEA301',
                        borderWidth: 1,
                    },
                    {
                        type: 'line',
                        label: "Total Acumulado",
                        data: valueTotalValue.map((value, index) =>
                            valueTotalValue.slice(0, index + 1).reduce((acc, curr) => acc + curr, 0)
                        ),
                        borderColor: '#0288D1',
                        backgroundColor: '#0288D150',
                        fill: false,
                        tension: 0.4,
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
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