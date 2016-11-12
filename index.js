var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var config = require('./config.js')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// app.get('/', function(request, response) {
//   response.send('Hello from Node Knockout 2016!')
// })

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://ds139937.mlab.com:39937/clickclickbang', (err, db) => {
    if (err) console.dir(err)
    if (!err) {
      console.log('successfully connected to the database')
      db.authenticate(config.username, config.password, (err, res) => {
        if (err) return console.log(err)
        console.log('Successfully authenticated into the database')
        const collection = db.collection('game')
        collection.insertOne(
          {
            id: 'id',
            socket: 'socket',
          },
          (err, result) => {
            if (err) console.log(err)
          })
        db.close()
      })
    }
  })

const sockets = []

io.on('connection', function (socket) {
  sockets.push(socket)
  socket.emit('news', { hello: 'world' });
});
