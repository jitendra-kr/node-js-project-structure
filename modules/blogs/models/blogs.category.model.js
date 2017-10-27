const mongoose 	= require('mongoose'),
	Schema		= mongoose.Schema;

let BlogCategorySchema = new Schema({
	name:{
		type:String,
		required:[true,'Category name is required']
	},	
	meta_keywords:{
		type:String,
		required:[true,'Meta keywords are required']
	},
	meta_description:{
		type:String,
		required:[true,'Meta description is required']
	},		
	description:{
		type:String,
		required:[true,'Category description is required']
	},	
	image:{
		type:String
	},
	blogs:{
		type:Number,
		default:0 //@ this is the current value
	},
	status:{
		type:Number,
		default:0 //@ non-hide i.e. will be visible 
	}
}, {timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
}});

module.exports = mongoose.model('BlogCategorySchema', BlogCategorySchema);	


