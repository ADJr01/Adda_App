import {createContext, useEffect, useState} from "react";
import {useAlert} from 'react-alert'
import axios from "axios";
import Cookies from 'js-cookie'
import {simpleSTORAGE} from "../Utils/SimpleStorage";

import {
    data_build_check,
    data_build_login,
    data_build_logOUT,
    data_build_sign_up
} from "./context-helper/AuthDataHelper/Helper";
import {encodeFriendsData} from "./context-helper/AuthDataHelper/ParseFriends";

const authorized_path = 'http://localhost:8080/auth';
let local_store = null;
const store_name = 'acus';
const auth_KEY = 'acpc';
const Authorizer = createContext({
    isAuthorized: false,
    isBadRequest: {state: false, message: ''},
    contextStorage: null,
    onUserRegistration: null,
    onUserLogin: null,
    onUserLogOut: null
});


export const AuthorizeContext = props => {
    const [authorized, setAuthorized] = useState(local_store !== null);
    const [badRequest, setBadRequest] = useState({state: false, message: ''});
    const getContextStore = _ => local_store;
    const alert = useAlert();

    // ! @check if   credentials are valid
    useEffect(_ => {
        if (localStorage.getItem(store_name) !== null && local_store === null) {
            local_store = simpleSTORAGE(store_name);
        }
        if (local_store === null) {
            setAuthorized(false);
            Cookies.get(auth_KEY) !== undefined && Cookies.remove(auth_KEY);
        } else if (local_store.hasKey('email') && local_store.hasKey('dob') && local_store.hasKey('fname') && local_store.hasKey('lname') && Cookies.get(auth_KEY) !== undefined) {
            const acpc_key = Cookies.get(auth_KEY);
            axios.post(authorized_path, data_build_check(acpc_key))
                .then(res => {
                    setAuthorized(res.data.isValid);
                }).catch(_ => {
                setAuthorized(false);
                local_store !== null && local_store.deleteDB();
                Cookies.get(auth_KEY) !== undefined && Cookies.remove(auth_KEY);
            });
        } else {
            local_store !== null && local_store.deleteDB();
            Cookies.get(auth_KEY) !== undefined && Cookies.remove(auth_KEY);
            setAuthorized(false);
        }

    }, []);

    // ! @check end   credentials are validation


    // ?                                                @LOGIN if   credentials are valid
    const onLogIn = data => {
        const LogInData = data_build_login(data)
        axios.post(authorized_path, LogInData)
            .then(response => {
                if (response.data.authorized) {
                    local_store = simpleSTORAGE(store_name);
                    Cookies.set(auth_KEY, response.data.token);
                    const info =  response.data.data;
                    local_store.addItem('fname', info.fname);
                    local_store.addItem('lname', info.lname);
                    local_store.addItem('dob', info.dob);
                    local_store.addItem('gender', info.gender);
                    local_store.addItem('email', info.email);
                    local_store.addItem('display', info.display, false);
                    local_store.addItem('connect',encodeFriendsData(info.friends,info.rfr,info.sfr));
                    alert.show('Logged-IN Successfully');
                    setAuthorized(Cookies.get(auth_KEY) !== undefined);
                } else {
                    console.log('Login is not authorized');
                    console.log(response);
                }
            })
            .catch(err => {
                if (err.message.includes('401')) {
                    setBadRequest({state: true, message: `Invalid Email or Password. Please Try Again`});
                    setTimeout(_ => setBadRequest({state: false, message: ''}), 5000);
                }
            });

    }

    // ?                                                @REGISTER if  a credentials are valid
    const onRegister = data => {
        const RequestData = data_build_sign_up(data);
        axios.post(authorized_path, RequestData)
            .then(res => {
                alert.show('Registered Successfully');
                //save token for future authorization
                local_store = simpleSTORAGE(store_name);
                Cookies.set(auth_KEY, res.data.token);
                local_store.addItem('fname', data.fname);
                local_store.addItem('lname', data.lname);
                local_store.addItem('dob', data.date);
                local_store.addItem('gender', data.gender);
                local_store.addItem('email', data.email);
                local_store.addItem('display', res.data.display, false);
                local_store.addItem('connect',encodeFriendsData());
                setAuthorized(Cookies.get(auth_KEY) !== undefined);


            })
            .catch(err => {
                console.dir(err);
                if (err.message.includes('400')) {
                    setBadRequest({
                        state: true,
                        message: `A User With Email: ${data.email.toString().toLowerCase()} already exist.`
                    });
                    setTimeout(_ => setBadRequest({state: false, message: ''}), 8595);
                } else {
                    setBadRequest({state: true, message: 'Unknown Error'});
                    setTimeout(_ => setBadRequest({state: false, message: ''}), 3000);
                }
            });
    }


    // !                                        @LOG-OUT if  a credentials are valid
    const onLogOut = _ => {
        if (authorized) {
            const email = local_store.getItem('email');
            Cookies.remove(auth_KEY);
            local_store.deleteDB();
            localStorage.removeItem('_persisted3fa');
            setAuthorized(false);
            axios.post(authorized_path, data_build_logOUT(email))
                .then(_ => {
                    alert.show('Logged-Out Successfully');
                })
                .catch(err => {
                    console.error('Logout failed \n' + err.message);
                })
        }
    }


    return <Authorizer.Provider value={
        {
            isAuthorized: authorized,
            isBadRequest: badRequest,
            contextStorage: getContextStore,
            onUserRegistration: onRegister,
            onUserLogin: onLogIn,
            onUserLogOut: onLogOut
        }
    }>
        {props.children}
    </Authorizer.Provider>
}

export default Authorizer;