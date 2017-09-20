const path			= require('path'),
	// _ 				= require('lodash')
	fs 				= require('fs'),
	router 			= require('express').Router(),
	dir 			= `${path.dirname(__dirname)}/controllers`,
	helperLib		= require(path.resolve('./config/lib/helper_lib'));


let ReadDirectory 	= new helperLib.read_directory.readDirectory()

const fileObj 		= ReadDirectory.requireFiles(dir)

function decodeToken(req, res, next) {
		let Jwt = new helperLib.jwt.jwt(),
		 authorization = req.headers.authorization.replace('Bearer ', ''),
		 decodeToken = Jwt.verify(authorization);
		 req.tokenInfo = decodeToken
		next();
}

router
	.post('/register', 						fileObj.login_register.register)
	.put('/update', 						fileObj.login_register.updateProfile)
	.post('/login', 						fileObj.login_register.login)
	.put('/change-password',  decodeToken, 	fileObj.login_register.changePassword)
	.put('/forgot-password', 				fileObj.password.password.forgotPassword)


module.exports = {
	router: router,
	base: '/api/user-profile'	
};

