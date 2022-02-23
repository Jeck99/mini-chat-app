// creating the server 
const netServer = require('http').createServer(handler)
// creating the socket based on the server
const io = require('socket.io')(netServer);
// importing the fs module
const fs = require('fs');
// request handler function to handle the request event
function handler(req, res) {
  // reading the html file
  fs.readFile(__dirname + '/index.html',
    (err, data) => {
      if (err) {
        return res.end('Error loading index.html');
      }
      // sending the html file - the browser will render it
      res.end(data);
    });
}
// listening on to the connection event
io.on('connection', (socket) => {
  socket.on('message', msg => {
    // sending the message to all the clients
    io.emit('message', msg);
  });
});
// listening on to the port 3000
netServer.listen(3000);
