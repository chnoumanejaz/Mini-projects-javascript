// coding challenge no 2 - for Async

'use strict';
const body = document.querySelector('.images');

const wait = function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.classList.add('images');

    img.addEventListener('load', function () {
      body.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found ... '));
    });
  });
};

let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
