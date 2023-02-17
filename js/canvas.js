//Анимация мыши
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.clientWidth;
const height = canvas.clientHeight;

const X = [];
const Y = [];
const step = 80;
//Отслеживаем координаты мыши
canvas.onmousemove = function (event) {
  event = event || window.event; // кроссбраузерность
  //console.log(window.pageYOffset)
  //console.log(event);
  let mouseX = event.clientX;
  let mouseY = event.clientY - height * 2 + window.pageYOffset;
  let x = 0;
  let y = 0;
  let r = 2;
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < width / step; i++) {
    X.push(x + i * step);
    for (let j = 0; j < height / step; j++) {
      Y.push(y + j * step);
      ctx.beginPath();
      ctx.arc(X[i], Y[j], r, 0, 2 * Math.PI);//дуга на 360 градусов, рисуем точки
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();

      if (((mouseX - step * 2.5) <= X[i] && (mouseX + step * 2.5) >= X[i]) && (mouseY - step * 2.5) <= Y[j] && (mouseY + step * 2.5) >= Y[j]) {
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.moveTo(mouseX, mouseY);//привязываемся к координате мыши
        ctx.lineTo(X[i], Y[j]);//рисуем линию
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';//стиль линии
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
}