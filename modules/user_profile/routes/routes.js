const path = require('path'),
	router = require('express').Router(),
	dir = `${path.dirname(__dirname)}/controllers`,
	Utils = require(path.resolve('./utils'));

let ReadDirectory = new Utils.read_directory.readDirectory();

//@ require all controllers for this module
let fileObj = ReadDirectory.requireFiles(dir);


//@ routes mapping
router
	.post('/register', fileObj['user.account'].register)
	.post('/login', fileObj['user.account'].login);


module.exports = {
	router: router,
	base: '/api/user'
};

