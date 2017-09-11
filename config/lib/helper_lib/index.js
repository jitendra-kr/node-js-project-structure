const readDir 			= require('./read_directory').readDirectory;

let ReadDirectory 		= new readDir(),
 skipFiles 				= ['index'],
 fileObj 				= ReadDirectory.requireFiles(__dirname, skipFiles); 

module.exports = fileObj

