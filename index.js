var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// app.get('/', function(request, response) {
//   response.send('Hello from Node Knockout 2016!')
// })

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
});
