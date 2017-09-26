const path			= require('path'),
	router 			= require('express').Router(),
	dir 			= `${path.dirname(__dirname)}/controllers`,
	helperLib		= require(path.resolve('./config/lib/helper_lib'));



let ReadDirectory 	= new helperLib.read_directory.readDirectory();
let Middleware 		= new helperLib.middleware();
const fileObj 		= ReadDirectory.requireFiles(dir);



router
	//@ for future use
	//.post('/register', 		  Middleware.validatePassword,							    fileObj.user_account.register)	
	
	.put('/update', 		  Middleware.decodeToken,     								fileObj.user_account.updateProfile)
	.post('/login', 																	fileObj.user_account.login)
	.put('/change-password',  Middleware.decodeToken,   								fileObj.user_account.changePassword)
	.put('/forgot-password',   Middleware.decodeToken,   								fileObj.user_account.resetPassword)


module.exports = {
	router: router,
	base: '/api/user-profile'	
};

