var mongoose = require('mongoose');
var User = mongoose.model('User');
var activeUser = mongoose.model('activeUser');

module.exports = {
	index: function(req, res){
		User.find({}).exec(function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				res.json(doc);
			}
		})
	},
	create: function(req, res){
		var active;
		User.findOne({name: req.body.name}).exec(function(err, user){
			if(err){
				console.log(err);
			}
			else if(user != null){
					active = user;
			}
			else{
				var user = new User(req.body);
				user.save(function(err, doc){
					if(err){
						console.log(err);
					}
					else{
						active = doc;
					}
				})
			}
			var current = new activeUser(req.body);
			current.save(function(err, doc){
				if(err){
					console.log(err);
				}
				else{
					res.json(doc);
				}
			})
		})
	}
}