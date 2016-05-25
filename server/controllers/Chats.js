var mongoose = require('mongoose');
var User = mongoose.model('User');
var Chat = mongoose.model('Chat');

module.exports = {
	index: function(req, res){
		Chat.find({}).exec(function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				res.json(doc);
			}
		})
	},
	create: function(input, callback){
		var chat = new Chat(input);
		chat.save(function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				callback();
			}
		})
	}
}