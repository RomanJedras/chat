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
  socket.on('disconnect', function () {
    usersService.removeUser(socket.id);
    socket.broadcast.emit('update', {
      users: usersService.getAllUsers()
    });
  });
  socket.on('message', function (message) {
    var _usersService$getUser = usersService.getUserById(socket.id),
        name = _usersService$getUser.name;

    socket.broadcast.emit('message', {
      text: message.text,
      from: name
    });
  });
}); // klient nasłuchuje na wiadomość wejścia do czatu

socket.on('join', function (name) {
  usersService.addUser({
    id: socket.id,
    name: name
  }); // aplikacja emituje zdarzenie update, które aktualizuje informację na temat listy użytkowników każdemu nasłuchującemu na wydarzenie 'update'

  io.emit('update', {
    users: usersService.getAllUsers()
  });
});
server.listen(3000, function () {
  console.log('listening on *:3000');
});
