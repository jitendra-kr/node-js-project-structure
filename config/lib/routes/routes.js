const path			= require('path'),
	fs 				= require('fs'),
	location		= path.resolve('./modules');


let dirObj 			= {};

fs.readdirSync(location)
  .filter((d) => {
	return fs.statSync(`${location}/${d}`).isDirectory()
}).forEach((dir)=>{
	dirObj[dir] = require(path.resolve(`./modules/${dir}/routes/routes`))
	
});


module.exports = (app) => {

 app
	.get('/', (req, res) => {res.render('index')})
	.use('/api/user-profile', dirObj.user_profile)
	.use('/api/blog', dirObj.blog_management)

}




