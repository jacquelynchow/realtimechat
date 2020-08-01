// initializing socket, connection to server
var socket = io.connect("http://localhost:7777");
// on connect, emit message to confirm our connection with an event of join
socket.on("connect", function(data) {
  socket.emit("join", "Hello server from client");
});

// listener for 'thread' event that will recieve any messages emitted 
// by the server; which updates messages
socket.on("thread", function(data) {
  $("#thread").append("<li>" + data + "</li>");
});

// when form is submitted (using Jquery .submit() function), get the value in message id
// send message to server, reset the form  
// use return false to prevent form from it's default action (refreshing page)
$("form").submit(function() {
  var message = $("#message").val();
  socket.emit("messages", message);
  this.reset(); // reset form
  return false;
});