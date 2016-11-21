var requireg = require('requireg');

module.exports = {}

module.exports.send = function(message, hostUri){
  var hostProt = hostUri.split(':')[0]
  var hostAddr = hostUri.split(':')[1].replace('//','')
  var hostPort = hostUri.split(':')[2]

  try {
    var transportPkg = requireg('ddctl-transport-'+hostProt)
  } catch(err) {
    console.log('an error occured while attempting to load the transport for this host:', err)
    return;
  }

  var transportParams = {}

  if(hostPort)
    transportParams.port = hostPort

  var transport = new transportPkg(transportParams);
  transport.send(message, function(err, bytes) {
      if (err) throw err;
      console.log('Message sent to ', hostUri);
      console.log(message);
  })
}
