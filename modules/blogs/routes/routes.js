
const path			= require('path'),
	fs 				= require('fs'),
	router 			= require('express').Router(),
	dir 			= `${path.dirname(__dirname)}/controllers`,
	helperLib		= require(path.resolve('./config/lib/helper_lib'));


let ReadDirectory 	= new helperLib.read_directory.readDirectory();
let fileObj 		= ReadDirectory.requireFiles(dir);

router
	.post('/create-blog', 						fileObj['crud.blog'].create)
	.get('/read-blog', 							fileObj['crud.blog'].read)
	.put('/update-blog', 						fileObj['crud.blog'].update)
	.delete('/delete-blog', 					fileObj['crud.blog'].delete);


module.exports = {
	router: router,
	base: '/api/blog'
}