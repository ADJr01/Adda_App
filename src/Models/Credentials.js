const mongoose = require('mongoose')
const CredentialProto = mongoose.Schema({
   user : {
       type: String,
       unique: [true,"Email is Mandatory:strict"],
       require: true
   } ,
    acpc: {
       type: String,
        default:null
    },
    password : {
       type: String,
        require: [true,"password is Mandatory:strict"]
    }
});

const Credential = mongoose.model("credential",CredentialProto);
module.exports = Credential;








/*
  	user: Individual target field [Email]
	ACPC: [Authorizable KEY,Password hashed] //ADDA CURRENT PERSISTENT CODE
	Password: User Password

* */