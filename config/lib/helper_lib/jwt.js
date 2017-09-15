const path				= require('path'), 
	jwtToken 			= require('jsonwebtoken'),
	Crypt				= require('./crypt').crypt,
	ENV 				= require(path.resolve(`./config/env/${process.env.NODE_ENV}`));


class Jwt {

	constructor() {
		this.key = new Buffer(ENV.COMMON.JWT_KEY).toString('base64')
	}

	sign(data) {

		let crypt = new Crypt()
		let encrypt = crypt.encrypt(data);

		let token = jwtToken.sign(encrypt, new Buffer(this.key).toString('base64'));

		return token;			
	}

	verify (token) {

		let decoded = jwtToken.decode(token, {complete: true})
		let payload = decoded.payload

		let crypt = new Crypt()
		let decrypt = crypt.decrypt(payload)

			payload = JSON.parse(decrypt) 

		return payload;
	}	
}