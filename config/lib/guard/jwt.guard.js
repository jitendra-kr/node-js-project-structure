const expressJWT           	= require('express-jwt'),
	path					= require('path'),
	unlessRoutes         = require(path.resolve('./config/lib/routes/unless.routes'));

module.exports = (app, ENV) => {

    //@ validate api with express-jwt
    // app.use(expressJWT({
    //     secret: new Buffer(ENV.JWT_KEY).toString('base64')
    // }).unless({
    
    // //@ pass api without validating
    //     path: unlessRoutes
    // }));
}