var droopyIot = require("./node_modules/droopy-iot/entries/entry.server");
var server = new droopyIot.Server("iot-server");
var fauxmoServer = require("./src/fauxmo");
server.start();
fauxmoServer.start(server.iot);