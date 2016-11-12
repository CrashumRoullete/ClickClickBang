const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const config = require('./config.js')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 5000;
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/', (req, res) => {
  console.log(req.body)
})

server.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));

const sockets = []

io.on('connection', function (socket) {
  sockets.push(socket)
  socket.on('join room', function (data) {
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
                username: data.username,
              },
              (err, result) => {
                if (err) console.log(err)
              })
            db.close()
          })
        }
      })
  })
  socket.on('disconnect', function(data) {
    MongoClient.connect('mongodb://ds139937.mlab.com:39937/clickclickbang', (err, db) => {
      if (err) console.log(err)
      if (!err) {
        console.log('successfully connected to the database')
        db.authenticate(config.username, config.password, (err, res) => {
          if (err) return console.log(err)
          console.log('Successfully authenticated into the database')
          const collection = db.collection('game')
          collection.remove({ id: socket.id})
        })
      }
    })
  })
})


app.get('/data', (req, res) => {
  MongoClient.connect('mongodb://ds139937.mlab.com:39937/clickclickbang', (err, db) => {
    db.authenticate(config.username, config.password, (err, responce) => {
      var collection = db.collection('game');
      collection.find().toArray(function(err, docs) {
        res.send(docs)
      })
    })
  });
})




// MongoClient.connect('mongodb://ds139937.mlab.com:39937/clickclickbang', (err, db) => {
//  if (err) console.log(err)
//  if (!err) {
//    console.log('successfully connected to the database')
//    db.authenticate(config.username, config.password, (err, res) => {
//      if (err) return console.log(err)
//      console.log('Successfully authenticated into the database')

//     db.findAllCards((data) => {
//       if(data) {
//         res.set('Access-Control-Allow-Origin', '*');
//         return res.json(data);
//       }
//     });
//      db.close()
//    })
//  }
// })