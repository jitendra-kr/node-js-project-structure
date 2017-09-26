const path			= require('path'),
	fs 				= require('fs'),
	jwt 			= require('./jwt');


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
	            
	            resObj.status = 'failed';
	            resObj.statusCode = 400;         

	            //@ can be
	            if(length < minLength || length > maxLength){
	            	resObj.message = "password length shoud be not be less than " + minLength + " and should not be greater than " +maxLength ;
	            }else if (havingSpace || !havingSpecialChar){
	            	resObj.message = "password should not contain any spaces or special character ";
	            }

	            res.status(resObj.statusCode).json(resObj);
	            
			}else{
				next();		
			}
		
	}


	writeErrorIntoFile(err, req) {

        let dateObj = new Date(),
            year = `/${dateObj.getFullYear()+1}/`,
            month = dateObj.toLocaleString("en-us", {month: "short"}),
            date = `${dateObj.getDate()}.log`,
            dirArray = ['logs', year, month],
            tempDir = '';

        dirArray.forEach((n, i) => {
            tempDir += dirArray[i]
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir)
            }
        });

        req.body.password = undefined;
        
        let errObj = JSON.stringify({time: dateObj, params: req.params, query: req.query, body: req.body, headers: req.headers, error: err, message: err.message , stack: err.stack })+ "\n" + "\n" + "\n"+ "\n" + "\n";

        let file = `${tempDir}/${date}`;

        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, errObj);
        }else{
            fs.appendFileSync(file, errObj);
        }		
	}

}

module.exports = Middleware
