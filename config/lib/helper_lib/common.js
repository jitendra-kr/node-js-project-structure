

class Common {
	constructor(){}

	generateResponses(statusCode, status, message, error, result){
            let resObj = {}

            resObj.statusCode = statusCode;
            resObj.status = status;
            resObj.message = message;
            
            if(error) resObj.error = error;
            if(result) resObj.result = result;

            return resObj;		
	}

}

module.exports = {
	common: Common
}