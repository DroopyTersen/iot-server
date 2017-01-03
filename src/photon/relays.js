var photons = require("./photon/boards");
var PhotonRelay = require("./photon/relay");


var relays = {
    cornerLight: null,
    fishTank: null
};

relays.init = function() {
    var scottyPippen = photons.getBoard("scotty");
    relays.cornerLight = new PhotonRelay(scottyPippen, "D1");
    relays.fishTank = new PhotonRelay(scottyPippen, "D0");
};

module.exports = relays;