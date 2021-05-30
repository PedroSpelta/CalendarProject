/* eslint-disable require-jsdoc */

function createDaysOfTheWeek() {
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const weekDaysList = document.querySelector('.week-days');

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement('li');
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  };
};

createDaysOfTheWeek();

// Escreva seu código abaixo.
// /////////////////////////////////////////////////////////////////////////////

// exercicio 1
const dezDaysList = [29, 30, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const dezHolidays = [24, 25, 31];
createDaysOfMonth(dezDaysList, dezHolidays);

function createDaysOfMonth(monthList, holiDays) {
  const dayList = document.querySelector('#days');
  let holiCount = 0;
  for (index = 0; index < monthList.length; index += 1) {
    const insertDay = document.createElement('li');
    insertDay.setAttribute('class', 'day');
    insertDay.innerText = monthList[index];
    if ((index+2)%7 === 0) {
      insertDay.classList.add('friday');
    }
    if (monthList[index] === holiDays[holiCount]) {
      insertDay.classList.add('holiday');
      holiCount += 1;
    }
    dayList.appendChild(insertDay);
  }
}

// exercicio2
const feriadosButton = dinButton('Feriados', 'btn-holiday');

function dinButton(string, id) {
  const btnContainer = document.querySelector('.buttons-container');
  const btn = document.createElement('button');
  btn.setAttribute('id', id);
  btn.innerText = string;
  btnContainer.appendChild(btn);
  return btn;
}

// exercicio3
feriadosButton.addEventListener('click', holidayColorChanger);
function holidayColorChanger(eventOrigin) {
  const allHolidays = document.querySelectorAll('.holiday');
  if (allHolidays[0].style.backgroundColor === 'lightblue') {
    for (index = 0; index < allHolidays.length; index += 1) {
      allHolidays[index].style.backgroundColor = '#eee';
    }
  } else {
    for (index = 0; index < allHolidays.length; index += 1) {
      allHolidays[index].style.backgroundColor = 'lightblue';
    }
  }
}

// exercicio4
const holidayButton = dinButton('Sexta-feira', 'btn-friday');

// exercicio5
holidayButton.addEventListener('click', fridayTextChanger);
function fridayTextChanger(eventOrigin) {
  const allFridays = document.querySelectorAll('.friday');
  if (allFridays[0].innerText === 'Sexta') {
    for (index = 0; index < allFridays.length; index += 1) {
      const anterior = allFridays[index].previousElementSibling.innerText;
      allFridays[index].innerText = parseInt(anterior) + 1;
    }
  } else {
    for (index = 0; index < allFridays.length; index += 1) {
      allFridays[index].innerText = 'Sexta';
    }
  }
}

// exercicio 6
const dayParent = document.querySelector('.day').parentElement;
for (day of dayParent.children) {
  day.addEventListener('mouseenter', zoomIn);
  day.addEventListener('mouseleave', zoomOff);
}
function zoomIn(originEvent) {
  originEvent.target.style.fontSize = '26px';
  originEvent.target.style.fontWeight = 'bold';
}
function zoomOff(originEvent) {
  originEvent.target.style.fontSize = '20px';
  originEvent.target.style.fontWeight = '500';
}

// exercicio 7
taskCreator('cozinhar');
function taskCreator(string) {
  const myTask = document.querySelector('.my-tasks');
  const element = document.createElement('span');
  element.innerText = string;
  myTask.appendChild(element);
}

// exercicio 8
addLegendColorToTask('green');
function addLegendColorToTask(stringColor) {
  const myTask = document.querySelector('.my-tasks');
  const div = document.createElement('div');
  div.setAttribute('class', 'task');
  div.style.backgroundColor = stringColor;
  myTask.appendChild(div);
}

// exercicio 9
addEventTaskSelected();
function addEventTaskSelected() {
  const allTasks = document.querySelectorAll('.task');
  for (task of allTasks) {
    task.addEventListener('click', selectTask);
  }
}

function selectTask(originEvent) {
  const list = originEvent.target.classList;
  if (list.length < 2) list.add('selected');
  else list.remove('selected');
}

// exercicio 10
addEventDaySelected();
function addEventDaySelected() {
  const days = document.querySelectorAll('.day');
  for (day of days) {
    day.addEventListener('click', daySelect);
  }
}

function daySelect(eventOrigin) {
  const selected = document.querySelector('.selected');
  if (selected !== null && eventOrigin.target.style.color === selected.style.backgroundColor) {
    eventOrigin.target.style.color = '#777';
    eventOrigin.target.classList.remove('day-selected');
  } else if (selected !== null) {
    eventOrigin.target.style.color = selected.style.backgroundColor;
    eventOrigin.target.classList.add('day-selected');
  }
}

// bonus
const addAppointmentButton = document.querySelector('#btn-add');
const appointmentText = document.querySelector('#task-input');
const appointList = document.querySelector('.task-list');
const missingText = 'Não é possível adicionar compromisso vazio';
addAppointmentButton.addEventListener('click', addAppointment);
appointmentText.addEventListener('keypress', verifyEnterAppointment);
function addAppointment(eventOrigin) {
  const appointment = document.createElement('li');
  if (appointmentText.value === '') return alert(missingText);
  else {
    appointment.innerText = appointmentText.value;
    appointList.appendChild(appointment);
    appointmentText.value = '';
  }
}
function verifyEnterAppointment(eventOrigin) {
  const keyPressed = eventOrigin.which || eventOrigin.keyCode;
  if (keyPressed === 13) return addAppointment(eventOrigin);
}
