ymaps.ready(init);

let objectManager

let testArr = []

var modal = document.querySelector('#modal')

var closeModal = document.querySelector('.modal__close')

var submit = document.querySelector('#submit')

closeModal.addEventListener('click', (e) => {
    e.currentTarget.closest('.modal').style.top = 0
    e.currentTarget.closest('.modal').style.left = -500+'px'
})

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

    createPlacemark(coords)

})


function init(){
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

    myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }
    )
    myPlacemark1 = new ymaps.Placemark(
        [55.758216, 37.589608],
        {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }
    )
    myPlacemark2 = new ymaps.Placemark(
        [55.74284664298958, 37.62422552813733],
        {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }
    )
    myMap.controls.add('zoomControl');
    myMap.behaviors.disable(['dblClickZoom'])

    myMap.geoObjects.add(myPlacemark)
    myMap.geoObjects.add(myPlacemark1)
    myMap.geoObjects.add(myPlacemark2)

    addListeners(myMap)

    myMap.geoObjects
        
        .add(new ymaps.Placemark([55.790139, 37.814052]));

    testArr.forEach((e) => {
        myMap.geoObjects.add(e)
    })

}


function addListeners(myMap) {
    myMap.events.add('click', (e) => openModal(e));
}

function createPlacemark(coords) {
    const placemark = new ymaps.Placemark(coords)
    console.log(placemark)

    placemark.events.add('click', (e) => {
        console.log('click')
    }) 
    
    testArr.push(placemark)
    console.log(testArr)
}


function openModal(e) {
    openEmptyModal(e)

    //очистка полей
    let inputs = document.querySelectorAll('.input.text')
    inputs.forEach((e) => {
        e.value = ''
    })
}

async function openEmptyModal(e) {
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



