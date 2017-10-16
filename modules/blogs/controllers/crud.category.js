const path 			= require('path'),
    helperLib       = require(path.resolve('./config/lib/helper_lib')),
	categoryModel	= require('../models/blog.category.model');


module.exports = {
	

	addCategory : (req,res)=>{

	},
	updateThisCategory: (req,res)=>{

	},
	categoryStatus: 	(req,res)=>{
		let categoryId 	= req.params.category_id,
			status 		= req.query.make,
			resObj		= {},
			isThereErr	= false, //@ can be useful in future for any manipulations
			Common 		= new helperLib.common.common();
		
		//@[citation] can try for regex
		if(make==undefined){
			resObj = Common.generateResponses(400,'failed','params missing, wrong request');
			isThereErr = true;
		}else if(make!='hide' || make!='unhide'){
			resObj = Common.generateResponses(404,'failed','wrong resource params');
			isThereErr = true;
		}else{
			categoryModel.findOne({'_id':categoryId},(err,category)=>{
				if(err){
					resObj = Common.generateResponses(500,'failed','Something went wrong, please try later');
            		res.status(resObj.statusCode).json(resObj);
				}
				if(category){
					let changeStatus = {status : status=='hide' ? 1: 0}
					category.update({'_id':categoryId},changeStatus,function(err,update)=>{
						if(err){
							resObj = Common.generateResponses(500,'failed','Something went wrong, please try later');
						}else if(update){
							//@ can do further other updates (not required now)
							resObj = Common.generateResponses(200,'success','status updated sucessfully');
						}
						res.status(resObj.statusCode).json(resObj);
					})
				}
			})
		}

		if(isThereErr){
            res.status(resObj.statusCode).json(resObj);
		}
	}
}