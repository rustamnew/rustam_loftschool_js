/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

function randomNumber(from, to) {
  return Math.round(from + Math.random() * (to - from))
}

function randomColor() {
  return `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`
}

let currentDrag
let startX = 0
let startY = 0

document.addEventListener('mousemove', (e) => {
  currentDrag.style.top = e.clientY - startY + 'px'
  currentDrag.style.left = e.clientX - startX + 'px'
});

export function createDiv() {
  const div = document.createElement('div');
  const minSize = 10;
  const maxSize = 200;

  div.classList.add('draggable-div')
  div.style.top = randomNumber(0, window.innerHeight) + 'px'
  div.style.left = randomNumber(0, window.innerWidth) + 'px'
  div.style.height = randomNumber(minSize, maxSize) + 'px'
  div.style.width = randomNumber(minSize, maxSize) + 'px'

  div.style.background = randomColor()

  homeworkContainer.appendChild(div)

  div.addEventListener('mousedown', (e) => {
    currentDrag = div
    startX = e.offsetX
    startY = e.offsetY
  })

  div.addEventListener('mouseup', () => {currentDrag = false})

  return div
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  createDiv()
});
