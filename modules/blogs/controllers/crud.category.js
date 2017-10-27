const path 			= require('path'),
    helperLib       = require(path.resolve('./config/lib/helper_lib')),
    _ 				= require("lodash"),
	CategoryModel	= require('../models/blogs.category.model');


module.exports = {
	

	addCategory(req, res) {
        let resObj = {};
        let Common = new helperLib.common.common();

		//@ check if body is empty
		if (_.isEmpty(req.body)) {
			resObj = Common.generateResponses(400, 'failed', helperLib.messages.bodyEmpty);
			return res.status(resObj.statusCode).json(resObj);
		}

	    let categoryModel = new CategoryModel(req.body);

	    //@ save object to database
	    categoryModel.save((err, saved) => {

	    	let message = helperLib.messages.stw;
	        if (err) {	        	
	        	if (err.name == "ValidationError") {
		        	let tempErr = err.errors;
		        	let first = Object.keys(tempErr)[0];	
	                message = tempErr[first].properties.message;
	                err = err.errors;
	        	}
                resObj = Common.generateResponses(400, 'failed', message, err);              

	        } else {
	            saved.password = undefined;
	            resObj = Common.generateResponses(200, 'success', `Category ${helperLib.messages.added}`, null, saved);
	        }
	        res.status(resObj.statusCode).json(resObj);
	    });		
	},

	getCategoryList(req, res) {

		CategoryModel.find({}, {name:1, status:1}, {sort: {
			created_at: -1
		}}, (err, category)=> {
	        let resObj = {};
	        let Common = new helperLib.common.common();			
			if (err) {
				resObj = Common.generateResponses(400, 'failed', helperLib.messages.stw, err);  
			}else{
				resObj = Common.generateResponses(200, 'success', null, null, category);  
			}
			res.status(resObj.statusCode).json(resObj);
		});

	},

	updateThisCategory(req, res){

	},
	categoryStatus: 	(req,res)=>{
		let categoryId 	= req.params.category_id,
			status 		= req.params.statusAction,
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
					category.update({'_id':categoryId},changeStatus, (err,update)=>{
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