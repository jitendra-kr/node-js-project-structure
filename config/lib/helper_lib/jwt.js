const path				= require('path'), 
	jwtToken 			= require('jsonwebtoken'),
	Crypt				= require('./crypt').crypt,
	ENV 				= require(path.resolve(`./config/env/${process.env.NODE_ENV}`));


class Jwt {

	constructor() {
		this.key = new Buffer(ENV.JWT_KEY).toString('base64') ;
	}

	sign(data) {

		let crypt = new Crypt() ;
		let payload = crypt.encrypt(data) ;

		let token = jwtToken.sign(payload, this.key) ;

		return token ;		
	}

	verify (token) {

		let decoded = jwtToken.decode(token, {complete: true}) ;
		let payload = decoded.payload ;

		let crypt = new Crypt() ;
		let decrypt = crypt.decrypt(payload) ;

			try{
				payload = JSON.parse(decrypt)  ;
			}catch(e){
				payload = decrypt ;
			}			

		return payload ;
	}	
}

module.exports = Jwt
