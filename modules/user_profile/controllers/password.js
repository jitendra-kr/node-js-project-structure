

module.exports = class password {

	cunstructor(){
	}

	change(req, res) {
		res.json({status: "change password"});	
	}

	forgot(req, res) {
		res.json({status: "forgot password"});	
	}
}