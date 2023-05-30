'use strict';

// getting all the elements to work on

// labels and the input fields to get the data
//  get labels because i have to hide them on the click and show them as well.
const userNameLabel = document.querySelector('.name-label');
const userName = document.getElementById('name');

const userTipLabel = document.querySelector('.tip-label');
const userTip = document.getElementById('tip%');

const userBill = document.getElementById('bill');
const calculateBtn = document.querySelector('.submitbtn');

// for the buttons to change/configure the name and tip amount %
const tipConfigBtn = document.querySelector('.tipbtn');
const nameConfigBtn = document.querySelector('.namebtn');
const configBox = document.querySelector('.configbtn');

const dataTabel = document.querySelector('.data');
// for result to show in the tabel after caculations
const showTip = document.querySelector('.consoletip');
const showBill = document.querySelector('.consolebill');
const showTipCalc = document.querySelector('.consoletipamount');
const showTotal = document.querySelector('.consoletotal');
const showName = document.querySelector('.consolename');
// for errors
const showError = document.querySelector('.error');
const showError2 = document.querySelector('.error2');

// working on the click of calculate
const showAndHideData = function () {
  if (!Number(userBill.value) || !Number(userTip.value)) {
    showError.classList.remove('hidden');
    dataTabel.classList.add('hidden');
    showError2.classList.add('hidden');
  } else {
    if (Number(userBill.value) < 1 || Number(userTip.value) < 1) {
      showError2.classList.remove('hidden');
      showError.classList.add('hidden');
      dataTabel.classList.add('hidden');
    } else {
      showError.classList.add('hidden');
      showError2.classList.add('hidden');
      userName.classList.add('hidden');
      userTip.classList.add('hidden');
      userNameLabel.classList.add('hidden');
      userTipLabel.classList.add('hidden');
      configBox.classList.remove('hidden');
      tipConfigBtn.classList.remove('hidden');
      nameConfigBtn.classList.remove('hidden');
      dataTabel.classList.remove('hidden');
      calculateTip();
    }
  }
};

// calculaion of tip based on user values of tip% and bill amount
function calculateTip() {
  const tipCal = (Number(userBill.value) / 100) * Number(userTip.value);
  const totalBill = tipCal + Number(userBill.value);
  showName.textContent = !userName.value ? 'Dear,' : userName.value;
  showTip.textContent = `${Number(userTip.value)}%`;
  showBill.textContent = `${Number(userBill.value)}$`;
  showTipCalc.textContent = `${tipCal}$`;
  showTotal.textContent = `${totalBill}$`;
}

// main body + function above
// calculate button function
calculateBtn.addEventListener('click', showAndHideData);

// tip configuration button function
// if user wants to change the amount of tip
tipConfigBtn.addEventListener('click', function () {
  userTipLabel.classList.remove('hidden');
  userTip.classList.remove('hidden');
  tipConfigBtn.classList.add('hidden');
});

// name configuration button function
// if user wants to change the amount of name
nameConfigBtn.addEventListener('click', function () {
  userNameLabel.classList.remove('hidden');
  userName.classList.remove('hidden');
  nameConfigBtn.classList.add('hidden');
});
