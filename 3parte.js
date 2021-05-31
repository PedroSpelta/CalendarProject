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

// criando a lista de dias do mês, index é o dia. o valor é o dia da semana
function getDaysInMonth(year, month) {
  month -= 1;
  let date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days.push (date.getDay())
    date.setDate(date.getDate()+1);
  }
  return getMonthList(days)
}

//retorna a lista de dias do mês começando com ' ' até iniciar o mẽs de fato
function getMonthList (weekdaysList) {
  let missingDays = weekdaysList[0];
  let monthList = [];
  let day = 1;
  for (let index = 0; index < missingDays; index += 1) {
    monthList.push(' ')
  }
  for (weekDay of weekdaysList) {
    monthList.push(day)
    day += 1;
  }
  return monthList
}

//funcao para trocar o mês
const previousMonth = document.querySelector('#previous-month');
const nextMonth = document.querySelector('#next-month');
nextMonth.addEventListener('click', changeMonth);
function changeMonth(type) {
  if (month < 12) {
    console.log('teste')
    month += 1;
    const DaysList = getDaysInMonth(year, month);
    const Holidays = [24, 25, 31];
    removeDays()
    createDaysOfMonth(DaysList, Holidays);
  } else {
    year += 1;
    const DaysList = getDaysInMonth(year, month);
    const Holidays = [24, 25, 31];
    createDaysOfMonth(DaysList, Holidays);
  }
}

var month = 5;
var year = 2021;
const DaysList = getDaysInMonth(2021, 5);
const Holidays = [24, 25, 31];
createDaysOfMonth(DaysList, Holidays);

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
  if (allFridays[1].innerText === 'Sexta') {
    for (index = 0; index < allFridays.length; index += 1) {
      const proximo = allFridays[index].nextElementSibling.innerText;
      allFridays[index].innerText = parseInt(proximo) - 1;
    }
  } else {
    for (index = 0; index < allFridays.length; index += 1) {
      if (allFridays[index].innerText !== '') {
        allFridays[index].innerText = 'Sexta';
      }
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
  const myTask = document.querySelector('#my-tasks-list');
  const divTask = document.createElement('div');
  const element = document.createElement('div');
  const elementText = document.createElement('p');
  element.setAttribute('class', 'task-text-div');
  elementText.innerText = string;
  element.appendChild(elementText);
  divTask.appendChild(element);
  myTask.appendChild(divTask);
}

// exercicio 8
addLegendColorToTask('green');
function addLegendColorToTask(stringColor) {
  const myTask = document.querySelector('#my-tasks-list').lastChild;
  const div = document.createElement('div');
  div.setAttribute('class', 'task');
  div.style.backgroundColor = stringColor;
  myTask.appendChild(div);
}

// exercicio 9
addEventTaskSelected();
function addEventTaskSelected() {
  const allTasks = document.querySelector('#my-tasks-list');
  allTasks.lastChild.addEventListener('click', selectTask);
}

function selectTask(originEvent) {
  const list = originEvent.target.classList;
  const otherSelected = document.querySelectorAll('.selected')
  if (list.length < 2) list.add('selected');
  else list.remove('selected');
  if (otherSelected.length > 1) otherSelected[1].classList.remove('selected');
  console.log(otherSelected);
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

// Fazendo funcao para adicionar tarefas com cores diferentes
const addTaskButton = document.querySelector('#my-tasks-add-button')
addTaskButton.addEventListener('click', newTask);

function newTask(originEvent) {
  const colors = '#70C1B3 #B2DBBF #F3FFBD #FF1654'.split(' ')
  const colorsArray = Array(4).fill(colors).flat()
  var text = document.querySelector('#my-tasks-input')
  const list = document.querySelector('#my-tasks-list').children
  taskCreator(text.value);
  addLegendColorToTask(colorsArray[list.length-1]);
  console.log(list);
  text.value = '';
  addEventTaskSelected()
}

// //criando o mês
// const date = Date.now()
