	
const path			= require('path'),
	fs 				= require('fs'),
	router 			= require('express').Router(),
	dir 			= `${path.dirname(__dirname)}/controllers`,
	helperLib		= require(path.resolve('./config/lib/helper_lib'));


let ReadDirectory 	= new helperLib.read_directory.readDirectory();
let Middleware 		= new helperLib.middleware();

//@ require all controllers for this module
let fileObj 		= ReadDirectory.requireFiles(dir);


//@ routes mapping
router

	.post('/create-blog', 									fileObj['crud.blog'].create)
	.post('/blog-list', 									fileObj['crud.blog'].getBlogList)
	.get('/read-blog/:blog_id', 							fileObj['crud.blog'].read)
	.put('/:blog_id/update-blog', 							fileObj['crud.blog'].update)
	.put('/:blog_id/soft-delete-blog', 						fileObj['crud.blog'].softDelete)
	.delete('/:blog_id/delete-blog', 						fileObj['crud.blog'].finalDelete)
	.post('/upload/blog-image',								fileObj['crud.blog'].upploadBlogImage)
	
	.post('/add-category',		Middleware.statusStrToInt,	fileObj['crud.category'].addCategory)
	.get('/category-list',									fileObj['crud.category'].getCategoryList)
	
	.put('/category/:category_id/update',					fileObj['crud.category'].updateThisCategory)
	.put('/category/:category_id/status/:statusAction',		fileObj['crud.category'].categoryStatus); //@ ../status/statusAction=hide/unhide 

module.exports = {
	router: router,
	base: '/api/blog-management'
}