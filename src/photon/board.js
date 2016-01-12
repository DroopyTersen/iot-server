var spark = require("spark");

var Board = function(name, id) {
    this.name = name,
    this.id = id;
    this.device = null;
    var self = this;
    this.ready = spark.getDevice(id).then(function(device) {
        self.device = device;
    });
};

Board.prototype.callFunction = function(command, param) {
    var self = this;
    
    return self.ready.then(function(){
        return self.device.callFunction(command, param);
    })
}

Board.prototype.digitalWrite = function(pin, value) {
    return this.callFunction("digitalWrite", pin + "," + value);
}

Board.prototype.digitalRead = function(pin) {
    return this.device.callFunction("digitalRead", pin).then(function(data){
        console.log(data);
        return data;
    })
}
module.exports = Board;