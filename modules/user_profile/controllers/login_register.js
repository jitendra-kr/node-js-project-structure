const path 					= require('path'),
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
		res.json({status: "login"});
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