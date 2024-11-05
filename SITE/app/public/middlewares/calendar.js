const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  // eventDate = document.querySelector(".event-date"),
  eventDate = document.getElementById("dia-evento"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

var path = window.location.pathname;
var fileName = path.split("/").pop();

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
gerarBagulhoAi();
function gerarBagulhoAi(){
  if(fileName != "agendar.html"){
    eventsArr = [
      {
        day: 6,
        month: 11,
        year: 2024,
        events: [
          {
            fazenda: "Fazenda X",
            quantidadeMl: "500 mL",
          },
          {
            fazenda: "Fazenda Y",
            quantidadeMl: "5000 mL",
          },
        ],
      },
      {
        day: 19,
        month: 11,
        year: 2024,
        events: [
          {
            fazenda: "Fazenda Z",
            quantidadeMl: "300 mL",
          },
          {
            fazenda: "Fazenda A",
            quantidadeMl: "5200 mL",
          },
        ],
      },
      {
        day: 29,
        month: 11,
        year: 2024,
        events: [
          {
            fazenda: "Fazenda B",
            quantidadeMl: "800 mL",
          },
        ],
      }
    ];
  }
}

// getEvents();

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      // updateEvents(i)
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

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
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

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      activeDay = Number(e.target.innerHTML);
      // updateEvents(Number(e.target.innerHTML));
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  // eventDay.innerHTML = dayName;

  if(fileName != "agendar.html"){
    eventDate.innerHTML = date + " " + months[month] + " " + year;
  }
}

// function updateEvents(date) {
//   let events = "";
//   eventsArr.forEach((event) => {
//     if (
//       date === event.day
//     ) {
//       console.log("bumbum")
//       event.events.forEach((event) => {
//         events += `
//           <div class="event">
//               <div>
//                   <h3 class="event-title">Fazenda X</h3>
//                   <span class="event-time">-</span>
//                   <span class="event-time">500 mL</span>
//               </div>
//               <div>
//                   <h3 class="event-icon">
//                       <i class="fa-solid fa-clipboard-list"></i>
//                   </h3>
//               </div>
//           </div>
//         `;
//       });
//     }
//   });
//   if (events === "") {
//       events = `
//         <div class="no-event">
//           <h3>No Events</h3>
//         </div>
//       `;
//   }
//   if(fileName != "agendar.html"){
//     eventsContainer.innerHTML = events;
//   }
// }

// //function to get events from local storage
// function getEvents() {
//   //check if events are already saved in local storage then return event else nothing
//   if (localStorage.getItem("events") === null) {
//     return;
//   }
//   eventsArr.push(...JSON.parse(localStorage.getItem("events")));
// }