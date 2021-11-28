'use strict'
const Credential = require('../../../Models/Credentials')
const {decodeFromVersed} = require("../../Encryption/Crypter");
const onTokenValidate = async token=>{
    const user_token = decodeFromVersed(token);
    try{
        const db_data = await Credential.findOne({acpc:user_token});
        if(db_data!==null){
            return {isValid: true,responseCode: 200}
        }else{
            return {isValid: false, responseCode: 401}
        }

    }catch (e) {
        console.log(e.message);
        return  {isValid: false, responseCode: 503}
    }
}
module.exports = onTokenValidate;