const path			= require('path'),
	fs 				= require('fs'),
	router 			= require('express').Router(),
	dir 			= `${path.dirname(__dirname)}/controllers`,
	helperLib		= require(path.resolve('./config/lib/helper_lib'));


let ReadDirectory 	= new helperLib.read_directory.readDirectory()
let fileObj 		= ReadDirectory.requireFiles(dir)



router
	.post('/create-blog', fileObj.crud_blog.blog.create)
	.get('/read-blog', fileObj.crud_blog.blog.read)
	.put('/update-blog', fileObj.crud_blog.blog.update)
	.delete('/delete-blog', fileObj.crud_blog.blog.delete)

module.exports = router