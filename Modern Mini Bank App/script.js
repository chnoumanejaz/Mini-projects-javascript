'use strict';

// Mini Bank APP - For Practice - Arrays and methods
// getting the language from the users browser - to foramte the date accordingly
const localeLanguage = navigator.language;

// Accounts Data
const account1 = {
  owner: 'Nouman Ejaz',
  movements: [200, 450, -400, 32000, -650, -10, 70, 1300, -4130, 170, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-05-27T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-05-28T10:51:36.790Z',
    '2023-05-30T14:11:59.604Z',
    '2023-06-01T10:17:24.185Z',
    '2023-06-02T14:11:59.604Z',
  ],
};

const account2 = {
  owner: 'Sarah Ali Khan',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2023-06-01T16:33:06.386Z',
    '2023-06-02T14:18:46.235Z',
  ],
};

const accounts = [account1, account2];

// Elements
const credentialsMsg = document.querySelector('.aboutmessage');
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// main working
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// setting the username - first word of the owner is his/her username
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').slice(0, 1).join('');
  });
};
// user name using the first letters from the words of the whole name
/*
const createUserNames = function (accs) {
  accs.forEach(function(acc)
  {
    acc.userName = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  })
};
*/
createUserNames(accounts);

// calculating the date and days for the movements or transactions
const calcDisplayDate = function (date) {
  const calcDays = (curdate, pastdate) =>
    Math.round(Math.abs(pastdate - curdate) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDays(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'yestarday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(localeLanguage).format(date);
  }
};

// formate the currency for any value
const formatCurrency = function (value) {
  return Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// displaying the dummy data on the page using javaScript
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  //  sorting the data if user clicks the sort button
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = calcDisplayDate(date);

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date"> ${displayDate} </div>
      <div class="movements__value">${formatCurrency(mov)}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// calculating and displaying the current balance of account using reduce method of arrays
// if the person got any bonus then it will me added to his/her account
const bonus = 0;
const displayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, bonus);
  labelBalance.textContent = `${formatCurrency(account.balance)}`;
};

// displaying all the values in the ssummary , total deposits, total withdraw and interest
const displaySummary = function (movements) {
  const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCurrency(incomes)}`;

  const outcomes = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCurrency(Math.abs(outcomes))}`;

  // calculating the 10% interest on the total deposits
  // just for learning - obviously there is nothing like that 😆😆
  const interest =
    currentAccount.movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov * currentAccount.interestRate) / 100;
  labelSumInterest.textContent = `${formatCurrency(interest)}`;
};

// updating the ui
const updateUi = function (account) {
  // display movements
  displayMovements(account);
  // display balance
  displayBalance(account);
  // display summary
  displaySummary(account.movements);
};

// show date and time under the current balance
// international  dates  format

const showDateTime = function () {
  const start = function () {
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'short',
    };
    labelDate.textContent = new Intl.DateTimeFormat(localeLanguage, options).format(now);
  };
  start();
  setInterval(start, 3000);
};

// set the timer when the user logged in to the app
// Let Say 😀 after 2 minutes user will get logged out

const startLogoutTimer = function () {
  let time = 120;
  const tick = function () {
    const minute = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${minute}:${second}`;

    // logout if timer is 0
    if (time === 0) {
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
      clearInterval(timer);
      // hidding credentials msg
      credentialsMsg.classList.remove('hidden');
    } else if (time === 20)
      alert(
        `${currentAccount.owner}, Your Session will be Expired after ${time} Seconds. 🙂\n if you are inactive. 😪`
      );
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event Handlers
let counter = 0;
// login to the account functionality
let currentAccount, timer;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    account => account.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // hidding credentials msg
    credentialsMsg.classList.add('hidden');
    // Display Ui message welcome
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    inputLoginPin.blur();
    inputLoginUsername.blur();
    // clearing the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // setting and displaying the date under current balance
    showDateTime();

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    // updating the Ui
    updateUi(currentAccount);
    counter = 0;
  } else if (!inputLoginUsername.value || !inputLoginPin.value)
    alert('Please fill out both fields 🙄');
  else alert('The User Name or Pin is wrong! ⚠');
});

// transfer amount functionality
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferTo = accounts.find(acc => acc.userName === inputTransferTo.value);

  // making the form clean
  inputTransferTo.value = inputTransferAmount.value = '';
  // inputTransferTo.blur();
  inputTransferAmount.blur();
  // validations and checks of the accounts and the balance that the userwant to transfer
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    transferTo &&
    transferTo.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);

    // pushing the date aswell
    currentAccount.movementsDates.push(new Date().toISOString());
    transferTo.movementsDates.push(new Date().toISOString());
    // updating the Ui
    updateUi(currentAccount);
    // if user perform activity on the account then there is noo automatic logout happen
    clearInterval(timer);
    timer = startLogoutTimer();
  } else if (amount < 0) alert('Not valid! ⚠ Please Enter Correct Amount.');
  else if (amount > currentAccount.balance)
    alert('Not valid! ⚠ You dont have Enough Money.');
  else if (!transferTo) alert(`Not valid! ⚠ This Account does not exist`);
  else if (transferTo.userName === currentAccount.userName)
    alert('Not valid! ⚠ You cannot transfer to your account.');
});

// deleting the account
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);
    accounts.splice(index, 1);
    inputClosePin.value = inputCloseUsername.value = '';
    inputClosePin.blur();
    inputCloseUsername.blur();
    // hidding credentials msg
    credentialsMsg.classList.remove('hidden');
    // Hide Ui message
    labelWelcome.textContent = `Log in to get started`;
    containerApp.style.opacity = 0;

    alert(`The account of (${currentAccount.owner}) is deleted 🙂`);
  } else {
    alert('The pin or User Name is wrong! ⚠');
  }
});

// requesting the loan if the account has 10% deposit of the requested amount
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  // if (amount > 0 && currentAccount.movements.some(movement => movement  >= amount * 0.1)) {
  if (amount > 0 && currentAccount.balance >= amount * 0.2) {
    counter++;
    if (counter < 2) {
      alert(
        'Loan Request sent! ✅ \nIt Will get added to your account once it get approved in 5-10 Seconds 💌'
      );
      setTimeout(function () {
        currentAccount.movements.push(amount);
        // pushing the date aswell
        currentAccount.movementsDates.push(new Date().toISOString());

        // updating the Ui
        updateUi(currentAccount);
      }, 7500);
    } else
      alert('Sorry 😥\nYou cannot get more loan.\nclear your previous loan to get new.');
  } else if (amount <= 0) alert(`Please Enter valid amount ⚠`);
  else
    alert(
      `You cannot request that big Amount. 🤨\n you don't have enough Deposite to get this Loan.`
    );
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
  // if user perform activity on the account then there is noo automatic logout happen
  clearInterval(timer);
  timer = startLogoutTimer();
});

// sorting the movements or transactions data
let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// testing purpose direct login
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 1;
