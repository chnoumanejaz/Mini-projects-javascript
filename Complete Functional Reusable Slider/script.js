// The Complete Functional Slider

// slider Element Selections
const allSlides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

// slider
let currentSlide = 0;
const maxSlide = allSlides.length;
const nextSlide = function (slide) {
  allSlides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
nextSlide(0);
// controling with the dots or buttons on screen
const createDots = function () {
  allSlides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
// activate the dot based on the active slide
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0)

// next button
const goToNextSlide = function () {
  if (currentSlide === maxSlide - 1) currentSlide = 0;
  else currentSlide++;
  nextSlide(currentSlide);
  activateDot(currentSlide);
};
btnRight.addEventListener('click', goToNextSlide);

// previous Button
const goToPrevSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlide - 1;
  else currentSlide--;
  nextSlide(currentSlide);
  activateDot(currentSlide)
};
btnLeft.addEventListener('click', goToPrevSlide);

// controlling slider with KeyBoard
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') goToNextSlide();
  if (event.key === 'ArrowLeft') goToPrevSlide();
});

dotsContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('dots__dot')) {
    const slide = event.target.dataset.slide;
    nextSlide(slide);
    activateDot(slide)
  }
});
