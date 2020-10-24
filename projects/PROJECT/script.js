ymaps.ready(init);

let objectManager

let testArr = []
let testObj = {}

let storage = localStorage
console.log(storage)

//localStorage.clear()

for (key in storage) {
    if (typeof storage[key] == 'string') {
        console.log(storage[key])
        let test = JSON.parse(storage[key])
        console.log(test)
        testArr.push(test)
    }
}

console.log(testArr)





var modal = document.querySelector('#modal')
var closeModal = document.querySelector('.modal__close')
var submit = document.querySelector('#submit')

closeModal.addEventListener('click', (e) => {
    e.currentTarget.closest('.modal').style.top = 0
    e.currentTarget.closest('.modal').style.left = -500+'px'
})

let i = storage.length

submit.addEventListener('click', (e) => {
    e.preventDefault()

    let form = document.querySelector('#form')

    let name = form.elements.name.value
    let place = form.elements.place.value
    let review = form.elements.review.value

    console.log(name)
    console.log(place)
    console.log(review)
    console.log(coords)


    i = i + 1

    let placemark = 'placemark'+ i

    console.log(placemark)
    console.log(i)

    storage[placemark] = JSON.stringify({
        name: name,
        place: place,
        review: review,
        coords: coords
    })

    testArr.push({
        name: name,
        place: place,
        review: review,
        coords: coords
    })
   
    

    console.log(storage)

    console.log(testArr)

    modal.style.top = 0
    modal.style.left = -500+'px'


    
})


function init() {

    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76, 37.64],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 7,
        controls: []
    });

    myMap.controls.add('zoomControl');
    myMap.behaviors.disable(['dblClickZoom'])


    addListeners(myMap)


    testArr.forEach((e) => {
        
        myMap.geoObjects.add(new ymaps.Placemark(e.coords, {
            balloonContentHeader: `<small>${e.name} </small><i>${e.place}</i>
                                    <p>${e.review}</p>`,
            balloonContentBody: `
                            <form class="form" id="formBaloon" data-coords=${e.coords}>
                                 <input name="name" type="text" placeholder="Имя" class="input text">
                                 <input name="place" type="text" placeholder="Место" class="input text">
                                 <textarea name="review" placeholder="Отзыв" class="input text textarea"></textarea>
                                 <input type="button" value="Добавить" data-role="modalSubmit">
                            </form>
                                 `,
            balloonContentFooter: `${e.coords}`,
        }))

        //console.log(e)

    })

    

}

document.addEventListener('click', (e) => {
    if (e.target.dataset.role == 'modalSubmit') {

        let form = document.querySelector('#formBaloon')
        let name = form.elements.name.value
        let place = form.elements.place.value
        let review = form.elements.review.value

        
        let coordsString = `${form.dataset.coords}`
        let coordsSplit = coordsString.split(',')
        coordsSplitNumber = []
        coordsSplit.forEach((e) => {
            coordsSplitNumber.push(Number(e))
        })
        coords = coordsSplitNumber
        console.log(coords)



        i = i + 1

        let placemark = 'placemark'+ i

        console.log(placemark)
        console.log(i)

        storage[placemark] = JSON.stringify({
            name: name,
            place: place,
            review: review,
            coords: coords
        })

        testArr.push({
            name: name,
            place: place,
            review: review,
            coords: coords
        })
    
    }
})






function addListeners(myMap) {
    myMap.events.add('click', (e) => openEmptyModal(e));
}


async function openEmptyModal(e) {

    let inputs = document.querySelectorAll('.input.text')
    inputs.forEach((e) => {
        e.value = ''
    })

    let posX = e.getSourceEvent().originalEvent.domEvent.originalEvent.clientX;

    let posY = e.getSourceEvent().originalEvent.domEvent.originalEvent.clientY;

    console.log(posX)
    console.log(posY)

    coords = e.get('coords')

    const objectInfo = await getClickCoords(coords)
    console.log(objectInfo)

    modal.style.left = posX+'px'
    modal.style.top = posY+'px'

}

function getClickCoords(coords) {
    return new Promise((resolve, reject) => {
        ymaps
            .geocode(coords)
            .then((response) => resolve(response.geoObjects.get(0).getAddressLine()))
            .catch((e) => reject(e))    
    })
}



