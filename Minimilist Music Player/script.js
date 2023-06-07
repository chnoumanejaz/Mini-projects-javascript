'use strict';

const progress = document.getElementById('progress');
const song = document.getElementById('song');
const playIcon = document.querySelector('.play');
const pauseIcon = document.querySelector('.pause');
const thumbnail = document.querySelector('.song__img');
const backImage = document.querySelector('.full-img');

let val = 0;
let play = false;
let rotation;

// functions
const shrinkThumbnail = function () {
  thumbnail.style.width = '180px';
  thumbnail.style.opacity = '.6';
};
const growThumbnail = function () {
  thumbnail.style.width = '220px';
  thumbnail.style.opacity = '.9';
};
const showPlayIcon = function () {
  playIcon.classList.add('hidden');
  pauseIcon.classList.remove('hidden');
};
const showPauseIcon = function () {
  playIcon.classList.remove('hidden');
  pauseIcon.classList.add('hidden');
};


// main working start on page load
song.onloadedmetadata = function () {
  shrinkThumbnail();
  //   song.pause();
  progress.max = song.duration;
  progress.value = song.currentTime;
};

const rotate = function () {
  val++;
  thumbnail.style.transform = `rotate(${val}deg)`;
};

const seek = function (play) {
  if (play) {
    setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  }
};

const playPause = function () {
  if (!playIcon.classList.contains('hidden')) {
    song.play();
    play = true;
    // rotation
    clearInterval(rotation);
    if (play) {
      rotation = setInterval(rotate, 50);
    }
    // seek bar movement
    seek(play);
    growThumbnail();
    showPlayIcon();
  } else if (playIcon.classList.contains('hidden')) {
    song.pause();
    play = false;
    clearInterval(rotation);
    shrinkThumbnail();
    showPauseIcon();
  }
};

progress.onchange = function () {
  song.play();
  play = true;
  growThumbnail();
  song.currentTime = progress.value;
  // seek bar movement
  seek(play);
  // rotation
  clearInterval(rotation);
  if (play) {
    rotation = setInterval(rotate, 25);
  }
  showPlayIcon();
};

thumbnail.addEventListener('click', changeThumbnail);

// changing style when user click on the thumbnail
function changeThumbnail() {
  play = true;
  backImage.classList.remove('hiddenAnim');
  thumbnail.classList.add('hidden');
}

backImage.addEventListener('click', function () {
  backImage.classList.add('hiddenAnim');
  thumbnail.classList.remove('hidden');
});

console.log(song.length)