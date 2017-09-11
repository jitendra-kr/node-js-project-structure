

class Blog {

	constructor(){}

	create(req, res) {
		res.json({status: "blog created"});	
	}

	read(req, res) {
		res.json({status: "blog content"});	
	}

	update(req, res) {
		res.json({status: "blog updated"});	
	}

	delete(req, res) {
		res.json({status: "blog deleted"});	
	}

}

module.exports = {
	blog: new Blog()
}