
const MessModel = require("../app/models/messages");
const UserModel = require("../app/models/user");
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
  const req= {};
  io.on("connection", (socket) => {
    socket.on("user_connect", (user_id) => {
      users[user_id] = socket.id;
      io.emit("updateUserStatus", users);
    });
    
    // user offline
    socket.on("disconnect", () => {
      let i = users.indexOf(socket.id);
      users.splice(i, 1, 0);
      io.emit("updateUserStatus", users);
  
    });

    //server nhan mess tu user
    socket.on('send_message_private',  (data)=>{
     
      const date = data.created_at;
      const zone = 'Asia/Ho_Chi_Minh';
      const utcDate = moment.tz(date, zone).utc().format("YYYY-MM-DD HH:mm:ss");
      // console.log(utcDate);
      var socketId = users[data.receiver_id];
      var socketIdSender = users[data.sender_id];

      data.created_at= utcDate
      MessModel.insert(data, async (err,res)=>{
        if (err) res.redirect("/404");
        await res
        req.id =  data.receiver_id;
        UserModel.getListUserMess(req, async (err, dataUser)=>{
            if (err) res.redirect("/404");
          else{
           await io.to(socketId).emit('new_message_private',data,dataUser);
           io.emit("updateUserStatus", users);
          } 
        })
        req.id =  data.sender_id;
        UserModel.getListUserMess(req, async  (err, dataUser)=>{
          if (err) res.redirect("/404");
          else{
          await  io.to(socketIdSender).emit('new_message_private_me',dataUser);
          io.emit("updateUserStatus", users);
          } 
        })
           
      })
    
     
     
    })

    // serve nhan image tu user

    socket.on("sendPhoto", function(data){
      var socketId = users[data.receiver_id];
      var socketIdSender = users[data.sender_id];
      var guess = data.base64.match(/^data:image\/(png|jpeg);base64,/)[1];
      var ext = "";
      switch(guess) {
        case "png"  : ext = ".png"; break;
        case "jpeg" : ext = ".jpg"; break;
        default     : ext = ".bin"; break;
      }
      var savedFilename = "/img/"+randomString(10)+ext;
      fs.writeFile(__dirname+"/public"+savedFilename, getBase64Image(data.base64), 'base64', function(err) {
        if (err !== null)
          console.log(err);
        else
          io.to(socketId).emit("receivePhoto", {
            path: savedFilename,
          });
          console.log("Send photo success!");
      });
    });
  });
}

  
module.exports = socketIo