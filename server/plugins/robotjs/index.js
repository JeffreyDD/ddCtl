var robot = require("robotjs");

module.exports = function(payload) {
  if(payload.keyTap){
    robot.keyTap(payload.keyTap);
  }
}
