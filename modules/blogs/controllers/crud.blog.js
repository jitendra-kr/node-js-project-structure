const path 				= require('path'),
	multer				= require('multer'),
	// upload				= require({dest:path.resolve('./uploads')}),
    helperLib           = require(path.resolve('./config/lib/helper_lib')),
	blogModel			= require('../models/blogs.model');

//@ demo methods for future use
module.exports = {

	upploadBlogImage (req, res) {

	},

	create (req, res)  {
		res.json({status: "blog created"});	
	},

	read (req, res, next)  {
		next('hello')
		res.json({status: "blog content"});	
	},
	getBlogList(re, res){
		
	},
	update (req, res)  {
		res.json({status: "blog updated"});	
	},

	softDelete (req, res)  {
		let blogData 	= req.body.blogData,
			blogId 		= req.params.blog_id,
			Common      = new helperLib.common.common(),
			resObj		= {};

		blogModel.findOne({'_id':blogId},(err,blog)=>{
			if(err){
				resObj = Common.generateResponses(500,'failed','Something went wrong');
				resObj.error = err;
                res.status(resObj.statusCode).json(resObj);
			}

			//@ i.e. blog exists
			if(blog){

				let updateBlogStatus = {status:1};

				blogModel.update({'_id':blogId}, updateBlogStatus , (err, update) => {
					if(update.nModified == 1){
                        resObj = Common.generateResponses(200,'success','Blog is deleted successfully.');
					}else{
						resObj = Common.generateResponses(400,'failed',err || 'some error occurred in update password' );
                        resObj.error = err 
					}
                    res.status(resObj.statusCode).json(resObj);
				});
			}
		})

		
	},

	finalDelete (req,res) {
		res.json({status: "blog deleted"});
	}

}
