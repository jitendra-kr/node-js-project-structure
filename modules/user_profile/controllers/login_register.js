
 module.exports = class loginRegister {

	constructor () {}

	register(req, res){
		try{
			var a = b;
			res.json({status: "register"});					
		}catch(e){
			console.log(e)
		}
		
	}

	login(req, res){		
		res.json({status: "login"});
	}
}