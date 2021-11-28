const User = require('../../../Models/User');


const getAllUser=async by=>{
    const hasUser  = await User.findOne({email: by});
    const alldata = hasUser && await User.find({email: {$not: {$eq: by}}},{_id:0,fname:1,lname:1,email:1,display: 1});
    if( !hasUser ||  alldata === undefined || alldata === null){
        return [401,{
            isAuthorized: -1,
            data: null
        }]
    }else{
        return [200,{
            isAuthorized: 1,
            data: alldata
        }];
    }
}

 const friendRequest = async (from_user,to_user)=>{
    const validFromUser   = await User.findOne({email: from_user});
    const validToUser     = await User.findOne({email: to_user});
    if(!validFromUser || !validToUser){
        console.log(from_user);
        console.log(validToUser);
        return [401,{
            isRequested: false
        }]
    }else if(validToUser && validFromUser){
        try{
            const sfr = validFromUser.sfr;
            const rfr = validToUser.rfr;
            sfr.push(to_user);
            rfr.push(from_user);
            await validToUser.save();await validFromUser.save();
            return [200,{
                isRequested: true
            }];
        }catch (e) {
            console.log(`Cannot send request Error ${e.message}`);
            return [402,{
                isRequested: false
            }];
        }
    }else{
        console.log(from_user);
        console.log(to_user);
        console.log('cannot send request unknown error')
        return [401,{
            isRequested: false
        }]
    }
}


const acceptFriend = async (from,ofUser)=>{
    const validFromUser   = await User.findOne({email: from});
    const validToUser     = await User.findOne({email: ofUser});
    if(!validFromUser || !validToUser){
        return [401,{
            isAccepted: false
        }]
    }else if(validFromUser && validToUser){
        try {
            const accepter = validFromUser.friends;
            const sender = validToUser.friends
            accepter.push(ofUser);
            sender.push(from);
            const rfr = validFromUser.rfr;
            const sfr = validToUser.sfr;
            sfr.splice(sfr.indexOf(ofUser),1);
            rfr.splice(rfr.indexOf(from),1);
            await validToUser.save();await validFromUser.save();
            return [200,{
                isAccepted: true
            }]
        }catch (e) {
            console.log(e);
            return [401,{
                isAccepted: false
            }]
        }

    }
}

module.exports = {getAllUser,friendRequest,acceptFriend}