const express = require("express");
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
cors: {
    origin: '*',
  }} 
);

io.on('connection', (socket) => {
    console.log('a user connected :::::' + socket.id );
    socket.on('client_chart', (data)=>{
    io.sockets.emit('Server_send',data)
    console.log('a user connected :::::' + socket.id + "send " + data);
  
    })
  });
  
module.exports = server