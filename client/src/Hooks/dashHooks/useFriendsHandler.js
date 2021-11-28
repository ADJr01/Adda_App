import React, {useState} from "react";
import {FriendPersist} from './FriendPersist/FriendPersist'
import axios from "axios";
import {isValidEmail, log} from "../../Utils/Utility";

const url = {
    all_USER: 'http://localhost:8080/dashboard/all',
    set_request: 'http://localhost:8080/dashboard/friendReq',
    accept: 'http://localhost:8080/dashboard/accept',
    upload_image: 'http://localhost:8080/dashboard/uploca'
}
const persist = new FriendPersist();

export const useFriendsHandler = () => {
    // *state imports
    const [currentuser, setCurrentUser] = useState('');
    const [friends, updateFriends] = useState(persist.getFriendsData() || []);
    const [sentRequests, updateSentRequest] = useState(persist.getSentRequestFriendsData() || []);
    const [receivedRequests, updateReceivedRequests] = useState(persist.getReceivedRequestFriendsData() || []);
    const [allUser, updateAllUser] = useState(persist.getAllUserData() || []);

    const onNewUserRegistration = data => {
        persist.saveAllUserData(data);
        updateAllUser(persist.getAllUserData());
    }

    // ? if valid current user found
    React.useEffect(_ => {
        if (isValidEmail(currentuser)) {
            if (!persist.hasAllUserData()) {
                // * get all friends data from /dashboard/all

                axios.post(url.all_USER, {"by": currentuser})
                    .then(res => {
                        if (res.data.isAuthorized === 1) {
                            onNewUserRegistration(res.data.data)
                        }
                    }).catch(err => {
                    console.log(err);
                    //do log-out
                });
            }
        }
    }, [currentuser]);


    const saveFriends = data => {
        persist.saveFriendsData(data);
        updateFriends(persist.getFriendsData());
    }
    const saveSentReq = data => {
        persist.saveSentRequestFriendsData(data);
        updateSentRequest(persist.getSentRequestFriendsData());
    }

    const saveReciveReq = data => {
        persist.saveReceivedRequestFriendsData(data);
        updateReceivedRequests(persist.getReceivedRequestFriendsData());
    }


    const createAFriendRequest = to => {
        axios.post(url.set_request, {"from": currentuser, "to": to})
            .then(res => {
                if (res.data.isRequested) {
                    saveSentReq(to);

                } else {
                    console.error('Could Not Add Friend');
                }
            }).catch(e => console.error(e));
    }

    // * if current user accept the request
    const AcceptRequest = ofUser => {
        axios.post(url.accept, {"from": currentuser, "ofUser": ofUser})
            .then(res => {
                if (res.data.isAccepted) {
                    persist.saveFriendsData(ofUser);
                    persist.removeA_ReceivedRequest(ofUser);
                    updateReceivedRequests(persist.getReceivedRequestFriendsData());
                    updateFriends(persist.getFriendsData());
                }
            }).catch(e => log(e))
    }

    const onNewReceievedRequest = (data, cu) => {
        const isValidToken = data.for === cu;
        isValidToken && saveReciveReq(data.from)
        !isValidToken && console.error(`invalid token ${data}\n${cu}`);
        console.log(data);
        console.log(cu);
    }


    // * if other user accept the request
    const onRequestApproval = (data, cu) => {
        console.log('Friends Handler updating events');
        const isValidToken = data.for === cu;
        isValidToken && log('Got New Friend');
        isValidToken && persist.saveFriendsData(data.newFriend)
        persist.removeA_SentData(data.newFriend)
        updateSentRequest(persist.getSentRequestFriendsData());
        updateFriends(persist.getFriendsData());
    }

    const flushFriendsData = () => persist.drop()


    return {
        setCurrentUser,
        allUser,
        saveFriends,
        saveSentReq,
        saveReciveReq,
        friends,
        receivedRequests,
        sentRequests,
        createAFriendRequest,
        AcceptRequest,
        onRequestApproval,
        onNewReceievedRequest,
        flushFriendsData,
        onNewUserRegistration
    }
}

