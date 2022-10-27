const express = require("express");
const path = require("path");
const Handlebars = require("express-handlebars");
require('./utils/helper') ;
const route = require("./routes");
const morgan = require("morgan");
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
// const server = require('./utils/socket') ;
app.engine("hbs", Handlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true,  }
));

app.use(session({
  secret: 'codeforgeek',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 10000000 }
}));

app.use(flash());
route(app);
app.use(express.static(path.join(__dirname, "public")));
const db = require("./config/db");

const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*',
  }} 
);

io.on('connection', (socket) => {
  socket.on('user_connect', (data)=>{
    // io.sockets.emit('Server_send')
    console.log('A User connected:' + data);
  })
  socket.on('disconnect', ()=>{
    // io.sockets.emit('Server_send')
    console.log('A User Disconnect');

  })
    // socket.on('client_chart', (data)=>{
    //   io.sockets.emit('Server_send',data)
    //   console.log('a user connected :::::' + socket.id + "send " + data);
  
    // })
  });

server.listen(port, () => {
  console.log(` App listening on port ${port}`);
});



