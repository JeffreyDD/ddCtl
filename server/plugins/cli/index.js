var ps = require("child_process");

module.exports = function(payload) {
  if(payload.action){
    ps.execSync(payload.action)
  }
}
