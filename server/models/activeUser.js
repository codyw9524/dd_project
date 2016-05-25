var mongoose = require('mongoose');

var activeUsersSchema = mongoose.Schema({
	name: String,
	_socket: String,
	logged_in_at: {type: Date, default: new Date}
})

var activeUser = mongoose.model('activeUser', activeUsersSchema);