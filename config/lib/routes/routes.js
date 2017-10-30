const path			     = require('path'),
	fs 			         = require('fs'),
    ENV                  = require(path.resolve(`./config/env/${process.env.NODE_ENV}`))
    helperLib            = require(path.resolve('./config/lib/helper_lib')),
	location		     = path.resolve('./modules');


module.exports = (app) => {

    //@ require all controllers here
    fs.readdirSync(location)
        .filter((dir) => {
            return fs.statSync(`${location}/${dir}`).isDirectory();
        }).forEach((dir, index) => {
            let fileObj = require(path.resolve(`./modules/${dir}/routes/routes`));            
            app.use(fileObj.base,	fileObj.router);
    });


    // //@ global error handling middleware
    // app.use((err, req, res, next) => {

    //     let Common        = new helperLib.common.common();
    //     let Middleware    = new helperLib.middleware();

    //     //@ write error logs into file
    //     Middleware.writeErrorIntoFile(err, req);
    //     let resObj = Common.generateResponses(500, 'failed', err.message || err.stack);

    //     res.status(500).json(resObj);
    // });    
}