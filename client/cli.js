#!/usr/bin/env node
var program = require('commander');
var ddctlClient = require('./');

var PORT = 33333;

program
  .version('0.0.1')
  .arguments('<host> <plugin> <key> <value>')
  .action(function (host, plugin, key, value) {
    console.log('sending %s,%s over %s to %s', key, value, plugin, host)
    var message = {"plugin": plugin}
    message[key] = value
    ddctlClient.send(message, host, PORT)
  });

program.parse(process.argv);
