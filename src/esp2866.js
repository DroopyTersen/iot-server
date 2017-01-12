var Esp2866 = function(ip, iot) {
    this.outlets = [];
    this.ip = ip;
    this.iot = iot;
}

Esp2866.prototype.registerOutlet = function(name, outlet) {
    var relay = { name, outlet,ip: this.ip, type: "esp2866" };
    relay.on = () => {
        var payload = { outlet: relay.outlet, ip: this.ip, type: "esp2866", state: 1 };
        this.iot.trigger("toggle-power", payload);
    }
    relay.off = () => {
        var payload = { outlet: relay.outlet, ip: this.ip, type: "esp2866", state: 0 };
        this.iot.trigger("toggle-power", payload);
    }
    this.outlets.push(relay);
    return relay;
}

module.exports = Esp2866;