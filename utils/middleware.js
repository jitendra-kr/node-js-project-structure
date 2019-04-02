const jwt = require('./jwt');

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

}

module.exports = Middleware
