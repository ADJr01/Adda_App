const {decodeFromVersed} = require("../Encryption/Crypter");
const {log} = require("nodemon/lib/utils");

const parseAuth = data=>{
    let parsedData = null
    try{
        parsedData = decodeFromVersed(data.toString("utf8"));
        return [true,parsedData];
    }catch (e) {
        console.log(`error: ${e.message}.\n error in Parser.js`);
        return  [false,parsedData];
    }
}


module.exports = {parseAuth}