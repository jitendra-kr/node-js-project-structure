const mongoose		= require('mongoose'),
	path			= require('path'),
	helperLib		= require(path.resolve('./config/lib/helper_lib')),
	Schema			= mongoose.Schema;


let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let toLower = (v) => {
  return v.toLowerCase();
}


let userProfileSchema = new Schema({

	first_name: {
		type: String,
		trim: true
	},
	last_name: {
		type: String,
		trim: true		
	},
	gender: {
		type: String, 
		enum: ["male", "female", "other"]	
	},
	email: {
		type: String,
		unique: true,
		set: toLower,
		trim: true,
		validate: [validateEmail, 'Please fill a valid email address'],
		required: [true, 'email is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	lastMod: {
		type: Date
	}
}, 
// {
//   toObject: {virtuals: true },
//   toJSON: {virtuals: true }
// },
{timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
}});



//@mongoose pre hook(middleware)
userProfileSchema.pre('save', function(next){

		console.log('hello i am under pre save hook');

		let Crypt = new helperLib.crypt.crypt();

		
		//@capital first letter of firstname and last name
		this.first_name = this.first_name.charAt(0).toUpperCase()+this.first_name.slice(1)

		this.last_name = this.last_name.charAt(0).toUpperCase()+this.last_name.slice(1)

		//@hash password using MD5
		this.password = Crypt.hash(this.password);

		next();


});

//@set virtual to get full name
userProfileSchema.virtual('full_name').get(function(){

	//@concat first and last name
	return `${this.first_name} ${this.last_name}`

});

module.exports = mongoose.model('UserProfileModel', userProfileSchema);	