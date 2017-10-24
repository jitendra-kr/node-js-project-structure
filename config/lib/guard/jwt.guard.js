const expressJWT           	= require('express-jwt'),
	path					= require('path'),
	unlessRoutes         = require(path.resolve('./config/lib/routes/unless.routes'));

module.exports = (app, ENV) => {

    //@ validate api with express-jwt
    app.use(expressJWT({
        secret: new Buffer(ENV.JWT_KEY).toString('base64')
    }).unless({
    
    //@ pass api without validating
        path: unlessRoutes
    }));

    //@ error handler for unauthorized routes rejected by JWT 
    app.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {

            res.status(401).render('404',{
                status:'failed',
                requestType: 'Unauthorized request'
            });
      }else{
        next();
      }
    });
}