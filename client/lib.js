var dgram = require('dgram');

module.exports = {}

module.exports.send = function(message, HOST, PORT){
  var messageBuf = new Buffer(JSON.stringify(message));
  var client = dgram.createSocket('udp4');
  client.send(messageBuf, 0, messageBuf.length, PORT, HOST, function(err, bytes) {
      if (err) throw err;
      console.log('UDP message sent to ' + HOST +':'+ PORT + ':');
      console.log(message);
      client.close();
  });
}
