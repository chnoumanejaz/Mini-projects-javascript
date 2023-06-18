'use strict';
// getting the data at page reload from local storage
function showData() {
  const lists = localStorage.getItem('list');
  if (lists) {
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';
    listContainer.insertAdjacentHTML('afterbegin', lists);
  }
}
showData();

// -------------------------
// Elements management
// ------------------------
// Selection of all neccessary html elements
const input = document.querySelector('.input');
const selection = document.querySelector('.selection');
const btn = document.querySelector('.btn');
const listWork = document.querySelector('.list-work');
const listSchool = document.querySelector('.list-school');
const listHome = document.querySelector('.list-home');
const listImportant = document.querySelector('.list-imp');
const listOther = document.querySelector('.list-other');

// for errors and success Messages
const errorSection = document.querySelector('.error-sec');
const errorMsg = document.querySelector('.error-msg');
const successSection = document.querySelector('.success-sec');
const successMsg = document.querySelector('.success-msg');

// main container where all the tasks stored
// handling tasks by event delegation
const data = document.querySelector('.data');

// -------------------------
// functions management
// ------------------------
// ERROR message styling
const renderError = function (msg) {
  errorSection.style.filter = 'none';
  errorMsg.textContent = msg;
  errorSection.style.transform = 'translateX(.5rem)';
  setTimeout(function () {
    errorSection.style.filter = 'blur(200px)';
    setTimeout(function () {
      errorSection.style.transform = 'translateX(-400rem)';
      setTimeout(function () {
        errorSection.style.filter = 'none';
      }, 300);
    }, 300);
  }, 2000);
};

// Success message styling
const rendersuccess = function (msg) {
  successSection.style.filter = 'none';
  successMsg.textContent = msg;
  successSection.style.transform = 'translateX(.5rem)';
  setTimeout(function () {
    successSection.style.filter = 'blur(200px)';
    setTimeout(function () {
      successSection.style.transform = 'translateX(-400rem)';
      setTimeout(function () {
        successSection.style.filter = 'none';
      }, 300);
    }, 300);
  }, 2000);
};

// some html to render on page when there is new task added by the user
function html(data) {
  return `<div class="task">
            <li class="list-item">
                <span class="dot"></span>
            ${data}
            </li>
            <span class="close">&times;</span>
        </div>
        `;
}

// html to render for the task heading
function heading(text) {
  if (text === 'Work') {
    return `
    <h3>${text}load</h3>
    `;
  } else {
    return `
          <h3>${text}</h3>
          `;
  }
}

//  checking the headings of the task if already exists then there is no other heading
const handelHeading = function (parent, value) {
  const head = document.querySelector(`.${parent}`);
  head.innerHTML = '';
  head.innerHTML = heading(value);
};

// deleting the heading if there is no task
function clearHeading(list, header) {
  if (list.innerHTML.trim() === '') {
    const head = document.querySelector(`.${header}`);
    head.innerHTML = '';
  }
}
clearHeading(listWork, 'head-work');
clearHeading(listSchool, 'head-school');
clearHeading(listHome, 'head-home');
clearHeading(listImportant, 'head-imp');
clearHeading(listOther, 'head-other');

// -------------------------
// Event Handlers management
// ------------------------
// handling button and validating everything affter clicking the button
btn.addEventListener('click', function () {
  if (!input.value) renderError('Please Write something to add a Task');
  else if (input.value.trim() === '')
    renderError('Please Write something Not Spaces');
  else if (input.value.trim().length < 3)
    renderError('Minimum length of task should be 3');
  else {
    // storing data for workload Tasks
    if (selection.value === 'Work') {
      handelHeading('head-work', selection.value);
      listWork.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(`(${input.value}) Task Added in (Workload) Section `);
    } else if (selection.value === 'School') {
      // storing data for School Tasks
      handelHeading('head-school', selection.value);
      listSchool.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(
        `(${input.value}) Task Added in (${selection.value}) Section `
      );
    } else if (selection.value === 'Home') {
      // storing data for Home Tasks
      handelHeading('head-home', selection.value);
      listHome.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(
        `(${input.value}) Task Added  in (${selection.value}) Section `
      );
    } else if (selection.value === 'Important') {
      // storing data for Important Tasks
      handelHeading('head-imp', selection.value);
      listImportant.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(
        `(${input.value}) Task Added  in (${selection.value}) Section `
      );
    } else if (selection.value === 'Other') {
      // storing data for Other Tasks
      handelHeading('head-other', selection.value);
      listOther.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(
        `(${input.value}) Task Added  in (${selection.value}) Section `
      );
    }
    // clearing the input field after task added to the list
    input.value = '';

    // save the data in local storage
    saveData();
  }
});

// handling tasks by event delegation
data.addEventListener('click', function (e) {
  const listItem = e.target.closest('.list-item');
  if (!listItem) return;
  const dot = listItem.querySelector('.dot');
  // completing the task changing some styles
  if (listItem.style.textDecoration !== 'line-through') {
    listItem.style.textDecoration = 'line-through';
    listItem.style.color = 'var(--DARK-COLOR)';
    dot.style.border = '6px solid var(--DARK-COLOR)';
    rendersuccess(` (${listItem.textContent.trim()}) Task Completed `);
    saveData();
  } else {
    // Uncomplete the task changing some styles
    listItem.style.textDecoration = 'none';
    listItem.style.color = '#fff';
    dot.style.border = '1px solid';
    rendersuccess(`(${listItem.textContent.trim()}) Task Recovered `);
    saveData();
  }
});

// deleting the task
data.addEventListener('click', function (e) {
  const closeBtn = e.target.closest('.close');
  const parentElemet = e.target.closest('.task');
  if (!closeBtn) return;
  parentElemet.remove();
  saveData();
  // deleting heading if there is no task
  if (listWork.innerHTML.trim() === '') location.reload();
  else if (listSchool.innerHTML.trim() === '') location.reload();
  else if (listImportant.innerHTML.trim() === '') location.reload();
  else if (listHome.innerHTML.trim() === '') location.reload();
  else if (listOther.innerHTML.trim() === '') location.reload();
});

// -------------------------
// local storage management
// ------------------------
// save data to Local Storage
function saveData() {
  localStorage.setItem('list', data.innerHTML);
}

// saving user prefered theme
function saveTheme(color) {
  localStorage.setItem('AppThemeByUser', color);
}

// loading  user theme on  Window reload
function loadTheme() {
  const color = localStorage.getItem('AppThemeByUser');
  if (color === 'blue') loadBlue();
  if (color === 'green') loadGreen();
  if (color === 'red') loadRed();
  if (color === 'yellow') loadYellow();
}
loadTheme();

// -------------------------
// Themes management
// ------------------------
// Changing Theme of app
function changeColorBlue() {
  saveTheme('blue');
  loadBlue();
}
function changeColorGreen() {
  saveTheme('green');
  loadGreen();
}
function changeColorRed() {
  saveTheme('red');
  loadRed();
}
function changeColorYellow() {
  saveTheme('yellow');
  loadYellow();
}

// Availabel Themes
function loadBlue() {
  document.documentElement.style.setProperty('--DARK-COLOR', 'rgb(49, 5, 87)');
  document.documentElement.style.setProperty('--BG-COLOR', '#dbbef7');
  document.documentElement.style.setProperty(
    '--APP-COLOR',
    'rgba(131, 66, 191, 0.432)'
  );
}

function loadGreen() {
  document.documentElement.style.setProperty('--DARK-COLOR', 'rgb(5, 87, 16)');
  document.documentElement.style.setProperty('--BG-COLOR', '#c3f7be');
  document.documentElement.style.setProperty(
    '--APP-COLOR',
    'rgba(66, 191, 66, 0.315)'
  );
}

function loadRed() {
  document.documentElement.style.setProperty('--DARK-COLOR', 'rgb(129, 6, 6)');
  document.documentElement.style.setProperty('--BG-COLOR', '#f7bebe');
  document.documentElement.style.setProperty(
    '--APP-COLOR',
    'rgba(191, 66, 66, 0.315)'
  );
}

function loadYellow() {
  document.documentElement.style.setProperty('--DARK-COLOR', 'rgb(87, 79, 5)');
  document.documentElement.style.setProperty('--BG-COLOR', '#f7f6be');
  document.documentElement.style.setProperty(
    '--APP-COLOR',
    'rgba(191, 183, 66, 0.418)'
  );
}

// ------------------------
// copyright linking
const copyright = document.querySelector('.copyright');
const copyHtml = `
        &copy; All Rights Reserved. Owner:
        <span class="name" onclick="linkedin()">Nouman Ejaz</span>`;
copyright.insertAdjacentHTML('afterbegin', copyHtml);

function linkedin() {
  window.open('https://www.linkedin.com/in/chnoumanejaz/', '_blank');
}
