// Delete
bs = document.querySelectorAll('.fa-trash')

for(b of bs)
  b.addEventListener('click', deleteTask)

async function  deleteTask(){
  li = this.parentNode
  id = li.getAttribute('_id')
  
  res = await fetch("/pokemons/deletePokemon", {
    method: "delete",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({_id : id}) 
  })

  data = await res.json()
  console.log(data)

  location.reload()

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
      console.log(data)

      img_url = data.sprites.other["official-artwork"].front_default
      pokemon_name = data.name
      number = data.id  
      await makeRequet(pokemon_name, img_url, number)

    }catch(err){
      message = document.querySelector('#message')
      message.style.display = 'block'
      message.innerText = "Alert: Wrong pokemon Name"
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

  //data = await res.json()
  //console.log(data)
  location.reload()


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

  //data = await res.json()
  //console.log(data)
  location.reload()

}