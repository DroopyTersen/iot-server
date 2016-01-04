// This an example of an Express server you could use to allow devices 
// to trigger events with an HTTP POST (in case they can't run javascript)
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var server = require('http').Server(app);

var iotEvents = require("droopy-iot").create("iot-proxy-server");

app.use(bodyParser.json());    

// respond with "hello world" when a GET request is made to the homepage
app.get('/trigger', function(req, res) {
  res.send('hi there');
});

app.post('/trigger', function(req, res) {
    console.log("HERE");
    console.log(req.body);
    try {
        if (req.body && req.body.type && req.body.target) {
            iotEvents.trigger(req.body.type, req.body.payload || {}, req.body.target);
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