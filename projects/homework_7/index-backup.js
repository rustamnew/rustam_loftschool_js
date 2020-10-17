/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

var filterValue = ''


filterNameInput.addEventListener('input', function () {
  filterValue = filterNameInput.value
});


let cookies = document.cookie.replace(/"/g,'')

let cookiesObj = cookies.split('; ').reduce((prev, current) => {
    let [name, value] = current.split('=');
    prev[name] = value;
    return prev;
 }, {});


addButton.addEventListener('click', () => {
  updateTable()
  const cookieName = addNameInput.value
  const cookieValue = addValueInput.value
  
  document.cookie = `"${cookieName}=${cookieValue}"`

  //убрать в другую функцию
  const tr = document.createElement('tr')
  const tdName = document.createElement('td')
  const tdValue = document.createElement('td')
  const tdRemove = document.createElement('td')
  const removeButton = document.createElement('button')
  removeButton.textContent = 'Удалить' 
  removeButton.dataset.role = 'remove-cookie'
  removeButton.dataset.cookieName = cookieName

  tdName.innerText = cookieName
  tdValue.innerText = cookieValue
  tdRemove.append(removeButton)

  tr.append(tdName, tdValue, tdRemove)

  if(cookieName && cookieValue) {
    listTable.append(tr)
  }

  addNameInput.value = ''
  addValueInput.value = ''
});

listTable.addEventListener('click', (e) => {
  let {role, cookieName} = e.target.dataset

  if (role === 'remove-cookie') {
    delete cookiesObj[cookieName]
    document.cookie = `${cookieName}=deleted; max-age=-1`;
    updateTable()
  }
  
});

function updateTable() {
  listTable.innerHTML = ''

  for (let name in cookiesObj) {
    if (
      filterValue && 
      !name.toLowerCase().includes(filterValue.toLowerCase()) && 
      !cookiesObj[name].toLowerCase().includes(filterValue.toLowerCase())) {
        console.log('succes') //работает только после обновления страницы, исправить
        continue
    }

    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    const tdValue = document.createElement('td')
    const tdRemove = document.createElement('td')
    const removeButton = document.createElement('button')

    removeButton.textContent = 'Удалить' 
    removeButton.dataset.role = 'remove-cookie'
    removeButton.dataset.cookieName = name

    tdName.innerText = name
    tdValue.innerText = cookiesObj[name]
    tdRemove.append(removeButton)

    tr.append(tdName, tdValue, tdRemove)

    if(name && cookiesObj[name]) {
      listTable.append(tr)
    }


  }
}

updateTable()
/*
for (let key in cookiesObj) {
  console.log(key)
  console.log(cookiesObj[key])
}
*/


////////////////
/*/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
/*
var filterValue = ''


filterNameInput.addEventListener('input', function () {
  filterValue = filterNameInput.value
  updateTable()
});


let cookies = document.cookie.replace(/"/g,'')

let cookiesObj = cookies.split('; ').reduce((prev, current) => {
    let [name, value] = current.split('=');
    prev[name] = value;
    return prev;
 }, {});


addButton.addEventListener('click', () => {
  const cookieName = addNameInput.value
  const cookieValue = addValueInput.value

  if(cookieName && cookieValue) {
    document.cookie = `"${cookieName}=${cookieValue}"`
    cookiesObj[cookieName] = cookieValue
  }

  updateTable()
  console.log(cookiesObj)
});

listTable.addEventListener('click', (e) => {
  let {role, cookieName} = e.target.dataset

  if (role === 'remove-cookie') {
    delete cookiesObj[cookieName]
    document.cookie = `"${cookieName}=deleted; max-age=0"`;
    updateTable()
  }
  
});

function updateTable() {
  console.log('update table')
  listTable.innerHTML = ''

  for (let name in cookiesObj) {
    if (
      filterValue && 
      !name.toLowerCase().includes(filterValue.toLowerCase()) && 
      !cookiesObj[name].toLowerCase().includes(filterValue.toLowerCase())) {
        continue
    }

    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    const tdValue = document.createElement('td')
    const tdRemove = document.createElement('td')
    const removeButton = document.createElement('button')

    removeButton.textContent = 'Удалить' 
    removeButton.dataset.role = 'remove-cookie'
    removeButton.dataset.cookieName = name

    tdName.innerText = name
    tdValue.innerText = cookiesObj[name]
    tdRemove.append(removeButton)

    tr.append(tdName, tdValue, tdRemove)

    if(name && cookiesObj[name]) {
      listTable.append(tr)
      console.log('appended')
    }

  }
}

updateTable()







*/ 






