const path			= require('path'),
	fs 				= require('fs'),
	jwt 			= require('./jwt');


class Middleware {

	constructor(){}

	// fetch jwt token from headers  
	// decode jwt
	// insert jwt object into request
	decodeToken(req, res, next) {

		 let Jwt = new jwt(),
		 	authorization = req.headers.authorization.replace('Bearer ', ''),
		 	decodeToken = Jwt.verify(authorization);
		 	
		 	req.tokenInfo = decodeToken
			next();
	}

	// validate password 
	validatePassword(req, res, next) {

		let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
			password = req.body.password,
			length = password.length,
			minLength = 8,
			maxLength = 12,
			havingSpace = /\s/g.test(password),
			havingSpecialChar = format.test(password),
			resObj = {}; 

			// check password length 
			// password should contain a special character
			// password should not contain white space
			if (length < minLength || length > maxLength || havingSpace || !havingSpecialChar) {
	            
	            resObj.status = 'failed';
	            resObj.statusCode = 400;         

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

	// append logs into file in json form 
	// file name will be current date (.log)
	writeErrorIntoFile(err, req) {

        let dateObj = new Date(),
            year = `/${dateObj.getFullYear()+1}/`,
            month = dateObj.toLocaleString("en-us", {month: "short"}),
            date = `${dateObj.getDate()}.log`,
            dirArray = ['logs', year, month],
            tempDir = '';

        dirArray.forEach((n, i) => {
            tempDir += dirArray[i];

            // if directory does not exist 
            // create directory
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir)
            }
        });

        // delete password from body
        req.body.password = undefined;

        let errObj = JSON.stringify({time: dateObj, params: req.params, query: req.query, body: req.body, headers: req.headers, error: err, message: err.message , stack: err.stack })+ "\n" + "\n" + "\n"+ "\n" + "\n";

        let file = `${tempDir}/${date}`;

        if (!fs.existsSync(file)) {

        	// file does not exist
        	// create file and insert error
            fs.writeFileSync(file, errObj);
        }else{

        	// if file already exist
            fs.appendFileSync(file, errObj);
        }		
	}

}

module.exports = Middleware
