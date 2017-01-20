var wemore = require("wemore");
var initialPort = 9000;
var Esp8266 = require("./esp8266");

exports.start = function (iot) {
    var outlets = []; // { name, on(), off() }
    
    var esp8266_One = new Esp8266("192.168.1.193", iot)
    esp8266_One.registerOutlet("Corner Light", 0);
    esp8266_One.registerOutlet("Fish Tank", 1);
    esp8266_One.registerOutlet("Lamp", 2);
    outlets = outlets.concat(esp8266_One.outlets);

    for (var i = 0; i < outlets.length; i++) {
        outlets[i].port = initialPort + i;
    }
    var fauxmos = outlets.map(createOutlet);
    return fauxmos;
}

var createOutlet = function (outlet) {
    var fauxmo = wemore.Emulate({
        friendlyName: outlet.name,
        port: outlet.port
    });
    fauxmo.on("listening", () => {
        console.log(`${outlet.name} listening on port ${outlet.port}`)
    })
    fauxmo.on("on", outlet.on);
    fauxmo.on("off", outlet.off);
    return outlet;
}