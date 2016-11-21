#!/usr/bin/env node
const process = require('process')
const fs = require('fs')
const dgram = require('dgram')
const requireg = require('requireg')

// Fetch / Create Config
var configPath = process.env.HOME+'/.ddctl/server.json'
try {
  var config = JSON.parse(fs.readFileSync(configPath))
} catch(err) {
  console.log('No config file found in ~/.ddctl/server.json')
  var config = {}
}


// Load Plugins
var plugins = {}
if(!config.plugins)
  console.log('No plugins specified in server config!')
else
  config.plugins.forEach(function(plugin){
    try {
      var pluginPkg = requireg(plugin+'/package.json')
      var pluginName = pluginPkg.pluginName || plugin

      plugins[pluginName] = requireg(plugin);
    } catch(err) {
      console.log('error loading plugin '+plugin+': ', err)
    }
  })

// Load Transports
var transports = Array()
if(!config.transports)
  console.log('No transports specified in server config!')
else
  config.transports.forEach(function(transportCfg){
    try {
      var transportPkgMnf = requireg(transportCfg.package+'/package.json')
      var transportPkg    = requireg(transportCfg.package)
      var transport       = new transportPkg(transportCfg)

      transport.listen(function(err, res){
        try {
          plugins[res.plugin](res)
        } catch(err) {
          console.log('error(!!) processing payload: ', err)
        }
      })

      transports.push(transport)

    } catch(err) {
      console.log('error loading transport: ', transportCfg, err)
    }
  })
