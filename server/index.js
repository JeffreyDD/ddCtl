#!/usr/bin/env node
var program = require('commander');
var dgram = require('dgram');

var PORT = 33333;

var server = dgram.createSocket('udp4');

var plugins = {}
plugins.robotjs = require('./plugins/robotjs')
plugins.powermgmt = require('./plugins/powermgmt')
plugins.cli = require('./plugins/cli')

server.on('listening', function () {
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (messageStr, remote) {
  var message = JSON.parse(messageStr)
  console.log(remote.address + ':' + remote.port +' - calling plugin' + message.plugin +' with payload ' + message);
  plugins[message.plugin](JSON.parse(messageStr))
});

server.bind(PORT);
