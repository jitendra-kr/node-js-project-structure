const path			     = require('path'),
	  fs 			         = require('fs'),
    os               = require('os'),
    expressJWT       = require('express-jwt'),
    ENV              = require(path.resolve(`./config/env/${process.env.NODE_ENV}`))
    helperLib        = require(path.resolve('./config/lib/helper_lib')),
	  location		     = path.resolve('./modules');


module.exports = (app) => {

    let dirObj = {}

    // validate api with express-jwt
    app.use(expressJWT({

        secret: new Buffer(ENV.JWT_KEY).toString('base64')

    }).unless({

        // pass api without validating
        path:['/']
    }));

    // error handler for unauthorized routes
    app.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {

            res.status(401).render('404',{
                status:'failed',
                requestType: 'Unauthorized request'
            });

      }else{
        next();
      }
    });


    fs.readdirSync(location)
        .filter((dir) => {

            return fs.statSync(`${location}/${dir}`).isDirectory() ;

        }).forEach((dir, index) => {

            let fileObj ;

            if (index == 0) {
                app.get('/', (req, res) => {
                    res.render('index');
                })
            }

            fileObj = require(path.resolve(`./modules/${dir}/routes/routes`));
            
            app.use(fileObj.base,	fileObj.router);

        });


    // error handling middleware
    app.use((err, req, res, next) => {

        let Common        = new helperLib.common.common();
        let Middleware    = new helperLib.middleware();

        // write error logs into file
        Middleware.writeErrorIntoFile(err, req);

        let resObj = Common.generateResponses(500, 'failed', err.message || err.stack);

        res.status(500).json(resObj);
    });    

}




