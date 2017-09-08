const path			= require('path'),
	fs 				= require('fs');

class readDirectory {

	constructor () {}

	getFiles(dir, skip){

		let files = fs.readdirSync(dir)	

		    files = files.filter((file) =>{
		    	file = path.parse(file).name
		    	return skip.indexOf(file) == -1
			})

			return files
	}	

}

module.exports = {
	class: readDirectory
}