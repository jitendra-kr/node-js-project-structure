

module.exports = class password {

	cunstructor(){}

	changePassword(req, res) {
		res.json({status: "change password"});	
	}

	forgotPassword(req, res) {
		res.json({status: "forgot password"});	
	}
}