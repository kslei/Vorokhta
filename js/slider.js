const images = document.querySelectorAll('.slider__item');
const sliderItems = document.querySelector('.slider__items');
let count = 0;
let widthS;

function init() {
  console.log('resize');
  widthS = document.querySelector('.slider').offsetWidth;
  //console.log(widthS);
  sliderItems.style.width = widthS * images.length + 'px';
  images.forEach(item => {
    item.style.width = widthS + 'px';
    item.style.height = 'auto';
  })
}

window.addEventListener('resize', init);
init()

document.querySelector('.slider__btn-next').addEventListener('click', () => {
  count++;
  if (count >= images.length) {
    count = 0;
  }
  rollSlider()
})
document.querySelector('.slider__btn-prev').addEventListener('click', () => {
  count--;
  if (count < 0) {
    count = images.length - 1;
  }
  rollSlider()
})

function rollSlider() {
  sliderItems.style.transform = 'translate(-' + count * widthS + 'px)';
}