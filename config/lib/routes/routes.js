const path			= require('path'),
	userProfile 	= require(path.resolve('./modules/user_profile/routes/routes'));

module.exports = (app) => {
	
	app.get('/', (req, res) => {res.render('index')});
	
	app.use('/api/user-profile', userProfile);


}




