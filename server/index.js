#!/usr/bin/env node
const process = require('process')
const dgram = require('dgram')

var PORT = 33333;

var configPath = process.env.HOME+'/.ddctl/server.json'
var config = JSON.parse(fs.readFileSync(configPath))

var plugins = {}
config.plugins.forEach(function(item){
  try {
    var pluginPkg = require(item+'/package.json')
    var pluginName = pluginPkg.pluginName || item

    plugins[pluginName] = require(item);
  }
})

var server = dgram.createSocket('udp4');

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
