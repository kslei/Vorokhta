const pagesItemsL = document.querySelector('.pages__itemsL');
const pagesItemsR = document.querySelector('.pages__itemsR');
const forv = document.querySelector('.forv');
const back = document.querySelector('.back');

let indexPage = 1;
const max = 18;
let pages = [indexPage - 1, indexPage];
back.style.opacity = 0;

const render = (direction) => {
  for(let i=0; i<pages.length; i++) {
    createpage(pages[i], direction)
  }
}
function createpage(num, direction) {
  let page = document.createElement('div');
  page.className = 'pages__item';
  if (num%2 === 0) {
    pagesItemsL.appendChild(page);
    page.style.zIndex = num;
    direction? page.style.width = "0%" : page.style.width = "100%";
    page.style.right = 0;
    page.style.boxShadow = "-3px 3px 5px black";
  } else {
    pagesItemsR.appendChild(page);
    page.style.zIndex = max - num;
    direction? page.style.width = "100%" : page.style.width = "0%";
    page.style.left = 0;
    page.style.boxShadow = "3px 3px 5px black";
  }
  if(num === 0) {page.style.opacity = 0} else {page.style.opacity = 1}
  let image = document.createElement('div');
  image.className = 'pages__image';
  page.appendChild(image);
  let img = document.createElement('img');
  if (num !== 0) img.src = './img/' + num + '.jpg';
  image.appendChild(img);
}

function playAudio() {
  var myAudio = new Audio;
  myAudio.src = "../sounds/book.wav";
  myAudio.play();
}

forv.addEventListener('click', function() {
  if (indexPage +1 <= max) {
    indexPage += 2;
    pages = [indexPage-1, indexPage];
    console.log(indexPage)
    if (indexPage+1 > max) {forv.style.opacity = 0} 
    if (indexPage > 1) { back.style.opacity = 1 }
    console.log(pages)
    render(true)
    playAudio()
    pagesItemsR.lastChild.previousElementSibling.style.width = "100%";
    pagesItemsR.lastChild.previousElementSibling.style.transition = "400ms";
    pagesItemsR.lastChild.previousElementSibling.style.width = 0;
    pagesItemsL.lastChild.style.width = 0;
    pagesItemsL.lastChild.style.transition = "400ms";
    setTimeout(()=>{
      pagesItemsL.lastChild.style.width = "100%";
      pagesItemsR.removeChild(pagesItemsR.lastChild.previousElementSibling);
      setTimeout(()=>{
        pagesItemsL.removeChild(pagesItemsL.lastChild.previousElementSibling);
      }, 400)
    }, 400)
  }  
})

back.addEventListener('click', function () {
  if (indexPage > 1 ) {
    indexPage -= 2;
    console.log(indexPage)
    if (indexPage+1 <= max) {forv.style.opacity = 1}
    if (indexPage <= 1) {back.style.opacity = 0}
    pages = [indexPage - 1, indexPage];
    render(false)
    playAudio()
    pagesItemsL.lastChild.previousElementSibling.style.width = "100%";
    pagesItemsL.lastChild.previousElementSibling.style.transition = "400ms";
    pagesItemsL.lastChild.previousElementSibling.style.width = 0;
    console.log(pagesItemsL.lastChild)
    pagesItemsR.lastChild.style.width = 0;
    pagesItemsR.lastChild.style.transition = "400ms";
    setTimeout(() => {
      pagesItemsR.lastChild.style.width = "100%";
      pagesItemsL.removeChild(pagesItemsL.lastChild.previousElementSibling);
      setTimeout(() => {
        pagesItemsR.removeChild(pagesItemsR.lastChild.previousElementSibling);
      }, 400)
    }, 400)
}
})

render(true)