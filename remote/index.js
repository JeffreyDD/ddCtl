const process = require('process')
const fs = require('fs')
const client = require('../client')

module.exports = {
  hosts: {}
}

module.exports.hosts.list = function(){
  var path = process.env.HOME+'/.ddctl/hosts/'
  try{
    return fs.readdirSync(path)
  }catch(err){
    return []
  }
}

module.exports.hosts.get = function(host){
  var path = process.env.HOME+'/.ddctl/hosts/'+host+'.json'
  return JSON.parse(fs.readFileSync(path))
}

module.exports.hosts.runAction = function(hostName, action){
  var host = this.get(hostName)

  var hostUri = host.uri

  var action = host.actions[action]

  console.log('action', 'hostUri')
  console.log(action, hostUri)

  client.send(action, hostUri)
}
