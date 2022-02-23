const netServer = require('http').createServer(handler)
const io = require('socket.io')(netServer);
const fs = require('fs');

// netServer.on('request', handler);
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
   (err, data)=> {
    if (err) {
      return res.end('Error loading index.html');
    }
    res.end(data);
  });
}

io.on('connection', (socket) => {
  socket.on('message', msg => {
    io.emit('message', msg);
  });
});

netServer.listen(3000);
