const cards = document.querySelector('.cards')

async function createCard(poke) {
  const response = await fetch(poke.url)

  const data = await response.json()

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
  pokeImage.classList.add('pokeImage') //no es lo mismo que la constante!

  const pokeImageBG = document.createElement('img')
  pokeImageBG.classList.add('pokeImageBG')

  const circle = document.createElement('div')
  circle.classList.add('circle')

  pokeImage.setAttribute(
    'src',
    data.sprites.other['official-artwork'].front_default
  )

  pokeImageBG.setAttribute('src', data.sprites.front_default)

  content.appendChild(pokeImage)
  content.appendChild(pokeName)
  card.appendChild(background)
  card.appendChild(circle)
  card.appendChild(pokeImageBG)
  wrapper.appendChild(card)
  wrapper.appendChild(content)
  cards.appendChild(wrapper.cloneNode(true))
}

fetch('https://pokeapi.co/api/v2/pokemon?limit=25')
  .then((response) => response.json())
  .then(async (data) => {
    for (let pokemon of data.results) {
      await createCard(pokemon)
    }
  })
