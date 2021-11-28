import {simpleSTORAGE} from "../../../Utils/SimpleStorage";
const db = '_persisted3fa'
const [alluser,friends,sent,received] = ['all','friends','sent','received']
export class FriendPersist{
    constructor() {
        this.fstore = simpleSTORAGE(db);
    }

    saveAllUserData(data){
        const all_data = this.fstore.hasKey(alluser);
        if(!all_data){
            this.fstore.addItem(alluser,data,false)
        }else{
            const previous = this.fstore.getItem(alluser,false);
            this.fstore.useItem(alluser,[...new Set([data,...previous])]);
        }

    }
    getAllUserData(){
        return this.fstore.getItem(alluser,false)|| [];
    }
    hasAllUserData(){
        return this.fstore.hasKey(alluser) && this.fstore.getItem(alluser,false)!==undefined;
    }

    saveFriendsData(data){
        const friends_data = this.fstore.hasKey(friends);
        if(!friends_data){
            this.fstore.addItem(friends,data,false)
        }else{
            const previous = this.fstore.getItem(friends,false);
            previous && this.fstore.useItem(friends,[data,...previous]);
            !previous && this.fstore.useItem(friends,data);
        }
    };
    getFriendsData(){
        return this.fstore.getItem(friends,false)|| [];
    }

    saveSentRequestFriendsData(data){
        const sentRequestData = this.fstore.hasKey(sent);
        if(!sentRequestData){
            this.fstore.addItem(sent,data,false);
        }else{
            const previous = this.fstore.getItem(sent,false);
            this.fstore.useItem(sent,[data,...previous]);
        }
    }
    getSentRequestFriendsData(){
        return this.fstore.getItem(sent,false) || [];
    }

    removeA_SentData(email){
        const current = this.fstore.getItem(sent,false);
        current && current.splice(current.indexOf(email),1);
        this.fstore.useItem(sent,current);
    }

    saveReceivedRequestFriendsData(data){
        const receivedRequestData = this.fstore.hasKey(received);
        if(!receivedRequestData){
            this.fstore.addItem(received,data,false);
        }else{
            const previous = this.fstore.getItem(received,false);
            this.fstore.useItem(received,[data,...previous]);
        }
    }
    getReceivedRequestFriendsData(){
        return this.fstore.getItem(received,false) || [];
    }

    removeA_ReceivedRequest(email){
        const current = this.fstore.getItem(received,false);
        current && current.splice(current.indexOf(email),1);
        this.fstore.useItem(received,current);
    }



    drop(){
        this.fstore.deleteDB();
        this.fstore._init_();
    }



}

