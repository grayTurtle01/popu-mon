const express = require('express')

// Enviroment Variables
dotenv = require('dotenv')
dotenv.config({path: './config/.env'})

//DB Conexion
connectDB = require('./config/dbConexion')
connectDB()

server = express()

//SetUp
server.set('view engine', 'ejs') 

//MiddleWares
server.use( express.urlencoded({extended:true}))
server.use( express.json() )
server.use( express.static('public') )

// Routers
rootRouter = require('./routes/home')
pokemonsRouter = require('./routes/pokemons')

// Routes-Middlewars
server.use("/", rootRouter )
server.use("/pokemons", pokemonsRouter)


PORT = process.env.PORT
server.listen(PORT, 
  console.log(`--> Server running on port: ${PORT}`)
  )
