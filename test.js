process.env.NODE_ENV='test'

const fs			= require('fs'),
	path			= require('path'),
	helperLib       = require(path.resolve('./config/lib/helper_lib')),
	location		= path.resolve('./modules');

let ReadDirectory 	= new helperLib.read_directory.readDirectory();

    fs.readdirSync(location)
        .filter((dir) => {
            return fs.statSync(`${location}/${dir}`).isDirectory();
        }).forEach((dir) => {
        	dir = `${location}/${dir}/tests`;
        	ReadDirectory.requireFiles(dir)
    });