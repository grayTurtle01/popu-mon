// Delete
cans = document.querySelectorAll('.fa-trash')

for(can of cans)
  can.addEventListener('click', deletePokemon)

async function  deletePokemon(){
  div = this.parentNode
  id = div.getAttribute('_id')
  
  res = await fetch("/pokemons/deletePokemon", {
    method: "delete",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({_id : id}) 
  })

  pokemons = await res.json()
  renderPokemons(pokemons)
  //console.log(data)

  //location.reload()

}


// Search Pokemon Data 
btn = document.querySelector('#add_pokemon')
btn.addEventListener('click', fetchPokemon)  

async function fetchPokemon(pokemon_name){

    input = document.querySelector('input')
    pokemon_name = input.value.toLowerCase()

    url = "https://pokeapi.co/api/v2/pokemon/"
    full_url = url + pokemon_name
   
    try{
      res = await fetch(full_url)
      data = await res.json()
      //console.log(data)

      img_url = data.sprites.other["official-artwork"].front_default
      pokemon_name = data.name
      number = data.id  
      await makeRequet(pokemon_name, img_url, number)

      input.value = ""

    }catch(err){
      message = document.querySelector('#message')
      message.style.display = 'block'
      message.innerText = "Alert: Wrong pokemon Name: " + pokemon_name
      console.log(' ---> Wrong pokemon name')
    }
    
  }

async function makeRequet(pokemon_name, img_url){
  res = await fetch('/pokemons/addPokemon',{
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      "name": pokemon_name,
      "url_img" : img_url,
      "number": number
    })
  })

  pokemons = await res.json()
  renderPokemons(pokemons)
  //console.log(data)

  //location.reload()

}

// Likes
thumbs = document.querySelectorAll('.fa-thumbs-up')

for(thumb of thumbs)
  thumb.addEventListener('click', addLike)

async function addLike(){
  div = this.parentNode
  id = div.getAttribute('_id')
  
  res = await fetch("/pokemons/addLike", {
    method: "put",
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      "_id": id 
    })

  })
  data = await res.json()
  // console.log(data)
  renderPokemons(data)
  //location.reload()
}


// disLikes
dislikes = document.querySelectorAll('.fa-thumbs-down')

for(dislike of dislikes)
  dislike.addEventListener('click', disLike)

async function disLike(){
  div = this.parentNode
  id = div.getAttribute('_id')
  
  res = await fetch("/pokemons/disLike", {
    method: "put",
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      "_id": id 
    })

  })

  data = await res.json()
  console.log(data)
  //location.reload()
  renderPokemons(data)
}

// render Pokemons SPA
function renderPokemons(pokemons){
  container = document.getElementById('container')
  container.innerHTML = ''

  pokemons.forEach( pokemon => {
    card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('_id', pokemon._id)

    //image
    image = document.createElement('img')
    image.src = pokemon.url_img
    image.setAttribute('title', pokemon.number)

    //name
    poke_name = document.createTextNode(pokemon.name)

    //thumbs-up
    like = document.createElement('i')
    like.setAttribute('class', 'fas fa-thumbs-up')

    //dislikes
    dislike = document.createElement('i')
    dislike.setAttribute('class', 'fas fa-thumbs-down')
    
    //likes
    likes = document.createTextNode(pokemon.likes)

    //trash
    trash = document.createElement('i')
    trash.setAttribute('class', 'fas fa-trash')

    card.appendChild(image)
    card.appendChild(poke_name)
    card.appendChild(like)
    card.appendChild(dislike)
    card.appendChild(likes)
    card.appendChild(trash)


    container.appendChild(card)
  })

  reloadEvents()
  reloadStyles()
}

// Reload Events
function reloadEvents(){
  thumbs = document.querySelectorAll('.fa-thumbs-up')
  for(thumb of thumbs)
    thumb.addEventListener('click', addLike)
  
  dislikes = document.querySelectorAll('.fa-thumbs-down')
  for(dislike of dislikes)
      dislike.addEventListener('click', disLike)

  cans = document.querySelectorAll('.fa-trash')
  for(can of cans)
    can.addEventListener('click', deletePokemon)
    
}

// Reload Styles
function reloadStyles(){
  is = document.querySelectorAll('i')
  for(i of is){
    i.style.marginLeft = "7px"
    i.style.marginRight = "7px"
  }

  message = document.querySelector('#message')
  message.style.display = 'none'

}