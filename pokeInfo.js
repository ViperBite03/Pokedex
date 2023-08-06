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

function setImageTypes(types) {
  const typesDiv = document.querySelector('.types')
  types.map((type) => {
    const typeName = type.type.name
    const typeImage = document.createElement('img')
    typeImage.setAttribute(
      'src',
      `https://storage.googleapis.com/nianticweb-media/pokemongo/types/${typeName}.png?cb=1`
    )
    typeImage.setAttribute(
      'title',
      typeName.charAt(0).toUpperCase() + typeName.slice(1)
    )
    typesDiv.appendChild(typeImage)
  })
}

/*function setLabelsTypes(types) {
  const typesDiv = document.querySelector('.types')
  for (let type of types) {
    const typeDiv = document.createElement('div')
    typeDiv.textContent = type.type.name.toUpperCase()
    typesDiv.appendChild(typeDiv)
  }
}*/

function setDimensions(height = '???', weight = '???') {
  const heightDiv = document.querySelector('.height')
  heightDiv.textContent = height / 10 + 'm'

  const weightDiv = document.querySelector('.weight')
  weightDiv.textContent = weight / 10 + 'kg'
}

function setListNumber(listID) {
  if (listID > 1) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + (listID - 1))
      .then((response) => response.json())
      .then((data) => {
        const postImage = document.querySelector('.preImage')
        postImage.setAttribute(
          'src',
          data.sprites.other['official-artwork'].front_default
        )
        document
          .querySelector('.pre-image-link')
          .setAttribute('href', `/info.html?pokeID=${data.name}`)
      })

    fetch('https://pokeapi.co/api/v2/pokemon/' + (listID + 1))
      .then((response) => response.json())
      .then((data) => {
        const postImage = document.querySelector('.postImage')
        postImage.setAttribute(
          'src',
          data.sprites.other['official-artwork'].front_default
        )
        document
          .querySelector('.post-image-link')
          .setAttribute('href', `/info.html?pokeID=${data.name}`)
      })
  }
}

function setNumber(listID = '???') {
  const listDiv = document.querySelector('.list')
  const noZeros = listID.toString().length
  let finalNum = listID.toString()
  for (let i = noZeros; i < 4; i++) {
    finalNum = '0' + finalNum
  }
  listDiv.textContent = 'Nº ' + finalNum
}

function createPokeInfoDOM(pokeData) {
  setTitle('h1')
  setImage(pokeData.sprites.other['official-artwork'].front_default)
  setImageTypes(pokeData.types)
  //setLabelsTypes(pokeData.types)
  setDimensions(pokeData.height, pokeData.weight)
  setNumber(pokeData.id)
  setListNumber(pokeData.id)

  console.log(pokeData)
}

fetch('https://pokeapi.co/api/v2/pokemon/' + pokeID)
  .then((response) => response.json())
  .then((data) => {
    createPokeInfoDOM(data)
  })

setTitle('title')
