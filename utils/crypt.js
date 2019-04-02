const crypto 			= require('crypto'),
	path = require('path'),
	Config = require(path.resolve("./configuration"));


const config = Config.getConfig();
class Crypt {

	constructor() {
		this.key  = config.ENCRYPTION_KEY ;
		this.algo = config.ENCRYPTION_ALGO ;
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
		   decrypted = decipher.update(encryptedText)


		  decrypted = Buffer.concat([decrypted, decipher.final()]);

	  return decrypted.toString();

	}

	hash(data) {

		data = crypto.createHash('md5').update(data).digest('hex');
		return data;

	}

	compareHash(data, password) {

		let hash = this.hash(data),
			isEqual = hash == password;
		return isEqual;

	}
}


module.exports = {
	crypt: Crypt
}