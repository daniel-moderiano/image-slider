// GLOBAL VARIABLE DEFINITIONS

const right = document.querySelector(".right");
const left = document.querySelector(".left");

const imgCont = document.querySelector(".img-container");
const images = document.querySelectorAll("img");

const dots = document.querySelectorAll(".dot");

const move = images[0].getBoundingClientRect().width
let counter = 1;

imgCont.style.transform = `translateX(-${move * counter}px)`;

// GLOBAL FUNCTION DEFINITIONS

function removeActiveDotClass() {
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
}

function addActiveDotClassForward() {
  if (counter > images.length - 2) {
    dots[0].classList.add('active');
  } else {
    dots[counter - 1].classList.add('active');
  } 
}

function addActiveDotClassBackward() {
  if (counter < 1) {
    dots[dots.length - 1].classList.add('active');
  } else {
    dots[counter - 1].classList.add('active');
  } 
}

function changeSlide() {
    imgCont.style.transition = "transform 0.4s ease-in-out";
    imgCont.style.transform = `translateX(-${move * counter}px)`;
}

function cycleToStartOrEnd() {
  imgCont.style.transition = "none";
  imgCont.style.transform = `translateX(-${move * counter}px)`;
}


// APP LOGIC

function createInterval() {
  let autoSlide = setInterval(function () {
    if (counter >= images.length - 1) return;
    counter++;
    changeSlide();
    removeActiveDotClass();
    addActiveDotClassForward();
  }, 20000);
  return autoSlide;
};

let currentInterval = createInterval();

function resetInterval() {
  clearInterval(currentInterval);
  currentInterval = createInterval();
};


right.addEventListener('click', () => {
  resetInterval();
  if (counter >= images.length - 1) return;
  counter++;
  changeSlide();
  removeActiveDotClass();
  addActiveDotClassForward();
});


left.addEventListener('click', () => {
  resetInterval();
  if (counter <= 0) return;
  counter--;
  changeSlide();
  removeActiveDotClass();
  addActiveDotClassBackward();
});

imgCont.addEventListener('transitionend', () => {
  if (images[counter].id === 'lastClone') {
    counter = images.length - 2;
    cycleToStartOrEnd();
  }
  if (images[counter].id === 'firstClone') {
    counter = images.length - counter;
    cycleToStartOrEnd();
  }
});

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    resetInterval();
    counter = e.target.dataset.id
    removeActiveDotClass();
    e.target.classList.add('active');
    changeSlide();
  });
});