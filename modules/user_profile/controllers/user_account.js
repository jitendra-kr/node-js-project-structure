const path              = require('path'),
    async               = require('async'),
    helperLib           = require(path.resolve('./config/lib/helper_lib')),
    UserProfileModel    = require('../models/user_profile_model');



exports.register = (req, res) => {


    let userProfileModel = new UserProfileModel(req.body)

    userProfileModel.save((err, saved) => {

        let resObj = {};

        if (err) {

            resObj.status = 'failed'
            resObj.statusCode = 200
            resObj.error = err
            resObj.message = err.code == '11000' ? `${req.body.email} already taken` : 'Registration failed'

        } else {

            resObj.status = 'success'
            resObj.statusCode = 200
            resObj.message = 'Account created successfully'
            resObj.result = saved
        }

        res.status(resObj.statusCode).json(resObj);

    });

}


exports.login = (req, res) => {

    let conditions = {'email': req.body.email }, 
        projection = {__v: 0, created_at: 0, updated_at: 0 };

    UserProfileModel.findOne(conditions, projection, (err, user) => {

        let Crypt = new helperLib.crypt.crypt()
        let isValid = Crypt.compareHash(req.body.password, user ? user.password : '');
        let resObj = {};

        if (user && isValid) {

            user.password = undefined

            let Jwt = new helperLib.jwt()
            let buf = new Buffer.from(JSON.stringify(user))

            resObj.status = 'success'
            resObj.statusCode = 200
            resObj.message = 'logged in successfully'
            resObj.result = user
            resObj.auth = Jwt.sign(buf)

        } else if (err) {

            resObj.status = 'failed'
            resObj.statusCode = 500
            resObj.error = err
            resObj.message = 'Unable to login'

        } else {

            resObj.status = 'failed'
            resObj.statusCode = 200
            resObj.message = 'Incorrect user email or password'

        }

        res.status(resObj.statusCode).json(resObj);
    });

}


exports.updateProfile = (req, res) => {

    let data = req.body,
        conditions = {'email': data.email };

    delete data.password
    delete data.email

    UserProfileModel.update(conditions, data, (err, update) => {

        let resObj = {};

        if (err) {

            resObj.status = 'failed'
            resObj.statusCode = 500
            resObj.error = err
            resObj.message = `update failed for ${data.email}`

        } else if (update.nModified == 1) {

            resObj.status = 'success'
            resObj.statusCode = 200
            resObj.message = 'Account updated successfully'
            resObj.result = update

        } else {

            resObj.status = 'failed'
            resObj.statusCode = 200
            resObj.error = err
            resObj.message = `${data.email} does not exist`

        }

        res.status(resObj.statusCode).json(resObj);
    });

}

exports.changePassword = (req, res) => {


    let conditions = {'email': req.tokenInfo.email }; 

    async.waterfall([        

        (cb) => {

            if (req.body.confirmPassword != req.body.newPassword) {

                let resObj = {}
                resObj.status = 'failed'
                resObj.statusCode = 200
                resObj.message = 'new password and comfirm password are not equal' 
                cb(resObj)   

            }else{
                cb(null)
            }

        },

        (cb) => {

            UserProfileModel.findOne(conditions, {'password':1, '_id':0}, (err, user) => {

                let Crypt = new helperLib.crypt.crypt()

                let isValid = Crypt.compareHash(req.body.password, user ? user.password : '')

                if (!user || err || !isValid) {

                    let resObj = {}
                    resObj.status = 'failed'
                    resObj.statusCode = 200
                    resObj.error = err 
                    resObj.message = err ? 'some error occurred under user finding to update password' 
                                         : !user 
                                         ? 'user not found' 
                                         : 'incorrect current password'    

                    cb(resObj)  

                } else {

                    cb(null)  
                  
                }

            })

        }, 

        (cb) => {

            let Crypt = new helperLib.crypt.crypt()
            let update = {password: Crypt.hash(req.body.newPassword)}

            UserProfileModel.update(conditions, update, (err, update) => {
                console.log(err || update)

                if (update.nModified == 1) {

                    let resObj = {}
                    resObj.status = 'success'
                    resObj.statusCode = 200
                    resObj.message = 'password changed successfully'

                    cb(resObj)                     
                }else{

                    let resObj = {}
                    resObj.status = 'failed'
                    resObj.statusCode = 200
                    resObj.error = err 
                    resObj.message = err || 'some error occurred in update password'    

                    cb(resObj)                      
                }

            });

        }
        ], (err, final) => {

            let resObj = err || final

            res.status(resObj.statusCode).json(resObj);

        })
}


exports.resetPassword = (req, res) => {
    
}