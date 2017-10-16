const helmet			= require('helmet'),
	  express			= require('express'),
	  path				= require('path'),
	  morgan 			= require('morgan'),
	  chalk				= require('chalk'),
	  validator  		= require('express-validator'),
	  bodyParser 		= require('body-parser');

module.exports = function (app) {

	//@ used helmet to secure headers
	app.use(helmet());

	//@ parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false })) ;

	//@ parse application/json
	app.use(bodyParser.json()) ;

	//@ secure application from xxs attacks
	app.use(validator());
	//@
    app.use(function(req, res, next) {
      for (var item in req.body) {
        req.sanitize(item).escape();
      }
      next();
    }); 	

	//@ set view engine
	app.engine('html', require('ejs').renderFile);		
	//@
	app.set('view engine', 'html') ;

	//@ define static
	app.use(express.static(path.resolve('views')));

	//@ HTTP request logger
	app.use(morgan('dev'));
}
