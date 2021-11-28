'use strict'
const User = require('../../../Models/User');
const Credential = require('../../../Models/Credentials')
const {Generator} = require('../../Utility/Generator')

const onLogIn = async params => {
    try {
        const response = await Credential.findOne({$and: [{user: params.email}, {password: params.password}]});
        if(response===null){
            return {isAuthenticated: false,responseCode: 401,userToken: null,info: null}
        }else{
            // ? if token length is less than 90 then requesting new token.basically it will generate new token for each invalid or empty token.
            if(response.acpc.toString().length<90){
                response.acpc =  new Generator().generateOfLen(90);
                await response.save();
            }
            const user_info = await User.findOne({email: params.email});
            return {isAuthenticated: true,responseCode: 202,userToken: response.acpc,info: user_info}

        }

    } catch (e) {
        return {isAuthenticated: false,responseCode: 500,userToken: null,info: undefined}
    }

}



module.exports = onLogIn;