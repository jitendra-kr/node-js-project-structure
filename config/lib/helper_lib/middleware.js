const path			= require('path'),
	jwt = require('./jwt');

console.log(/[A-Z]/.test('abcSshfskdf'))

class Middleware {

	constructor(){}

	decodeToken(req, res, next) {

		 let Jwt = new jwt(),
		 	authorization = req.headers.authorization.replace('Bearer ', ''),
		 	decodeToken = Jwt.verify(authorization);
		 	
		 	req.tokenInfo = decodeToken
			next();
	}

	validatePassword(req, res, next) {

		let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
			password = req.body.password,
			length = password.length,
			minLength = 8,
			maxLength = 12,
			havingSpace = /\s/g.test(password),
			havingSpecialChar = format.test(password),
			resObj = {}; 

			if (length < minLength || length > maxLength || havingSpace || !havingSpecialChar) {
	            
	            resObj.status = 'failed' ;
	            resObj.statusCode = 200  ;
	            resObj.hint = 'Password@' ;
	            resObj.message = length < minLength  
	            				? 'password minimum length should be 8'
	            				: length > maxLength
	            				? 'password minimum length should be 12'
	            				: havingSpace
	            				? 'password should not contain white space'
	            				: 'password should have one special character'

	            res.status(resObj.statusCode).json(resObj);

			}else{
				next() ;		
			}
		
	}
}

module.exports = Middleware
