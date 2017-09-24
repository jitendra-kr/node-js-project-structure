const path			= require('path'),
	jwt 			= require('./jwt');

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

	//@ citation required
	
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
	            resObj.statusCode = 400  ; //@ failed status code is never 200 
	         
	         	//@ password hint should be shown on front end and to be handled there only, 
	         	//@ server should not be dicating the password hints
	         	//@ server responsonble for only validation and not suggestions
	            //resObj.hint = 'Password@' ; 

	            //@ instead of 
	            // resObj.message = length < minLength  
	            // 				? 'password minimum length should be '+minLength
	            // 				: length > maxLength
	            // 				? 'password maximum length should be '+maxLength
	            // 				: havingSpace
	            // 				? 'password should not contain any space'
	            // 				: 'password should have one special character'

	            //@ can be
	            if(length < minLength || length > maxLength){
	            	resObj.message = "password length shoud be not be less than " + minLength + " and should not be greater than " +maxLength ;
	            }else if (havingSpace || !havingSpecialChar){
	            	resObj.message = "password should not contain any spaces or special character ";
	            }

	            res.status(resObj.statusCode).json(resObj);
	            
			}else{
				next() ;		
			}
		
	}
}

module.exports = Middleware
