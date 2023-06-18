'use strict';

const input = document.querySelector('.input');
const selection = document.querySelector('.selection');
const btn = document.querySelector('.btn');
const listWork = document.querySelector('.list-work');
const listSchool = document.querySelector('.list-school');
const listHome = document.querySelector('.list-home');
const listImportant = document.querySelector('.list-imp');
const listOther = document.querySelector('.list-other');

const errorSection = document.querySelector('.error-sec');
const errorMsg = document.querySelector('.error-msg');
const successSection = document.querySelector('.success-sec');
const successMsg = document.querySelector('.success-msg');

const data = document.querySelector('.data');

// ERROR message
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

// Success message
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

let work = false,
  school = false,
  important = false,
  home = false,
  other = false;

btn.addEventListener('click', function () {
  if (!input.value) renderError('Please Write something to add a Task');
  else if (input.value.trim() === '')
    renderError('Please Write something Not Spaces');
  else if (input.value.trim().length < 3)
    renderError('Minimum length of task should be 3');
  else {
    if (selection.value === 'Work') {
      if (work === false) {
        listWork.insertAdjacentHTML('beforebegin', heading(selection.value));
        work = true;
      }
      listWork.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(`(${input.value}) Task Added in (Workload) Section `);
    } else if (selection.value === 'School') {
      if (school === false) {
        listSchool.insertAdjacentHTML('beforebegin', heading(selection.value));
        school = true;
      }
      listSchool.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(
        `(${input.value}) Task Added in (${selection.value}) Section `
      );
    } else if (selection.value === 'Home') {
      if (home === false) {
        listHome.insertAdjacentHTML('beforebegin', heading(selection.value));
        home = true;
      }
      listHome.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(
        `(${input.value}) Task Added  in (${selection.value}) Section `
      );
    } else if (selection.value === 'Important') {
      if (important === false) {
        listImportant.insertAdjacentHTML(
          'beforebegin',
          heading(selection.value)
        );
        important = true;
      }
      listImportant.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(
        `(${input.value}) Task Added  in (${selection.value}) Section `
      );
    } else if (selection.value === 'Other') {
      if (other === false) {
        listOther.insertAdjacentHTML('beforebegin', heading(selection.value));
        other = true;
      }
      listOther.insertAdjacentHTML('afterbegin', html(input.value));
      rendersuccess(
        `(${input.value}) Task Added  in (${selection.value}) Section `
      );
    }
    input.value = '';
  }
});

data.addEventListener('click', function (e) {
  const listItem = e.target.closest('.list-item');
  if (!listItem) return;
  const dot = listItem.querySelector('.dot');
  if (listItem.style.textDecoration !== 'line-through') {
    listItem.style.textDecoration = 'line-through';
    listItem.style.color = 'var(--DARK-COLOR)';
    dot.style.border = '6px solid var(--DARK-COLOR)';
    rendersuccess(` (${listItem.textContent.trim()}) Task Completed `);
  } else {
    listItem.style.textDecoration = 'none';
    listItem.style.color = '#fff';
    dot.style.border = '1px solid';
    rendersuccess(`(${listItem.textContent.trim()}) Task Recovered `);
  }
});

data.addEventListener('click', function (e) {
  const task = e.target.closest('.task');
  if (!task) return;
  const closeBtn = task.querySelector('.close');
  const data = task.querySelector('li');
  closeBtn.addEventListener('click', function () {
    data.style.display = 'none';
    closeBtn.style.display = 'none';
    rendersuccess('Task Deleted  ');
  });
});

// Changing Theme of app
function changeColorBlue() {
  document.documentElement.style.setProperty('--DARK-COLOR', 'rgb(49, 5, 87)');
  document.documentElement.style.setProperty('--BG-COLOR', '#dbbef7');
  document.documentElement.style.setProperty(
    '--APP-COLOR',
    'rgba(131, 66, 191, 0.432)'
  );
}
function changeColorGreen() {
  document.documentElement.style.setProperty('--DARK-COLOR', 'rgb(5, 87, 16)');
  document.documentElement.style.setProperty('--BG-COLOR', '#c3f7be');
  document.documentElement.style.setProperty(
    '--APP-COLOR',
    'rgba(66, 191, 66, 0.315)'
  );
}
function changeColorRed() {
  document.documentElement.style.setProperty('--DARK-COLOR', 'rgb(129, 6, 6)');
  document.documentElement.style.setProperty('--BG-COLOR', '#f7bebe');
  document.documentElement.style.setProperty(
    '--APP-COLOR',
    'rgba(191, 66, 66, 0.315)'
  );
}
function changeColorYellow() {
  document.documentElement.style.setProperty('--DARK-COLOR', 'rgb(87, 79, 5)');
  document.documentElement.style.setProperty('--BG-COLOR', '#f7f6be');
  document.documentElement.style.setProperty(
    '--APP-COLOR',
    'rgba(191, 183, 66, 0.418)'
  );
}

// copyright linking
const copyright = document.querySelector('.copyright');
const copyHtml = `
        &copy; All Rights Reserved. Owner:
        <span class="name" onclick="linkedin()">Nouman Ejaz</span>`;
copyright.insertAdjacentHTML('afterbegin', copyHtml);

function linkedin() {
  window.open('https://www.linkedin.com/in/chnoumanejaz/', '_blank');
}
