Model = require('../models/Pokemon')


obj = {
  renderPokemons: async (req, res)=>{
    try{
      pokemons = await Model.find({}).sort({likes:-1})
      res.render('pokemons.ejs', {"pokemons": pokemons  })

    }catch(err){
    
      console.error(err)
    }
  },

  addPokemon: async (req, res)=>{
     let pokemon_name = req.body.name
     
     array = await Model.find({name: pokemon_name})
    try{

      if( array.length > 0)
        throw "--> That pokemon already exist"
      
       new_pokemon = req.body
       new_pokemon.likes = 0
     
       await Model.create(new_pokemon)
       res.redirect("/pokemons")

     }catch(err){
       
       pokemon = array[0]
       pokemon.likes++
       pokemon.save()  
       console.error(err)
       res.redirect('/pokemons')
     }
  },
  
  deletePokemon: async (req, res)=>{
    
    try{
      obj = await Model.deleteOne({_id : req.body._id })
      res.json( obj )

    }catch(err){
   
      console.error(err)
    }

  },
 
 addLike: async (req, res)=>{
    
  try{
    pokemon = await Model.findById({_id : req.body._id })
    //console.log(obj)
    pokemon.likes++
    await pokemon.save()

    pokemons = await Model.find().sort({likes: -1})

    res.json( pokemons )

  }catch(err){
 
    console.error(err)
  }

 },
 
 disLike: async (req, res)=>{
    
  try{
    pokemon = await Model.findById({_id : req.body._id })
    //console.log(obj)
    pokemon.likes--
    await pokemon.save()

    pokemons = await Model.find().sort({likes: -1})

    res.json( pokemons )

  }catch(err){
 
    console.error(err)
  }

 },    
 
}

module.exports = obj
