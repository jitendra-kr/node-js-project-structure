const path			= require('path'),
	jwt = require('./jwt');


class Middleware {

	constructor(){}

	decodeToken(req, res, next) {

		 let Jwt = new jwt(),
		 authorization = req.headers.authorization.replace('Bearer ', ''),
		 decodeToken = Jwt.verify(authorization);
		 req.tokenInfo = decodeToken
		next();
	}
}

module.exports = Middleware
