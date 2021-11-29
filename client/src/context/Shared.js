import {createContext, useContext, useEffect, useState} from "react";
import Authorizer from "./Authorizer";
import {decodeFriendsData} from "./context-helper/AuthDataHelper/ParseFriends";
import profileICO from "../components/DashBoard/Assets/profile.png";
import friendsICO from "../components/DashBoard/Assets/friends.png";
import chatICO from "../components/DashBoard/Assets/chat.png";
import LogOut from "../components/DashBoard/Assets/logout.png";
import useSocketRequest, {event_list} from "../Hooks/useSocketRequest";
import {useFriendsHandler} from "../Hooks/dashHooks/useFriendsHandler";

const Shared = createContext({
    userdata: {},
    currentMenu: 0,
    MenuName: null,
    navs: [],
    updateMenu: null,
    currentFriendsView: '',
    changeFriendsView: '',
    friendsViewData: [],
    sendFriendRequest: null
});
const nav_option = [
    {title: 'Profile', ico: profileICO},
    {title: 'Friends', ico: friendsICO},
    {title: 'Chat', ico: chatICO},
    {title: "Log-Out", ico: LogOut}
];

export const SharedContext = ({children,}) => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [selectedMenuName, setSelectedMenuName] = useState('Profile');
    const [friendsView, updateFriendsView] = useState('Friends');
    const friendsHandler = useFriendsHandler();
    const [friendsViewBaseList, updateFriendsViewBaseList] = useState([]);
    const socket = useSocketRequest({
        onRequestApproval: (data, cu) => friendsHandler.onRequestApproval(data, cu),
        onNewUserRegistration: d => friendsHandler.onNewUserRegistration(d),
        onNewReceievedRequest: (data, cu) => friendsHandler.onNewReceievedRequest(data, cu)
    });
    const authorized = useContext(Authorizer);
    const user_email = authorized.contextStorage().getItem('email');


    // ? On LOGIN Save user data and send notification to server that this user is online
    useEffect(_ => {
        const connect = decodeFriendsData(authorized.contextStorage().getItem('connect'));
        connect && friendsHandler.setCurrentUser(user_email); // * assigning authorized user email as current logged-in user
        connect && socket.setUser(user_email);
        connect && friendsHandler.saveFriends(connect.friends) // * saving friend  to local storage
        connect && friendsHandler.saveSentReq(connect.sent); // * saving friend request to local storage
        connect && friendsHandler.saveReciveReq(connect.received); // * saving received friend request  to local storage
        connect && authorized.contextStorage().dropItem('connect');
        socket.setBody({uID: user_email});
        socket.setCurrentEvent(event_list.online);
        socket.sent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const Info = {
        firstName: authorized.contextStorage().getItem('fname'),
        lastName: authorized.contextStorage().getItem('lname'),
        email: user_email,
        dob: authorized.contextStorage().getItem('dob'),
        gender: authorized.contextStorage().getItem('gender'),
        display: authorized.contextStorage().getItem('display', false),
        friends: friendsHandler.friends,
        request: friendsHandler.receivedRequests,
        sent: friendsHandler.sentRequests
    }

    // ? Hook For Changing Nav Title And handling Log-Out Events
    useEffect(_ => {
        // * handling nav change events
        setSelectedMenuName(nav_option[selectedMenu].title !== "Log-Out" && nav_option[selectedMenu].title);

        const interval = setInterval(_ => {
            // ! handling Log-Out Events if selected menu is 3
            if (selectedMenu === 3) {
                friendsHandler.flushFriendsData();
                socket.setCurrentEvent(event_list.offline);
                socket.sent();
                setSelectedMenu(0);
                authorized.onUserLogOut();
            }
        }, 350);
        return _ => {
            clearInterval(interval);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMenu])


    // *handling friends and all user Events
    useEffect(_ => {
        if (selectedMenu === 1) {
            if (friendsView === 'Friends') {
                if (friendsHandler.friends && friendsHandler.friends.length > 0 && friendsHandler.allUser.length>0) {
                    updateFriendsViewBaseList(friendsHandler.allUser.filter(e => friendsHandler.friends.includes(e.email) && e));
                } else {
                    updateFriendsViewBaseList([]);
                }
            } else {
                updateFriendsViewBaseList(friendsHandler.allUser.filter(e => !friendsHandler.friends.includes(e.email) && e));
            }
        }
    }, [friendsHandler.allUser, friendsHandler.friends, friendsView, selectedMenu]);


    return <Shared.Provider value={
        {
            userdata: Info,
            currentMenu: selectedMenu,
            MenuName: selectedMenuName,
            navs: nav_option,
            updateMenu: setSelectedMenu,
            currentFriendsView: friendsView,
            changeFriendsView: updateFriendsView,
            friendsViewData: friendsViewBaseList,
            sendFriendRequest: friendsHandler.createAFriendRequest,
            acceptFriendRequest: friendsHandler.AcceptRequest

        }
    }
    >
        {children}

    </Shared.Provider>
}

export default Shared;



/*
  log('enter');
                    for (let i = 0; i < friendsHandler.allUser.length; i++) {
                        console.log(friendsHandler.allUser[i].email);
                        console.log(friendsHandler.friends[0]);
                        console.log(`equal ${friendsHandler.allUser[i].email == friendsHandler.friends[0]}`);
                    }
 */