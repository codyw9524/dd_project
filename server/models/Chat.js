var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
	text: String,
	_user_name: String,
	created_at: {type: Date, default: new Date}
})

var Chat = mongoose.model('Chat', ChatSchema);