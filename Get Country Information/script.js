'use strict';

// I know code is very bad 😂
// All of this is a practicing and learning and implementing and making this mini project
// So, that's why there is messy code and unccessary comments ...
// I will refactor this later

// Selectors
const btn = document.querySelector('.btn-country');
const btnSearch = document.querySelector('.btn-search');
const countriesContainer = document.querySelector('.countries');
const search = document.querySelector('.search');

// functions
const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">Region: ${data.region}</h4>
            <h4 class="country__region">Capital: ${data.capital}</h4>
            <h4 class="country__region margin-bottom">Time Zone: ${
              data.timezones[0]
            }</h4>
            <p class="country__row no-wrap"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} Million people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row no-wrap"><span>💰</span>${
              data.currencies[0].name
            }</p>
            </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// Main
const findCountry = function (countryName) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${countryName}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    //   console.log(data);

    renderCountry(data);
  });
};

// findCountry('pakistan');
// findCountry('China');
// findCountry('Saudi Arabia');
// findCountry(userInput);

//////////////////////////////////////////////////////////////

// helper function to get json data

const getJson = function (url) {
  return fetch(url).then(response => {
    // console.log(response);
    if (!response.ok) throw new Error(`Country Not found ${response.status}`);
    return response.json();
  });
};

function findCountryPromise(countryName) {
  getJson(`https://restcountries.com/v2/name/${countryName}`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour)
        throw new Error('This Country has No neighbouring countries 😣');
      return getJson(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err =>
      renderError(
        `${
          !String(err.message).includes('404')
            ? err.message
            : ' Failed to load 😣 Try Again!'
        }`
      )
    )
    .finally((countriesContainer.style.opacity = 1));
  //   const neighbour = data.borders?.[0];
  //   if (!neighbour) throw new Error ('This Country has No neighbouring countries 😣');
  //   return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
  // })
  // .then(response => response.json())
  // .then(data => renderCountry(data, 'neighbour'))
}

// const userInput = prompt('Enter the country name to get Details 😁');
// findCountryPromise(userInput);

// btn.addEventListener('click', () => findCountryPromise('australia'));
// btn.addEventListener('click', () => findCountryPromise('bs,ndjkbd,'));

// coding challenge 01 - practice

const getLocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  btn.classList.add('hidden');
  search.classList.remove('hidden');
  btnSearch.classList.remove('hidden');
  getLocation()
    .then(resolve => {
      const {latitude: lat, longitude: lng } = resolve.coords;
      return fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error('Something Went Wrong 😥 ' + response.status);
      return response.json();
    })
    .then(data => {
      // console.log(data)
      console.log(
        `You are in: ${data.address.country}, ${data.address.county}, ${data.address.state}`
      );
      const countryNameUser = data.address.country;
      return fetch(`https://restcountries.com/v2/name/${countryNameUser}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error('Something Went Wrong 😥 ' + response.status);
      return response.json();
    })
    .then(data => {
      const [dataUser] = data;
      renderCountry(dataUser);
    })
    .catch(err => console.error(new Error(err.message + ' Try Again!')))
    .finally((countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);

btnSearch.addEventListener('click', function () {
  findCountryPromise(search.value);
});

// testing data
// whereAmI('52.508', '13.381');
// whereAmI('31.451', '74.253');
// whereAmI('dsfsf', 'fsgdsdg');
// whereAmI('19.037', '72.873');
// whereAmI('-33.933', '18.474');
