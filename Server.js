var net = require('net');
var HOST = '192.168.0.101';
var PORT = 5000;

var buf = "";
var mid_socket = new net.Socket();

const EventEmitter = require('events');
class BufEmitter extends EventEmitter {}

module.exports = new BufEmitter();

net.createServer(function(sock) {

  console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
  sock.on('data', function(data) {
    buf = data;
    module.exports.emit('socket_data', buf); 
    buf = "";
  });

  sock.on('close', function (data) {
    console.log('CLOSED: ' + sock.remoteAddress + ':' + sock.remotePort);
  });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
