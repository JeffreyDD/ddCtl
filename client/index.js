var dgram = require('dgram');

var ddctlClient = require('./lib');

var PORT = 33333;
var HOST = '127.0.0.1';

var message = {"plugin":"robotjs","keyTap":"audio_pause"}
ddctlClient.send(message, HOST, PORT)
