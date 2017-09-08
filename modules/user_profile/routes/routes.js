const express		= require('express'),
	router 			= express.Router(),
	password		= require('../controllers/password'),
	loginRegister	= require('../controllers/login_register');


const classA = new loginRegister();
const classB = new password();

	router
		.get('/register', classA.register)
		.get('/login', classA.login)
		.put('/change-password', classB.changePassword)
		.put('/forgot-password', classB.forgotPassword);

module.exports = router;
