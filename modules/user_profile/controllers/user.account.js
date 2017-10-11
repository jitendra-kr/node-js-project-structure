'use strict'
const path              = require('path'),
    async               = require('async'),
    helperLib           = require(path.resolve('./config/lib/helper_lib')),
    UserProfileModel    = require('../models/user.profile.model');



exports.register = (req, res) => {

    let userProfileModel = new UserProfileModel(req.body);

    //@ save object to database
    userProfileModel.save((err, saved) => {

        let resObj = {};
        let Common = new helperLib.common.common();
        if (err) {
            let message = err.code == '11000' ? `${req.body.email} ${helperLib.messages.alreadyTaken}` : 'Registration failed';
                resObj = Common.generateResponses(400, 'failed', message, err.code == '11000'? null : err);
        } else {
                saved.password = undefined;
                resObj = Common.generateResponses(200, 'success', helperLib.messages.accoundCreated, null, saved);
        }

        res.status(resObj.statusCode).json(resObj);

    });
}


exports.login = (req, res) => {

    let conditions = {'email': req.body.email }, 
        requiredParams = ['email', 'password'],
        resObj      = {},
        fields = {__v: 0, created_at: 0, updated_at: 0, };

    let Common = new helperLib.common.common();

    //@ check if required properties are missing
    let validator = Common.validateArgument(req.body, requiredParams);    

    if (validator.length>0) {        
        resObj = Common.generateResponses(400, 'failed', `${validator.join(', ')} ${helperLib.messages.absent}`); 
        return res.status(resObj.statusCode).json(resObj);
    }

    UserProfileModel.findOne(conditions, fields, (err, user) => {

        let Crypt       = new helperLib.crypt.crypt();

        //@ compare password with hash
        let isValid     = Crypt.compareHash(req.body.password, user ? user.password : '');        

        if (user && isValid) {

            //@ delete password from user object for security
            user.password = undefined;      

            let Jwt = new helperLib.jwt();
            let buf = new Buffer.from(JSON.stringify(user));

            resObj = Common.generateResponses(200, 'success', helperLib.messages.loggedInSuccess, null, user);            
            
            //@ sign token with user data
            resObj.auth = Jwt.sign(buf);

        } else if (err) {

               resObj = Common.generateResponses(500, 'failed', helperLib.messages.unableTologin, err);            

        } else {

            //@ incorrect login credentials
            resObj = Common.generateResponses(400, 'failed', helperLib.messages.incorrectLoginDetail); 

        }

        res.status(resObj.statusCode).json(resObj);
    });

}


exports.updateProfile = (req, res) => {

    let Common      = new helperLib.common.common(); 
    let data = req.body,
        conditions = {'email': data.email },
        resObj = {};       

    //@ unauthorized request
    //@ if user make a request by stealing another user`s token
    if (data.email != req.tokenInfo.email) {
            resObj = Common.generateResponses(401, 'failed', `unauthorized request: account can not update`);             
            return res.status(resObj.statusCode).json(resObj);
    }

     //@ delete email and password from data object 
     //@ because it is normal profile update 
     //@ not email or password update
     //@ here we are not allowing user to update 
     //@ email and password in this method
    delete data.password;
    delete data.email;

    if (Object.keys(data).length === 0) {
            resObj = Common.generateResponses(400, 'failed', 'data not found to update');           
            return res.status(resObj.statusCode).json(resObj);   
    }

    UserProfileModel.update(conditions, data, (err, update) => {

        if (err) {

            resObj = Common.generateResponses(500, 'failed', `update failed for ${data.email}`, err);                         

        } else if (update.nModified == 1) {

            resObj = Common.generateResponses(200, 'success', 'Account updated successfully', null, update);                         

        } else if (update.nModified == 0 && update.n == 1){

            resObj = Common.generateResponses(400, 'failed', 'profile can not update due to some technical reason');                                     

        }else{
            resObj = Common.generateResponses(400, 'failed', `${req.tokenInfo.email} does not exist`, err);                                                 
        }

        res.status(resObj.statusCode).json(resObj);
    });

}

exports.changePassword = (req, res) => {


    let conditions = {'email': req.body.email }; 
    let Common      = new helperLib.common.common();

    async.waterfall([        

        (cb) => {
            
            //@ check new password with confirm password 
            if (req.body.confirmPassword != req.body.newPassword) {
                let resObj = Common.generateResponses(400, 'failed', 'New password and comfirm password are not equal');                 
                cb(resObj);  
            }else{
                cb(null);
            }
        },

        (cb) => {
            //@ unauthorized request
            //@ if user make a request by stealing another user`s token            
            if (req.body.email != req.tokenInfo.email) {
                let resObj = Common.generateResponses(401, 'failed', `unauthorized request: password can not update`);                 
                cb(resObj);
            }else{
                cb(null);
            }
        },


        (cb) => {

            //@ check if user exists or not
            UserProfileModel.findOne(conditions, {'password':1, '_id':0}, (err, user) => {

                let Crypt = new helperLib.crypt.crypt();

                //@ match password
                let isValid = Crypt.compareHash(req.body.password, user ? user.password : '')

                if (!user || err || !isValid) {
                    let message = err ? 'something went wrong when finding user' 
                                         : !user 
                                         ? 'user not found' 
                                         : 'incorrect current password'; 
                    let resObj = Common.generateResponses(400, 'failed', message, err);                                            
                    cb(resObj); 
                } else {
                    cb(null);                    
                }
            });
        }, 

        (cb) => {

            let Crypt = new helperLib.crypt.crypt();
            let update = {password: Crypt.hash(req.body.newPassword)};

            //@ update user password
            UserProfileModel.update(conditions, update, (err, update) => {
                if (update.nModified == 1) {
                    let resObj = Common.generateResponses(200, 'success', 'password changed successfully');                     
                    cb(resObj);
                }else{
                    let resObj = Common.generateResponses(400, 'failed', 'some error occurred in update password', err);     
                    cb(resObj);                     
                }
            });
        }], (err, final) => {

            let resObj = err || final;
            res.status(resObj.statusCode).json(resObj);
        })
}


exports.resetPassword = (req, res) => {
/*
    1. it depends reset link will be sent over email

    2. or forgot password to be get set without sending any `

*/

//@ code according 2.
    let bodyData = req.tokenInfo,
        resObj = {};
    let Common      = new helperLib.common.common();    
    
    //@ finding the user    
    UserProfileModel.findOne({'email' : bodyData.email}, projection, (err, user) => {
        //@ if any error 
        if(err){
            resObj = Common.generateResponses(500,'failed','Something went wrong ');
            resObj.error = err;
        }
        
        //@ if user exists
        if(user){
        
            //@ check if password or confirm pasword is same
            if (req.body.confirmPassword != req.body.newPassword) {
                resObj = Common.generateResponses(400,'failed','Mismatch password ');
                res.status(resObj.statusCode).json(resObj);
            }else{

             let Crypt = new helperLib.crypt.crypt()
             let passwordUpdate = {password: Crypt.hash(req.body.newPassword)}
    
                userProfileModel.update({'email':bodyData.email},passwordUpdate,(err,update)=>{
                   if (update.nModified == 1) {
                        resObj = Common.generateResponses(200,'success','Password changed successfully');
                    }else{
                        resObj = Common.generateResponses(400,'failed',err || 'some error occurred in update password' );
                        resObj.error = err 
                    }
                    res.status(resObj.statusCode).json(resObj);
                })   
            }
        }
       
    });
}