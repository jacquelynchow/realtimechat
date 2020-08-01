// run node server.js

// express module
var express = require("express");
var app = express();

// socket.io library
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));

io.on("connection", function(client) {
  console.log("Client connected...");
    // when client has joined, we can listen for the join event 
    // from client.js to log data from client
  client.on("join", function(data) {
    // this is the message from emit() in client.js
    console.log(data);
  });

  client.on("messages", function(data) {
    client.emit("thread", data);
    // once our messages event is listened for (in client.js)
    // and once the server recieves it, it is broadcasted to all
    // the other clients using client.broadcast.emit
    client.broadcast.emit("thread", data);
  });
});

server.listen(7777);