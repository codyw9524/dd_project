var mongoose = require('mongoose');
var User = mongoose.model('User');
var Chat = mongoose.model('Chat');
var activeUser = mongoose.model('activeUser');

module.exports = {

	index: function(req, res){
		activeUser.find({}).sort({logged_in_at: -1}).exec(function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				res.json(doc);
			}
		})
	},
	create: function(req, res){

	},
	destroy: function(input, callback){
		activeUser.findOne({_socket: input}, function(err, user){
			if(err){
				console.log(err);
			}
			else{
				activeUser.remove({_socket: input}).exec(function(err, doc){
					if(err){
						console.log(err);
					}
					else{
						if(user != null){
							callback(user.name);
						}
					}
				})
			}
		})
	}
}