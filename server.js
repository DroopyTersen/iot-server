var droopyIot = require("./node_modules/droopy-iot/entries/entry.server");
var server = new droopyIot.Server("iot-server");
server.start();