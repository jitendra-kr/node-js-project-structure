const crypto 			= require('crypto'),
	path				= require('path'),
	ENV 				= require(path.resolve(`./config/env/${process.env.NODE_ENV}`));;

class Crypt {

	constructor() {
		this.key  = ENV.COMMON.ENCRYPTION_KEY
		this.algo = ENV.COMMON.ENCRYPTION_ALGO
	}


	encrypt(data) {

		let iv = crypto.randomBytes(16),
			cipher	= 	crypto.createCipheriv(this.algo, new Buffer(this.key), iv),
			encrypted = cipher.update(data);

			encrypted = Buffer.concat([encrypted, cipher.final()]);

			return iv.toString('hex') + ':' + encrypted.toString('hex');

	}

	decrypt(data) {
	   let textParts = data.split(':'),
		   iv = new Buffer(textParts.shift(), 'hex'),
		   encryptedText = new Buffer(textParts.join(':'), 'hex'),
		   decipher = crypto.createDecipheriv(this.algo, new Buffer(this.key), iv),
		   decrypted = decipher.update(encryptedText);

		  decrypted = Buffer.concat([decrypted, decipher.final()]);

	  return decrypted.toString();
	}

}


module.exports = {
	crypt: Crypt
}

// let c = new Crypt();

// let encrypt = c.encrypt('{"a": 1, "b":2}');
// let encrypt = c.decrypt('bedcbd85034dc37eb2ac174994afd9b0:b03861afe09c32548da9bceca9bbd9bc');

// console.log(encrypt);


