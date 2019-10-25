const io = require('socket.io')();

var cur_d = 0;

const bufEmitter = require('./Server'); 
bufEmitter.on('socket_data', function(d) { //called each time new socket data is received by client
    cur_d = d.toString();
    console.log(cur_d);
});

io.on('connection', function (socket) {
    setInterval(() => {socket.emit('socket_data', cur_d);}, 40);
});

const port = 1337
io.listen(port)
console.log('Listening on port ' + port + '...')