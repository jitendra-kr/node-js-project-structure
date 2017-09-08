const express		= require('express'),
	path			= require('path'),
	fs 				= require('fs'),
	router 			= express.Router(),
	commonLib		= require(path.resolve('./config/lib/helper')),
	files			= fs.readdirSync(`${path.dirname(__dirname)}/controllers`),
	password		= require('../controllers/password'),
	loginRegister	= require('../controllers/login_register');

// fs.readdirSync(`${path.dirname(__dirname)}/controllers`)
//   .forEach((file) => {
// 			file  = path.parse(file).name
// 			console.log(file)			
// })

router
	.get('/register', loginRegister.class.register)
	.get('/login', loginRegister.class.login)
	.put('/change-password', password.class.changePassword)
	.put('/forgot-password', password.class.forgotPassword);

module.exports = router;
