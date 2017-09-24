//@ need to generate feeds according to 'time' or 'popularity'

const path 			= require('path'),
	  momoent		= require('moment')

class generateFeeds {

	constructor(author_code){
		//@ it will help to generate particular author's feed or everything in mix
		this.name  = author_code || null;

	}

	getFeeds(req,res){
		//@ will send feed data according to pagination 
		//@ for now sample response
		res.status(200).json({status:"OK"})
	}
}

//@ normal export currently, but can change to mix or particular author
module.exports = {
	blogFeed : new generateFeeds()
}