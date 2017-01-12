var droopyIot = require("./node_modules/droopy-iot/entries/entry.server");
var server = new droopyIot.Server("iot-server");
var fauxmoServer = require("./src/fauxmo");
server.start();
fauxmoServer.start(server.iot);


var request = require("request-promise-native");
server.iot.subscribe("toggle-power", function(payload) {
    if (payload && payload.type === "esp2866") {
        var url = `http://${payload.ip}/relay/${payload.outlet}/${payload.state}`
        request.get(url);
    }
});