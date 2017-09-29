const mongoose 			= require('mongoose'),
	Schema				= mongoose.Schema;

let blogCommentSchema = new Schema({

	blog_id: {
		type: Schema.Types.ObjectId,
		ref: 'BlogModel'
	},

	comments: [{
		text: {
			type: String,
			required: [true, 'slug is required'],
			created_at: {
				type: Date,
				default: Date.now
			},
			updated_at: {
				type: Date,
				default: Date.now				
			}
		},
		commented_by: {
			type: Schema.Types.ObjectId,
			ref: 'UserProfileModel'			
		}
	}]

}, {
	timestamp: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});	

module.exports = mongoose.model('BlogCommentModel', blogCommentSchema);