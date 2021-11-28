'use strict'
const Credential = require('../../../Models/Credentials')
const onLogOut = async email=>{
    try{
        const db_data = await Credential.findOne({user:email});
        if(db_data!==null){
            db_data.acpc = '';
            await db_data.save()
            return {isFlushed: true,responseCode: 200}
        }else{
            return {isFlushed: false, responseCode: 406}
        }

    }catch (e) {
        console.log(e.message);
        return  {isFlushed: false, responseCode: 503}
    }
}
module.exports = onLogOut;