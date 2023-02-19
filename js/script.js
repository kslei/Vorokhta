window.onload = function () {
  const parallax = document.querySelector('.parallax');

  if(parallax) {
    const content = document.querySelector('.parallax__container');
    const sky = document.querySelector('.images-parallax__sky');
    const center = document.querySelector('.images-parallax__center');
    const bottom = document.querySelector('.images-parallax__bottom');

    //коэффициенты
    const forSky = 40;
    const forCenter = 22;
    const forBottom = 13;

    //Скорость
    const speed = 0.05;

    let positionX = 0;
    let positionY = 0;
    let coordXprocent = 0;
    let coordYprocent = 0;

    function setMouseParallaxStyle() {
      const distX = coordXprocent - positionX;
      const distY = coordYprocent - positionY;

      positionX = positionX + (distX * speed);
      positionY = positionY + (distY * speed);

      sky.style.cssText = `transform: translate(${positionX/forSky}%, ${positionY/forSky}%);`;
      center.style.cssText = `transform: translate(${positionX/forCenter}%, ${positionY/forCenter}%);`;
      bottom.style.cssText = `transform: translate(${positionX/forBottom}%, ${positionY/forBottom}%);`;

      requestAnimationFrame(setMouseParallaxStyle)
    }
    setMouseParallaxStyle();

    parallax.addEventListener('mousemove', function (e) {
      //Получение ширины и высоты блока
      const parallaxWidth = parallax.offsetWidth;
      const parallaxHeight = parallax.offsetHeight;

      //Центр
      const coordX = e.pageX - parallaxWidth/2;
      const coordY = e.pageY - parallaxHeight/2;
      //Проценты
      coordXprocent = coordX/parallaxWidth*100;
      coordYprocent = coordY/parallaxHeight*100;
    })
    //Параллакс при скролле
    let thresholdSet = [];
    for (let i=0; i <=1.0; i+=0.005) {
      thresholdSet.push(i);
    }
    const callback = function (entries, observer) {
      const scrollTopProcent = window.pageYOffset/parallax.offsetHeight*100;
      setParallaxItemsStyle(scrollTopProcent);
    }
    const observer = new IntersectionObserver(callback, {
      threshold: thresholdSet
    })
    observer.observe(document.querySelector('.content'));
    function setParallaxItemsStyle (scrollTopProcent) {
      content.style.cssText = `transform: translate(0%, -${scrollTopProcent/9}%);`;
      center.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent/6}%);`;
      bottom.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent/4}%);`;
    }
  }
}
//Плавная прокрутка
//Собираем якоря, устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
const animationTime = 500;
const framesCount = 50;

anchors.forEach(item => {
  //Вешаем на каждый якорь обработчик и сбрасываем стандартное поведение
  item.addEventListener('click', event => {
    event.preventDefault();
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
    console.log(coordY)
    // запускаем интервал, в котором
    let scroller = setInterval(function () {
    // считаем на сколько скроллить за 1 кадр
    let scrollBy = coordY / framesCount;
    // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
    // и дно страницы не достигнуто
    /* console.log("scrollBy", scrollBy)
    console.log("pageYOffset", window.pageYOffset) */ 
    if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
      // то скроллим на к-во пикселей, которое соответствует одному такту
      window.scrollBy(0, scrollBy);
    } else {
      console.log('Go out from interval')
      // иначе добираемся до элемента и выходим из интервала
      window.scrollTo(0, coordY);
      clearInterval(scroller);
    }
    // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  })
});