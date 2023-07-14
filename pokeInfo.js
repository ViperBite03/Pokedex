const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const pokeID = urlParams.get('pokeID')

function setTitle() {
  const title = document.querySelector('title')
  title.textContent = pokeID.charAt(0).toUpperCase() + pokeID.slice(1)
}

function createPokeInfoDOM(data) {}

fetch('https://pokeapi.co/api/v2/pokemon/' + pokeID)
  .then((response) => response.json())
  .then((data) => {
    createPokeInfoDOM(data)
  })

setTitle()
