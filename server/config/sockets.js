var mongoose = require('mongoose');
var Users = require('./../controllers/Users');
var Chats = require('./../controllers/Chats');
var activeUsers = require('./../controllers/activeUsers');
var User = mongoose.model('User');
var Chat = mongoose.model('Chat');
var activeUser = mongoose.model('activeUser');
var moment = require('moment');


module.exports = function(server){
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket){
		
		console.log('new socket connection...');

		io.emit('newUser', {socket: socket.id});

		socket.on('disconnect', function(){
			activeUsers.destroy(socket.id, function(output){
				var msg = {};
				msg.text = output + " left at " + moment().format('h:mm a') + " on " + moment().format('MMMM Do, YYYY');
				msg._user_name = "ADMIN";
				Chat.create(msg, function(){
					io.emit('updateChat');
				})
			})
		})

		socket.on('displayNewUser', function(data){
			var msg = {}
			msg.text = data.name + " joined at " + moment().format('h:mm a') + " on " + moment().format('MMMM Do, YYYY');
			msg._user_name = "ADMIN";
			Chat.create(msg, function(){
				io.emit('updateChat');
			})
		})

		socket.on('newChat', function(data){
			var msg = {};
			if(data.chat.text.indexOf('/roll') != -1){
				var arr = data.chat.text.split(" ");
				num = arr[1];
				var roll = Math.floor(Math.random() * num + 1);
				msg.text = data.chat._user_name + " rolled " + roll + " out of " + num + ".";
				msg._user_name = "ADMIN";
			}
			else{
				msg = data.chat;
			}
			Chat.create(msg, function(){
				io.emit('updateChat');
			});
		})

		socket.on('classSelected', function(data){
			activeUser.update({name: data.name}, {name: data.name + ' as the ' + data.class}, function(err){
				if(err){
					console.log(err)
				}
				else{
					var msg = {};
					msg.text = data.name + ' has selected the ' + data.class + '.';
					msg._user_name = "ADMIN";
					Chat.create(msg, function(){
						io.emit('updateChat');
					})
				}
			})
		})
	})
}