var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

require('./server/config/mongoose');

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());

require('./server/config/routes')(app);

var server = app.listen(3006, function(){
	console.log('listening on port 3006...');
})

var sockets = require('./server/config/sockets')(server);