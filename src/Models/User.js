const mongoose = require('mongoose')

const image_proto = mongoose.Schema({
    img:{
       type:String,
        default: null
    },
    format:{
        type:String,
        default: null
    }
});

const UserProto = mongoose.Schema({
   fname: {
       type: String,
       require: [true,"First Name is Required"]
   } ,
    lname: {
        type: String,
        require: [true,"Last Name is Required"]
    } ,
    email : {
        type: String,
        unique:true,
        require: [true,"Email is Mandatory:strict"]
    } ,
    display : image_proto,
    dob: {
       type : String,
        require : [true,"Date of Birth is Required"]
    },
    gender:{
        type: String,
        require: [true,"Gender is Required"]
    },
    friends:{
        type : Array,
        default: null
    },
    rfr : {
       type : Array,
        default: null
    },
    sfr : {
        type : Array,
        default: null
    }
});
const User = mongoose.model('user',UserProto);
module.exports = User;

/*
	ID: Field Contain user UNIQUE ID which can be Email.
	First Name:  Contains User First Name
	Last Name: Contains User Last Name,
	Display pic: Contains User Display Pic.
	DOB: Contains User Date of Birth,
	Gender: Contains gender
	Friends:  Contains User Friends ID with date added as friend
	Raf : Received Friend Request with date
	Saf: Sent Friend Request with date

*
*
* */