const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const pokeID = urlParams.get('pokeID')

const pokeNameCapitalized = pokeID.charAt(0).toUpperCase() + pokeID.slice(1)

function setTitle(label) {
  const title = document.querySelector(label)
  title.textContent = pokeNameCapitalized
}

function setImage(pokeUrl = '') {
  const bigImageLabel = document.querySelector('.bigImage')
  bigImageLabel.setAttribute('src', pokeUrl)
}

function setLabelsTypes(types) {
  const typesDiv = document.querySelector('.types')
  for (let type of types) {
    const typeDiv = document.createElement('div')
    typeDiv.textContent = type.type.name.toUpperCase()
    typesDiv.appendChild(typeDiv)
  }
}

function createPokeInfoDOM(pokeData) {
  setTitle('h1')
  setImage(pokeData.sprites.other['official-artwork'].front_default)
  setLabelsTypes(pokeData.types)

  console.log(pokeData)
}

fetch('https://pokeapi.co/api/v2/pokemon/' + pokeID)
  .then((response) => response.json())
  .then((data) => {
    createPokeInfoDOM(data)
  })

setTitle('title')
