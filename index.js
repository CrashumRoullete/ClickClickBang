var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
io.origins('*:*')
// var cors = require('cors')
var config = require('./config.js')
const MongoClient = require('mongodb').MongoClient

const PORT = process.env.PORT || 5000;
// app.use(cors())
app.use(express.static(__dirname + '/public'))

server.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));

const sockets = []

io.on('connection', function (socket) {
  sockets.push(socket)
  socket.on('join room', function (data) {
    console.log(data)
    MongoClient.connect('mongodb://ds139937.mlab.com:39937/clickclickbang', (err, db) => {
        if (err) console.log(err)
        if (!err) {
          console.log('successfully connected to the database')
          db.authenticate(config.username, config.password, (err, res) => {
            if (err) return console.log(err)
            console.log('Successfully authenticated into the database')
            const collection = db.collection('game')
            collection.insertOne(
              {
                id: data.id,
              },
              (err, result) => {
                if (err) console.log(err)
              })
            db.close()
          })
        }
      })
  })

})
