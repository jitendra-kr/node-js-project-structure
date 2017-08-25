const express		= require('express'),
	router 			= express.Router(),
	password		= require('../controllers/password'),
	loginRegister	= require('../controllers/login_register');


const classA = new loginRegister();
const classB = new password();

router.get('/register', classA.register);
router.get('/login', classA.login);

router.put('/change-password', classB.change);
router.put('/forgot-password', classB.forgot);

module.exports = router;
