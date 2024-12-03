// Seleciona os elementos do DOM relacionados ao calendário e eventos
const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.getElementById("dia-evento"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

// Define a data atual
let activeDay;
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

// Captura o nome do arquivo da URL atual
var path = window.location.pathname;
var fileName = path.split("/").pop();

// Array com os meses em português
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

let eventsArr = [];

function diasRecomendadosAgendar(previsaoPorDia) {
  Object.entries(previsaoPorDia).forEach(([data, dia]) => {

    const newData = {
      temp_max: dia.temperatura_maxima,
      temp_min: dia.temperatura_minima,
      umidade: dia.umidade[0], // Supondo que você quer a primeira umidade da lista
      pop: dia.probabilidade_chuva
    };

    const [day, month, year] = data.split("/"); // Separando a data em partes

    eventsArr.push({
      day: day,
      month: parseInt(month), // Garantindo que o mês seja numérico
      year: year,
      data: [newData],
    });
  });
}

function updateEvents(date) {
  eventsArr.forEach((event) => {
    if (
      date === Number(event.day) &&
      month + 1 === event.month &&
      year === Number(event.year)
    ) {
      document.getElementById('temperatura').textContent = `${event.data[0].temp_max.toFixed(0)}°C`;
      document.getElementById('umidade').textContent = `${event.data[0].umidade}%`;
      document.getElementById('chanceChuva').textContent = `${(event.data[0].pop * 100).toFixed(0)}%`;

      temperaturaAtual = event.data[0].temp_max.toFixed(0);
      umidadeAtual = event.data[0].umidade;
      popAtual = (event.data[0].pop * 100);
      diaAtual = `${event.year}-${event.month}-${event.day}`
    }
  });
}

function markEventDays() {
  const days = document.querySelectorAll('.day');

  days.forEach((dayEl) => {
    const day = Number(dayEl.textContent); // Pega o dia exibido no elemento

    eventsArr.forEach((event) => {
      if (
        day === Number(event.day) &&
        month + 1 === event.month && // Verifica o mês atual
        year === Number(event.year) // Verifica o ano atual
      ) {
        if(event.data[0].pop <= 0.3){
          dayEl.classList.add('event'); // Adiciona a classe 'event' ao dia correspondente
        }
      }
    });
  });
}

// Função para inicializar o calendário
function initCalendar() {
  const firstDay = new Date(year, month, 1); // Primeiro dia do mês
  const lastDay = new Date(year, month + 1, 0); // Último dia do mês
  const prevLastDay = new Date(year, month, 0); // Último dia do mês anterior
  const prevDays = prevLastDay.getDate(); // Quantidade de dias do mês anterior
  const lastDate = lastDay.getDate(); // Quantidade de dias no mês atual
  const day = firstDay.getDay(); // Dia da semana do primeiro dia
  const nextDays = 7 - lastDay.getDay() - 1; // Quantidade de dias do próximo mês a exibir

  // Define o texto da data atual no calendário
  date.innerHTML = months[month] + " " + year;

  let days = "";

  // Adiciona os dias do mês anterior
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Adiciona os dias do mês atual
  for (let i = 1; i <= lastDate; i++) {
    let event = false;
    // Verifica se o dia atual possui eventos
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    // Verifica se é o dia de hoje
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i); // Marca o dia ativo
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  // Adiciona os dias do próximo mês
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days; // Atualiza o container com os dias
  addListner(); // Adiciona eventos de clique nos dias
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// Eventos de clique para os botões de navegação
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// Inicializa o calendário
initCalendar();

// Função para obter o dia ativo
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  // Atualiza o texto do elemento de evento
  if (fileName != "agendar.html") {
    eventDate.innerHTML = date + " " + months[month] + " " + year;
  }
}