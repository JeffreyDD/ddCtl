#!/usr/bin/env node
var program = require('commander');
var ddctlClient = require('./');

var PORT = 33333;

program
  .version('0.0.1')
  .arguments('<host> <cmd>')
  .action(function (host, cmd) {
     console.log('sending %s to %s', cmd, host)
     var message = {"plugin":"robotjs","keyTap":cmd}
     ddctlClient.send(message, host, PORT)
  });

program.parse(process.argv);
