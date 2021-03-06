express = require('express')
pokemonsRouter = express.Router()
pokemonController = require('../controllers/pokemon')

pokemonsRouter.get("/", pokemonController.renderPokemons)
pokemonsRouter.post("/addPokemon", pokemonController.addPokemon)
pokemonsRouter.delete("/deletePokemon", pokemonController.deletePokemon)
pokemonsRouter.put("/addLike", pokemonController.addLike)
pokemonsRouter.put("/disLike", pokemonController.disLike)


module.exports = pokemonsRouter
