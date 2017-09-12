const path			= require('path'),
	fs 				= require('fs'),
	location		= path.resolve('./modules');


module.exports = (app) => {

    let dirObj = {}

    fs.readdirSync(location)
        .filter((dir) => {

            return fs.statSync(`${location}/${dir}`).isDirectory()

        }).forEach((dir, index) => {

            let fileObj

            if (index == 0) {
                app.get('/', (req, res) => {
                    res.render('index')
                })
            }

            fileObj = require(path.resolve(`./modules/${dir}/routes/routes`))

            app.use(fileObj.base,	fileObj.router)

        });

}




