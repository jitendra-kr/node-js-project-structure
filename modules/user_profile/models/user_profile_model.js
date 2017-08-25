const mongoose		= require('mongoose'),
	schema			= mongoose.Schema;


let userProfile = new schema({
	user_name: {
		type: String,
		required: [true 'user_name is required']
	},
	email: {
		type: String,
		required: [true, 'email is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	}
});

module.exports = mongoose.model('userProfileModel', userProfile);	