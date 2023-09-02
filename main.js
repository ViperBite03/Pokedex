const cards = document.querySelector('.cards')

async function createCard(poke) {
  const card = document.createElement('div')
  card.classList.add('card')

  const background = document.createElement('div')
  background.classList.add('background')

  const content = document.createElement('div')
  content.classList.add('content')

  const wrapper = document.createElement('div')
  wrapper.classList.add('wrapper')

  const pokeName = document.createElement('div')
  pokeName.classList.add('pokeName')
  pokeName.textContent = poke.name.toUpperCase()

  const pokeImage = document.createElement('img')
  pokeImage.classList.add('pokeImage')

  const pokeImageBG = document.createElement('img')
  pokeImageBG.classList.add('pokeImageBG')

  const circle = document.createElement('div')
  circle.classList.add('circle')

  pokeImage.setAttribute('src', poke.imgArtWork)

  const info = document.createElement('a')
  info.setAttribute('href', '/info.html?pokeID=' + poke.name)
  info.setAttribute('class', poke.name)

  pokeImageBG.setAttribute('src', poke.imgDefault)

  content.appendChild(pokeImage)
  content.appendChild(pokeName)
  card.appendChild(background)
  card.appendChild(circle)
  card.appendChild(pokeImageBG)
  wrapper.appendChild(card)
  wrapper.appendChild(content)
  info.appendChild(wrapper)
  cards.appendChild(info.cloneNode(true))
}

async function getPokemonFromStorage() {
  const pokeData = window.localStorage.getItem('pokeData')

  if (!pokeData) {
    await fetchPokeData()
  }

  buildPage()
}

function buildPage() {
  const pokeData = JSON.parse(window.localStorage.getItem('pokeData') || '[]')
  for (let pokemon of pokeData) {
    createCard(pokemon)
  }

  const searchInput = document.querySelector('[data-search]')
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value

    pokeData.forEach((pokemon) => {
      const isVisible = pokemon.name.includes(value)
      const pokeNameHTML = document.querySelector('.' + pokemon.name)
      pokeNameHTML.classList.toggle('hide', !isVisible)
    })
  })
}

getPokemonFromStorage()

async function fetchPokeData() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1273')
  const data = await response.json()

  let allPokemons = []
  let pokemonUrls = []

  for (let pokemon of data.results) {
    pokemonUrls.push(fetch(pokemon.url))
  }

  const response2 = await Promise.all(pokemonUrls)

  for (let result of response2) {
    const pokeInfoResponse = await result.json()

    const pokeInfo = {
      name: pokeInfoResponse.name,
      imgArtWork:
        pokeInfoResponse.sprites.other['official-artwork'].front_default,
      imgDefault: pokeInfoResponse.sprites.front_default,
    }

    allPokemons.push(pokeInfo)
  }

  window.localStorage.setItem('pokeData', JSON.stringify(allPokemons))
}

/*const arrow = document.querySelector('.arrow')
function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      console.log('Miquel es bobo')
    } else {
      entry.target.classList.remove('visible')
    }
  })
}

const observer = new IntersectionObserver(handleIntersection)
observer.observe(arrow)

function get30pokemons(scrollCounter) {
  //encontrar qué rango de pokemons hay que buscar
  //detectar si están en la caché, si no hacer un fetch y meterlos en ella
}*/
