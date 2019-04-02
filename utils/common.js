

class Common {

	generateResponses(statusCode, status, message, error, result){
            let resObj = {}

            resObj.statusCode = statusCode;
            resObj.status = status;
            resObj.message = message;
            
            if(error) resObj.error = error;
            if(result) resObj.result = result;

            return resObj;		
	}

      validateArgument(obj, requiredParams) {

            if (typeof obj === 'object' && Array.isArray(requiredParams)) {

                  let notFound = [];
                  let property = Object.keys(obj);
                  
                  requiredParams.forEach((p) => {
                        if(property.indexOf(p) == -1){
                              notFound.push(p)
                        }
                  });

                  return notFound;

            }else {
                  return 'ERROR: First argument should be object and second array';
            }

            

      }
}

module.exports = {
	common: Common
}