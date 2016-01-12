var Board = require("./board");
var boards = {
    scotty: {
        name: "ScottyPippen",
        id: "38001e000447343233323032"
    }
};

//todo: make singleton
var getBoard = function(key) {
    if (boards[key]) {
        return new Board(boards[key].name, boards[key].id)
    }
};

module.exports = { getBoard: getBoard }
