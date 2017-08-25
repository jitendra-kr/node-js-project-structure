const helmet			= require('helmet'),
	express				= require('express'),
	path				= require('path'),
	morgan 				= require('morgan'),
	chalk				= require('chalk'),
	bodyParser 			= require('body-parser');

module.exports = function (app) {

	//used helmet to secure headers
	app.use(helmet());

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())

	app.engine('html', require('ejs').renderFile);		

	app.set('view engine', 'html')

	app.use(express.static(path.join(__dirname, 'views')))

	app.use(morgan('dev'));
}
