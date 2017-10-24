const helmet			= require('helmet'),
	  express			= require('express'),
	  path				= require('path'),
	  morgan 			= require('morgan'),
	  chalk				= require('chalk'),
	  bodyParser 		= require('body-parser');

module.exports = function (app) {

	//@ used helmet to secure headers
	app.use(helmet());

	//@ parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false })) ;

	//@ parse application/json
	app.use(bodyParser.json());
    
    //@ allow/enable cross origin request	
	app.use(function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
