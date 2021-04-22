express = require('express')
router = express.Router()

homeControler = require("../controllers/home")
pokemonControler = require('../controllers/pokemon')

router.get("/", homeControler.renderHome )
// router.get("/", pokemonControler.renderPokemons )


module.exports = router
