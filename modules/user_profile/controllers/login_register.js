
 module.exports = class loginRegister {

	constructor () {}

	register(req, res){
		res.json({status: "register"});		
	}

	login(req, res){		
		res.json({status: "login"});
	}

}