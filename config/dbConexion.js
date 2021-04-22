mongoose = require('mongoose')

// uri="mongodb://localhost/popumon_DB"
uri=process.env.DB_STRING

config = {useNewUrlParser: true,
          useUnifiedTopology: true}

function connectDB() {
  mongoose.connect(uri, config)
    .then(db => console.log('db is connected: '+ db.connection.host))
    .catch( err => console.erro(err) )
}

module.exports = connectDB
