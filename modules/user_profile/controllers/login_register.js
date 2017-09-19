const path 					= require('path'),
	helperLib				= require(path.resolve('./config/lib/helper_lib')),
	UserProfileModel 		= require('../models/user_profile_model');


class UserAccount {

	constructor () {}

	register(req, res) {


	    let userProfileModel = new UserProfileModel(req.body)

	    userProfileModel.save((err, saved) => {

	        let resObj = {};

	        if (err) {

	                resObj.status 		= 'failed'
	                resObj.statusCode 	= 400
	                resObj.error		= err
	                resObj.message 		= err.code == '11000' ? `email ${req.body.email} already taken` : 'Registration failed'

	        } else {

	                resObj.status 		= 'success'
	                resObj.statusCode  	= 200
	                resObj.message 		= 'Account created successfully'
	                resObj.result 		= saved
	        }

	        res.status(resObj.statusCode).json(resObj);

	    });

	}

	login(req, res){	

		let conditions 	= {'email': req.body.email},
			projection  = {__v:0, created_at:0, updated_at:0, _id:0};

		UserProfileModel.findOne(conditions, projection, (err, user) => {

			let Crypt   = new helperLib.crypt.crypt()
			let	isValid = Crypt.compareHash(req.body.password, user ? user.password : '');
			let resObj  = {};

			if (user && isValid) {

				user.password 		= undefined

                resObj.status 		= 'success'
                resObj.statusCode  	= 200
                resObj.message 		= 'logged in successfully'
                resObj.result 		= user

			}else if(err) {

                resObj.status 		= 'failed'
                resObj.statusCode  	= 500
                resObj.error		= err
                resObj.message 		= 'Unable to login'

			}else{

                resObj.status 		= 'failed'
                resObj.statusCode  	= 400
                resObj.message 		= 'Incorrect user email or password'	

			}

			res.status(resObj.statusCode).json(resObj);
		});

	}


	update(req, res) {

		let data  		= req.body,
			conditions 	= {'email': data.email};

			delete data.password
			delete data.email

		UserProfileModel.update(conditions, data, (err, update) => {

			let resObj = {};

			if (err) {

                resObj.status 		= 'failed'
				resObj.statusCode 	= 500
                resObj.error		= err
                resObj.message 		= `update failed for ${data.email}`

			}else if (update.nModified == 1) {

	            resObj.status 		= 'success'
	            resObj.statusCode 	= 200
	            resObj.message		= 'Account updated successfully'
	            resObj.result		= update
			
			}else{

	            resObj.status 		= 'failed'
				resObj.statusCode 	= 400
	            resObj.error		= err
	            resObj.message		= `${data.email} does not exist`

			}

			res.status(resObj.statusCode).json(resObj);
		});

	}


}

module.exports = {
	loginRegister: new UserAccount()
}