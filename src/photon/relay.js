var Relay = function(board, pin) {
    this.pin = pin;
    this.board = board;
}

Relay.prototype.turnOn = function() {
    this.board.digitalWrite(this.pin, "LOW");
};

Relay.prototype.turnOff = function() {
    this.board.digitalWrite(this.pin, "HIGH");
};

Relay.prototype.isOn = function() {
    
};

module.exports = Relay;
