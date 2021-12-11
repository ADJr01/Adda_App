const useArray  = (initial=[])=>{
    const array = initial;

    const put = (item)=>{
        array.push(item);
        return true
    }
    const getAsList = _=>array;

    const pop = index=>{
        return index>0&&index<array.length&&array.slice(index,1);
    }

    const hasItem = item=>{
        return array.indexOf(item)!==-1;
    }

    const popItem = item=>{
        const index = array.indexOf(item);
        index!==-1 && array.splice(index,1);
        return index
    }
    const len = _=> array.length;


    return {put,popItem,pop,getAsList,hasItem,len};
}




const socketSessions = ()=>{
    const session = [];

    const indexOfId = uid =>{
        for (let i = 0; i < session.length; i++) {
            if(session[i].id===uid){
                return i;
            }
        }
        return -1;
    }
    const findSessionIndex = sindex=>{
        for (let i = 0; i < session.length; i++) {
            const user_sessions = useArray(session[i].sessions);
            if(user_sessions.hasItem(sindex)){
                return i;
            }
        }
        return  -1;
    }

    const getSessions=_=>session;

    const newSession = (uid,socketID)=>{
        const index = indexOfId(uid);
        if(index===-1){
            const sockIDs = useArray();
            sockIDs.put(socketID);
            session.push({id:uid,sessions: sockIDs.getAsList()});
        }else{
            const sessions = useArray(session[index].sessions);
            !sessions.hasItem(socketID) && sessions.put(socketID);
            session[index].sessions = sessions.getAsList()
        }

    }


    const removeSession = sessionID=>{
        const userIndex = findSessionIndex(sessionID);
        if(userIndex===-1){
            return false;
        }

        const sessionArray = useArray(session[userIndex].sessions);
        sessionArray.popItem(sessionID);
        if(sessionArray.len()<1){
            session.splice(userIndex,1);
        }else{
            session[userIndex].sessions = sessionArray.getAsList();
        }
        return  true;
    }

    // ? implement is user online
    const isUserAvailable = uid=>{
        return indexOfId(uid)!==-1;
    }
    // ? implement user session;
    const getUserSessions = uid=>{
        const sessionHolder = session[indexOfId(uid)];
        return (sessionHolder && sessionHolder.sessions) || [];
    }



    return {newSession,getSessions,removeSession,isUserAvailable,getUserSessions};
}
module.exports = socketSessions;