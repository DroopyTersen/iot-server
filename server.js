// This an example of an Express server you could use to allow devices 
// to trigger events with an HTTP POST (in case they can't run javascript)
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var server = require('http').Server(app);
var config = require("./config");
var spark = require("spark");
var iotEvents = require("droopy-iot").create("brain");
var relays = require("./src/relays");

app.use(bodyParser.json());    

// respond with "hello world" when a GET request is made to the homepage
app.get('/trigger', function(req, res) {
  res.send('hi there');
});

app.post('/trigger', function(req, res) {
    console.log(req.body);
    try {
        if (req.body && req.body.type && req.body.target && req.body.source) {
            var payload = req.body.payload || {};
            iotEvents.trigger(req.body.type, payload, req.body.target, req.body.source);
            res.send("success");
        } else {
            res.send("fail");
        }
    } catch(ex) {
        console.log("failure");
        console.log(ex);
        res.send("fail");
    }
});

spark.login({username: config.photon.email, password: config.photon.password}).then(
  function(token){
    console.log('SPARK API call completed on promise resolve: ', token);
    relays.init();
    iotEvents.subscribe("relay", handleRelay)
  },
  function(err) {
    console.log('SPARK API call completed on promise fail: ', err);
  }
);

var handleRelay = function(payload) {
    if (payload && payload.relay && payload.command) {
        relays[payload.relay][payload.command]();
    }
};

var port = process.env.PORT || 2000;
var host = process.env.IP;
if (host) {
	server.listen(port, host, function() {
  		console.log('Server listening on port ' + host + ":" + port);
	});
} else {
	server.listen(port, host, function() {
  		console.log('Server listening on port ' + port);
	});
}