const path = require('path');

class Password {

	cunstructor(){}

	changePassword(req, res) {
		res.json({status: "change password"});	
	}

	forgotPassword(req, res) {
		res.json({status: "forgot password"});	
	}
}

module.exports = {
	password: new Password()
}