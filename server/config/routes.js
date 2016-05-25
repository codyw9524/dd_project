var mongoose = require('mongoose');
var User = require('./../controllers/Users');
var Chat = require('./../controllers/Chats');
var activeUser = require('./../controllers/activeUsers');

module.exports = function(app){

	app.post('/users', User.create);

	app.get('/chat', Chat.index);

	app.post('/chat', Chat.create);

	app.get('/activeUsers', activeUser.index);

}