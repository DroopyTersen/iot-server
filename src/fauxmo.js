var wemore = require("wemore");
var initialPort = 9000;
var outlets = [{
        name: "Corner Light",
        on() {
            console.log("Corner Light turned on");
        },
        off() {
            console.log("Corner Light turned off");
        }
    },
    {
        name: "Fish Tank",
        on() {
            console.log("Fish Tank turned on");
        },
        off() {
            console.log("Fish Tank turned off");
        }
    }
];

exports.start = function (iot) {
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