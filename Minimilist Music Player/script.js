'use strict';

const progress = document.getElementById('progress');
const song = document.getElementById('song');
const playIcon = document.querySelector('.play');
const pauseIcon = document.querySelector('.pause');
const thumbnail = document.querySelector('.song__img');
let val = 0;
let newVal;
let play = false;
let rotation;
// console.log(song.currentTime)
song.onloadedmetadata = function () {
  //   song.pause();
  progress.max = song.duration;
  progress.value = song.currentTime;
};

const rotate = function () {
  val += 2;
  thumbnail.style.transform = `rotate(${val}deg)`;
  newVal = val;
  if (val > 359) newVal = val = 0;
  console.log(val);
};

const playPause = function () {
  if (!playIcon.classList.contains('hidden')) {
    song.play();
    play = true;
    // // rotation
    if (play) {
      rotation = setInterval(rotate, 50);
    } 
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
  } else if (playIcon.classList.contains('hidden')) {
    song.pause();
    play = false;
    clearInterval(rotation);
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
  }
};

if (play) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}


progress.onchange = function () {
  song.play();
  play = true;
    // // rotation
    clearInterval(rotation);
    if (play) {
      rotation = setInterval(rotate, 50);
    } 
  playIcon.classList.add('hidden');
  pauseIcon.classList.remove('hidden');
  song.currentTime = progress.value;
};

// console.log(song.EndTime)
