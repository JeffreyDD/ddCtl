var ps = require("child_process");

module.exports = function(payload) {
  if(payload.action){
    if(payload.action == 'shutdown')
      ps.execSync("shutdown -h")
    else if(payload.action == 'reboot')
      ps.execSync("reboot")
  }
}
