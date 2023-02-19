const cards = document.querySelectorAll('.content__card');
const cardsDiv = document.querySelector('.content__cards');
const cardsContent = document.querySelector('.cards-content')
console.log(cards);

window.onscroll = function () {
  let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  let divY = window.pageYOffset + cardsContent.getBoundingClientRect().top
  console.log(posTop - (window.pageYOffset + cardsContent.getBoundingClientRect().top))
  if((posTop - divY) >= -5) {
    createCards()
  }
}
const createCards = () => {
  console.log("YES")
    
  for (let i = 0; i < cards.length; i++) {
    let top, left;
    if (window.innerWidth >= 576) {
      left = (cardsDiv.getBoundingClientRect().width - 330 - 20) * i / (cards.length - 1) + 20
      top = (cardsDiv.getBoundingClientRect().height - 440) * i / (cards.length - 1)
    } else {
      left = (cardsDiv.getBoundingClientRect().width - 300) / 2;
      top = (cardsDiv.getBoundingClientRect().height - 400 ) * i / (cards.length - 1)
    }
    
    cards[i].id = i;
    cards[i].style.opacity = 1;
    cards[i].style.left =  left + "px";
    cards[i].style.top = top + "px";
  }
}
cards.forEach(card => {
  card.addEventListener('click', e => {
    let n = card.id;
   write(n)
  })
})
function write (n) {
  for (let i = 0; i < cards.length; i++) {
    if (i == n) {
      cards[i].style.zIndex = 5;
      cards[i].style.filter = "none";
    } else {
      cards[i].style.zIndex = 2;
      cards[i].style.filter = "grayscale(100%)";
    }
  }
}
  