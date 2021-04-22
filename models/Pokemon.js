mongoose = require('mongoose')

pokemonSquema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  url_img: {
    type: String,
    require: true
  },
  number: {
    type: String,
    require: true
  },
  likes:{
    type: Number
  }  
})

collection_name = "pokemons"
Model = mongoose.model(collection_name, pokemonSquema)

module.exports = Model
