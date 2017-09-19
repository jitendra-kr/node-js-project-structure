const mongoose		= require('mongoose'),
	schema			= mongoose.Schema,
	uniqueValidator = require('mongoose-unique-validator');


let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let userProfile = new schema({

	first_name: {
		type: String,
		trim: true,
		required: [true, 'first name is required']
	},
	last_name: {
		type: String,
		trim: true,
		required: [true, 'last name is required']		
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		validate: [validateEmail, 'Please fill a valid email address'],
		required: [true, 'email is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	}
}, {timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
}});

// userProfile.plugin(uniqueValidator);

module.exports = mongoose.model('userProfileModel', userProfile);	