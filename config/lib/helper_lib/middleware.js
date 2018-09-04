const path			= require('path'),
	fs 				= require('fs'),	
	jwt 			= require('./jwt');



class Middleware {

	//@ fetch jwt token from headers  
	//@ decode jwt
	//@ insert jwt object into request
	decodeToken(req, res, next) {

		 let Jwt = new jwt(),
		 	authorization = req.headers.authorization.replace('Bearer ', ''),
		 	decodeToken = Jwt.verify(authorization);
		 	
		 	req.tokenInfo = decodeToken
			next();
	}

	//@ validate password 
	validatePassword(req, res, next) {

		let helperLib       = require(path.resolve('./config/lib/helper_lib')),
		    format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
			resObj = {},
			password = req.body.password;

			resObj.status = 'failed';
			resObj.statusCode = 400;			

			//@ if password not found 
			if (!password) {
				resObj.message = helperLib.messages.passwordNotFound;
				res.status(resObj.statusCode).json(resObj);
				return;
			}
			
		let length = password.length,
			minLength = 5,
			maxLength = 12,
			havingSpace = /\s/g.test(password),
			havingSpecialChar = format.test(password); 

			//@ check password length 
			//@ password should contain a special character
			//@ password should not contain white space
			if (length < minLength || length > maxLength || havingSpace || !havingSpecialChar) {          

				resObj.message = length < minLength ? "password length shoud be not be less than " + minLength
								 : length > maxLength ? "password should not be greater than " +maxLength
								 : havingSpace ? "password should not contain any spaces"
								 : "password should contain minimum one special character ";

	            res.status(resObj.statusCode).json(resObj);
	            
			}else{
				next();		
			}
		
	}

	//@ append logs into file in json form 
	//@ file name will be current date (.log)
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


	//@ change status type string to integer
	statusStrToInt(req, res, next) {

		//@ change status to number
	 	if (req.body.status == 0 || req.body.status) {
	 		req.body.status = parseInt(req.body.status)
		 	//@ send failed response if status is not number
		 	if (!Number.isInteger(req.body.status)) {
		 		 let resObj = {
		 		 	statusCode: 400,
		 		 	message: 'status should be number'
		 		 }
		 		 //@ send response
		 		 res.status(resObj.statusCode).json(resObj);
		 	}else{	 

		 		//@ OK		
				next();
		 	}
	 	}else{
	 		next();	 		
	 	}


	}

}

module.exports = Middleware
