#!/usr/bin/env node
var program = require('commander');
var remote = require('./');

var PORT = 33333;

program
  .version('0.0.1')
  .arguments('<host> <task>')
  .action(function (host, task) {
    console.log('Remote - '+host+' - '+task)
    remote.hosts.runAction(host, task)
  });

program.parse(process.argv);
