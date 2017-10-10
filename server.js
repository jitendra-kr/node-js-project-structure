	
					  require('dotenv').config();
const express		= require('express'),
	app				= express(),
	server 			= require('http').createServer(app),
	path			= require('path'),
	dotenv			= require('dotenv'),
	chalk			= require('chalk'),
	ENV				= require(path.resolve(`./config/env/${process.env.NODE_ENV}`));
					  require(path.resolve('./config/lib/server'))(app, ENV);

//@ start server 
function startServer(){

server.listen(ENV.PORT,  ()=> {
	console.log(chalk`{green Node Js server running on {green.bold ${ENV.PORT}} port at {green.bold ${ENV.MODE_TYPE}}..}`)
	});	
}

//@
if(require.main == module) {
	//@ run server without cluster module
	startServer()
}else{

	//@ export startServer method to run application using cluster module
	module.exports = startServer;
}

module.exports = app;