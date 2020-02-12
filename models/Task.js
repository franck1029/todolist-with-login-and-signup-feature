const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
	user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
       },
	name: {
		type: String,
		required: true
	},
	isDone: {
		type: Boolean,
		default: false
	}

});

module.exports = Task = mongoose.model('task', TaskSchema);