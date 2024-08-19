const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to"),
  addEventSubmit = document.querySelector(".add-event-btn");

// Lista de feriados
const holidays = [
  { day: 1, month: 1, year: 2024, name: "Ano Novo" },
  { day: 9, month: 2, year: 2024, name: "Carnaval" },
  { day: 10, month: 2, year: 2024, name: "Carnaval" },
  { day: 11, month: 2, year: 2024, name: "Carnaval" },
  { day: 12, month: 2, year: 2024, name: "Carnaval" },
  { day: 13, month: 2, year: 2024, name: "Carnaval" },
  { day: 14, month: 2, year: 2024, name: "Quarta-feira de Cinzas" },
  { day: 29, month: 3, year: 2024, name: "Sexta-feira Santa" },
  { day: 31, month: 3, year: 2024, name: "Domingo de Páscoa" },
  { day: 21, month: 4, year: 2024, name: "Tiradentes" },
  { day: 1, month: 5, year: 2024, name: "Dia do Trabalhador" },
  { day: 12, month: 5, year: 2024, name: "Dia das Mães" },
  { day: 30, month: 5, year: 2024, name: "Corpus Christi" },
  { day: 11, month: 8, year: 2024, name: "Dia dos Pais" },
  { day: 7, month: 9, year: 2024, name: "Independência do Brasil" },
  { day: 12, month: 10, year: 2024, name: "Nossa Senhora Aparecida" },
  { day: 2, month: 11, year: 2024, name: "Finados" },
  { day: 15, month: 11, year: 2024, name: "Proclamação da República" },
  { day: 24, month: 12, year: 2024, name: "Véspera de Natal" },
  { day: 25, month: 12, year: 2024, name: "Natal" }
];

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

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

const eventsArr = [];
getEvents();
console.log(eventsArr);

// Função para inicializar o calendário
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
    let event = false;
    let holiday = false;
    let holidayName = '';

    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });

    holidays.forEach((holidayObj) => {
      if (
        holidayObj.day === i &&
        holidayObj.month === month + 1 &&
        holidayObj.year === year
      ) {
        holiday = true;
        holidayName = holidayObj.name;
      }
    });

    let dayClass = '';
    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      dayClass = event ? 'today active event' : 'today active';
    } else {
      dayClass = event ? 'event' : '';
    }

    if (holiday) {
      dayClass += ' holiday';
    }

    days += `<div class="day ${dayClass}" data-holiday="${holidayName}">${i}</div>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

// Funções para navegar pelos meses
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

// Função para adicionar classe ativa no dia
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(Number(e.target.innerHTML));
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      // Remove a classe ativa
      days.forEach((day) => {
        day.classList.remove("active");
      });
      // Se clicar em uma data do mês anterior ou próximo, mudar para aquele mês
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
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

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Data inválida");
}

// Função para adicionar eventos
function updateEvents(date) {
  let events = "";
  let isHoliday = false;
  let holidayName = "";

  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });

  holidays.forEach((holiday) => {
    if (
      holiday.day === date &&
      holiday.month === month + 1 &&
      holiday.year === year
    ) {
      isHoliday = true;
      holidayName = holiday.name;
    }
  });

  // Se houver feriado, adicione-o à lista de eventos
  if (isHoliday) {
    events += `<div class="event holiday-event">
        <div class="title">
          <i class="fas fa-circle"></i>
          <h3 class="event-title">${holidayName}</h3>
        </div>
        <div class="event-time">
          <span class="event-time">Feriado</span>
        </div>
    </div>`;
  }

  // Se não houver eventos
  if (events === "") {
    events = `<div class="no-event">
            <h3>Sem eventos</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
}

// Função para obter eventos
function getEvents() {
  const eventsLocal = localStorage.getItem("events");
  if (eventsLocal) {
    eventsArr.push(...JSON.parse(eventsLocal));
  }
}

// Função para salvar eventos
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Função para obter o dia ativo e os eventos
function getActiveDay(day) {
  const dateObj = new Date(year, month, day);
  const dayOfWeek = getDayOfWeek(dateObj);
  eventDay.innerHTML = dayOfWeek; // Exibe o dia da semana
  eventDate.innerHTML = `${day}/${month + 1}/${year}`;
}

// Função para obter o dia da semana
function getDayOfWeek(date) {
  const daysOfWeek = [
    "Domingo", "Segunda-feira", "Terça-feira",
    "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
  ];
  return daysOfWeek[date.getDay()];
}

// Adicionar evento
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.add("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

addEventSubmit.addEventListener("click", () => {
  if (addEventTitle.value === "" || addEventFrom.value === "" || addEventTo.value === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  eventsArr.push({
    day: activeDay,
    month: month + 1,
    year: year,
    events: [
      {
        title: addEventTitle.value,
        time: `${addEventFrom.value} - ${addEventTo.value}`
      }
    ]
  });

  saveEvents();
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  addEventWrapper.classList.remove("active");
  initCalendar();
});

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}