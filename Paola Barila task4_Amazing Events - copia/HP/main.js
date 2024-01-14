var URI ="http://hp-api.herokuapp.com/api/characters"
let divCards = document.getElementById("contenedor-datos")
let inputSearch = document.getElementById("input")
let checksBox = document.getElementById("checks")
let personajes = []
let arrayPorCasas = filtrarPorCasa()

inputSearch.addEventListener('input',() =>{
    let arrayFiltrado = filtrarPorNombre(personajes)
    pintarCards(arrayFiltrado)
})
traerDatos(URI)


function pintarCards(arrayPersonajes){
    divCards.innerHTML =""
    arrayPersonajes.forEach(personaje => {
    let card =document.createElement('div')
    card.className = "card p-3 bg-dark text-light"
    card.style.width ="15rem"
    card.innerHTML=`<img src=${personaje.image == "" ? "assets/escudoh.jpg" : personaje.image} class="card-img-top" alt="${personaje.name}">
    <div class="card-body">
      <h6 class="card-text">Nombre: ${personaje.name}</h6>
      <p class="card-text">Casa: ${personaje.house == "" ? "House not found" : personaje.house}</p>
    </div>`
        divCards.appendChild(card)
    });
}

arrayPorCasas.forEach(house => {
  let boton = document.createElement('div')
  boton.className ="form-check form-check-inline mt-5 mb-5"
  boton.innerHTML =` <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${house}">
  <label class="form-check-label" for="inlineCheckbox1">"${house}"</label>
</div>`
  checksBox.appendChild(boton)
})

function traerDatos(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        pintarCards(data)
    } )
    
}
function filtrarPorNombre(arrayPersonajes){
    let texto = inputSearch.value.toLowerCase()
    let arrayFiltrado = arrayPersonajes.filter(personaje => personaje.name.toLowerCase().includes(texto))
    return arrayFiltrado
    }

   function filtrarPorCasa(arrayCasas) {
    let arrayCasas = []
        arrayCasas.forEach(personaje => {
          if (!arrayCasas.includes(personaje.house)) {
            arrayCasas.push(personaje.house)
          }
        });
        return arrayCasas
    }


