

class Common {
	constructor(){}

	generateResponses(statusCode, status, message, error, result){
            let resObj = {}

            if(statusCode) resObj.statusCode = statusCode;
            if(status) resObj.status = status ;
            if(message) resObj.message = message;
            if(error) resObj.error = error;
            if(result) resObj.result = result;

            return resObj;		
	}

}

module.exports = {
	common: Common
}