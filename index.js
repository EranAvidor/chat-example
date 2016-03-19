var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });
  socket.on('chat message', function(msg){
  	var receivedTime = new Date();
    io.emit('chat message', { message: msg, received_time: receivedTime.toJSON(), value: 1 })
  });
});

http.listen(3113, function(){
  console.log('listening on *:3113');
});
