const path			= require('path'),
	router 			= require('express').Router(),
	dir 			= `${path.dirname(__dirname)}/controllers`,
	helperLib		= require(path.resolve('./config/lib/helper_lib'));



let ReadDirectory 	= new helperLib.read_directory.readDirectory();
let Middleware 		= new helperLib.middleware();

//@ require all controllers for this module
let fileObj 		= ReadDirectory.requireFiles(dir);


//@ routes mapping
router
	.post('/register', 		  Middleware.validatePassword,		fileObj['user.account'].register)		
	.put('/update', 		  Middleware.decodeToken,     		fileObj['user.account'].updateProfile)
	.post('/login', 											fileObj['user.account'].login)
	.put('/change-password',  Middleware.decodeToken,   		fileObj['user.account'].changePassword)
	.put('/forgot-password',   Middleware.decodeToken,   		fileObj['user.account'].resetPassword);


module.exports = {
	router: router,
	base: '/api/user'	
};

