"use strict";

var express = require('express');

var http = require('http');

var socketIo = require('socket.io');

var UsersService = require('./UsersService');

var app = express();
var server = http.createServer(app);
var io = socketIo(server);
var path = "".concat(__dirname, "/../public");
var usersService = new UsersService();
app.use(express["static"](path));
app.get('/', function (req, res) {
  res.sendFile("".concat(__dirname, "/index.html"));
});
io.on('connection', function (socket) {
  //miejsce dla funkcji, które zostaną wykonane po podłączeniu klienta
  socket.on('join', function (name) {
    usersService.addUser({
      id: socket.id,
      color: generateColor(),
      name: name
    });
    io.emit('update', {
      users: usersService.getAllUsers()
    });
  }); //Aplikacja nasłuchująca na zdarzenie disconnect

  socket.on('disconnect', function () {
    usersService.removeUser(socket.id);
    socket.broadcast.emit('update', {
      users: usersService.getAllUsers()
    });
  });
}); //Aplikacja wysyłająca wiadomości

io.on('connection', function (socket) {
  socket.on('message', function (message) {
    var _usersService$getUser = usersService.getUserById(socket.id),
        name = _usersService$getUser.name;

    socket.broadcast.emit('message', {
      text: message.text,
      from: name
    });
  });
});

generateColor = function generateColor() {
  return '#' + Math.random().toString(16).substr(-6);
};

server.listen(3000, function () {
  console.log('listening on *:3000');
});
