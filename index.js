'use strict'
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const config = require('./config.js')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})
app.get('/static/css/main.e73f374c.css', (req, res) => {
  res.sendFile(__dirname + '/build/static/css/main.e73f374c.css')
})
app.get('/static/js/main.2a62f4e0.js', (req, res) => {
  res.sendFile(__dirname + '/build/static/js/main.2a62f4e0.js')
})

server.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));

const sockets = [];
const games = [];

io.on('connection', function (socket) {
  if (sockets.indexOf(socket) < 0) {
    sockets.push(socket);
  }
  socket.on('join room', function (data) {
    console.log('Inserting Socket into database')
    sockets[sockets.indexOf(socket)].username = data.username
    if (sockets.length % 2 === 0 && sockets.length) {
      MongoClient.connect('mongodb://ds139937.mlab.com:39937/clickclickbang', (err, db) => {
        db.authenticate(config.username, config.password, (err, response) => {
          if (err) return console.log(err);
          let obj = {
            socketOne: sockets[0],
            socketTwo: sockets[1],
            player1: sockets[0].id,
            player2: sockets[1].id,
            bullets: 6,
            deadlyBullet: Math.floor(Math.random() * 6 + 1)
          };
          games.push(obj)
          var collection = db.collection('game');
            collection.update({
              id: sockets[0].id,
            }, {
              id: sockets[0].id,
              username: sockets[0].username,
              opponentId: sockets[1].id,
            });
            collection.update({
              id: sockets[1].id,
            }, {
              id: sockets[1].id,
              username: sockets[1].username,
              opponentId: sockets[0].id
            });
          sockets[0].emit('join room', {
            opponentId: sockets[1].id,
            deadlyBullet: obj.deadlyBullet
          });
          sockets[1].emit('join room', {
            opponentId: sockets[0].id,
            deadlyBullet: obj.deadlyBullet
          });
          sockets[Math.round(Math.random())].emit('yourTurn', {
            bullets: obj.bullets,
            deadlyBullet: obj.deadlyBullet,
          });
          sockets.shift()
          sockets.shift()
        })
    })
  }

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
                opponentId: null,
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
    console.log('Deleting Socket from database')
    sockets.splice(sockets.indexOf(socket), 1)
    MongoClient.connect('mongodb://ds139937.mlab.com:39937/clickclickbang', (err, db) => {
      if (err) console.log(err)
      if (!err) {
        db.authenticate(config.username, config.password, (err, res) => {
          if (err) return console.log(err)
          const collection = db.collection('game')
          collection.remove({ id: socket.id })
        })
      }
    })
  })
  socket.on('buttonClicked', function(data) {
    for (let i = 0; i < games.length; i++) {
      if (games[i].player1 === data.id) {
        games[i].bullets--
        games[i].socketTwo.emit('yourTurn', {
          player1: games[i].player1,
          player2: games[i].player2,
          bullets: games[i].bullets,
        })
      } else if (games[i].player2 === data.id) {
        games[i].bullets--
        games[i].socketOne.emit('yourTurn', {
          player1: games[i].player2,
          player2: games[i].player1,
          bullets: games[i].bullets,
        })
      }
    }
  })
  socket.on('rip', function(data) {
    for (let i = 0; i < games.length; i++) {
      if (games[i].player1 === data.id) {
        games[i].socketTwo.emit('winner');
        games.splice(i,1)
      } else if (games[i].player2 === data.id) {
        games[i].socketOne.emit('winner')
        games.splice(i,1)
      }
    }
  })
})


app.get('/data', (req, res) => {
  MongoClient.connect('mongodb://ds139937.mlab.com:39937/clickclickbang', (err, db) => {
    db.authenticate(config.username, config.password, (err, responce) => {
      var collection = db.collection('game');
      collection.find({
        opponentId: null
      }).toArray(function(err, docs) {
        res.send(docs)
      })
    })
  });
})
