
// const MessController = require("../app/controllers/MessagesController");
const MessModel = require("../app/models/messages");
const moment = require('moment-timezone');
const socketIo = (server)=>{
  // const server = require("http").createServer(app);
  const { Server } = require("socket.io");
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // user onl
  const users = [];
  io.on("connection", (socket) => {
    socket.on("user_connect", (user_id) => {
      users[user_id] = socket.id;
      io.emit("updateUserStatus", users);
      console.log("A User connected:" + user_id);
    });
    
    // user offline
    socket.on("disconnect", () => {
      let i = users.indexOf(socket.id);
      users.splice(i, 1, 0);
      io.emit("updateUserStatus", users);
  
      console.log("A User Disconnect");
    });

    //server nhan mess tu user
    socket.on('send_message_private',(data)=>{
      const date = data.created_at;
      const zone = 'Asia/Ho_Chi_Minh';
      const utcDate = moment.tz(date, zone).utc().format("YYYY-MM-DD HH:mm:ss");
      console.log(utcDate);
      var socketId = users[data.receiver_id];
      io.to(socketId).emit('new_message_private',data);
      data.created_at= utcDate
      MessModel.insert(data,(err,res)=>{
        if (err) res.redirect("/404");
      })
    })
  });
}

  
module.exports = socketIo