var wemore = require("wemore");
var initialPort = 9000;
var Esp2866 = require("./esp2866");
var outlets = [
    //{
    //     name: "Corner Light",
    //     on() {
    //         console.log("Corner Light turned on");
    //     },
    //     off() {
    //         console.log("Corner Light turned off");
    //     }
    // }
];

exports.start = function (iot) {
    var esp2866_One = new Esp2866("192.168.1.48", iot)
    esp2866_One.registerOutlet("Corner Light", "three");
    esp2866_One.registerOutlet("Fish Tank", "four");
    outlets = outlets.concat(esp2866_One.outlets);

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