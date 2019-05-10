/*
import React, {Component} from 'react';
import { Server } from 'net';

var app = require('./App');
var net = require('net');

var HOST = '192.168.0.101';
var PORT_1 = 5000;
var PORT_2 = 5001;
var PORT_3 = 5002;


console.log("test");
net.createServer(function(sock) {
    sock.on('data', function(data) {
        data = parseInt(data.toString(), 10)
        app.updateValue(data, 1, 1);
    });
}).listen(PORT_1, HOST);

net.createServer(function(sock) {
    sock.on('data', function(data) {
        data = parseInt(data.toString(), 10)
        app.updateValue(data, 2, 2);
    });
}).listen(PORT_2, HOST);

net.createServer(function(sock) {
    sock.on('data', function(data) {
        data = parseInt(data.toString(), 10)
        app.updateValue(data, 3, 3);
    });
}).listen(PORT_3, HOST);


class Server extends Component {
}

export default Server;
*/

const io = require('socket.io')();


var cur_d = 0;

const bufEmitter = require('./Serv'); 
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