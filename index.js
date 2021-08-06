const right = document.querySelector(".right");
const left = document.querySelector(".left");

const imgCont = document.querySelector(".img-container");
const images = document.querySelectorAll("img");


const move = images[0].getBoundingClientRect().width
let counter = 1;
imgCont.style.transform = `translateX(-${move * counter}px)`;

right.addEventListener('click', () => {
  if (counter >= images.length - 1) return;
  imgCont.style.transition = "transform 0.4s ease-in-out";
  counter++;
  imgCont.style.transform = `translateX(-${move * counter}px)`;
});


left.addEventListener('click', () => {
  if (counter <= 0) return;
  imgCont.style.transition = "transform 0.4s ease-in-out";
  counter--;
  imgCont.style.transform = `translateX(-${move * counter}px)`;
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