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

module.exports.hosts.runAction = function(host, action){
  var host = this.get(host)

  var hostProt = host.uri.split(':')[0]
  var hostAddr = host.uri.split(':')[1].replace('//','')
  var hostPort = host.uri.split(':')[2]

  var action = host.actions[action]

  console.log('action', 'hostAddr', 'hostPort')
  console.log(action, hostAddr, hostPort)

  if(hostProt == 'udp')
    client.send(action, hostAddr, hostPort)
  else
    throw "Host protocol is not upd"
}
