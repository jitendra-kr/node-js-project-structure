const mongoose		= require('mongoose'),
	path			= require('path'),
	helperLib		= require(path.resolve('./config/lib/helper_lib')),
	schema			= mongoose.Schema;


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


/*hash password using MD5*/

userProfile.pre('save', function(next){

	if (this.password){
		let Crypt = new helperLib.crypt.crypt()
		this.password = Crypt.hash(this.password)
	}	
	next();

})

module.exports = mongoose.model('userProfileModel', userProfile);	