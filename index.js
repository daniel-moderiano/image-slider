const right = document.querySelector(".right");
const left = document.querySelector(".left");

const imgCont = document.querySelector(".img-container");
const images = document.querySelectorAll("img");

const dots = document.querySelectorAll(".dot");

const move = images[0].getBoundingClientRect().width
let counter = 1;

imgCont.style.transform = `translateX(-${move * counter}px)`;

function createInterval() {
  let autoSlide = setInterval(function () {
    if (counter >= images.length - 1) return;
    imgCont.style.transition = "transform 0.4s ease-in-out";
    counter++;
    imgCont.style.transform = `translateX(-${move * counter}px)`;
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    if (counter > images.length - 2) {
      dots[0].classList.add('active');
    } else {
      dots[counter - 1].classList.add('active');
    } 
  }, 5000);
  return autoSlide;
};

let currentInterval = createInterval();

right.addEventListener('click', () => {
  clearInterval(currentInterval);
  currentInterval = createInterval();

  if (counter >= images.length - 1) return;
  imgCont.style.transition = "transform 0.4s ease-in-out";
  counter++;
  imgCont.style.transform = `translateX(-${move * counter}px)`;
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  if (counter > images.length - 2) {
    dots[0].classList.add('active');
  } else {
    dots[counter - 1].classList.add('active');
  }  
});


left.addEventListener('click', () => {
  clearInterval(currentInterval);
  currentInterval = createInterval();
  if (counter <= 0) return;
  imgCont.style.transition = "transform 0.4s ease-in-out";
  counter--;
  imgCont.style.transform = `translateX(-${move * counter}px)`;
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  if (counter < 1) {
    dots[dots.length - 1].classList.add('active');
  } else {
    dots[counter - 1].classList.add('active');
  } 
});

imgCont.addEventListener('transitionend', () => {
  if (images[counter].id === 'lastClone') {
    imgCont.style.transition = "none";
    counter = images.length - 2;
    imgCont.style.transform = `translateX(-${move * counter}px)`;
  }

  if (images[counter].id === 'firstClone') {
    imgCont.style.transition = "none";
    counter = images.length - counter;
    imgCont.style.transform = `translateX(-${move * counter}px)`;
  }
});

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    clearInterval(currentInterval);
    currentInterval = createInterval();
    counter = e.target.dataset.id
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    e.target.classList.add('active');
    imgCont.style.transition = "transform 0.4s ease-in-out";
    imgCont.style.transform = `translateX(-${move * counter}px)`;
  });
});