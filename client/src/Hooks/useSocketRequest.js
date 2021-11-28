import {io} from "socket.io-client";
import {useEffect, useState} from "react";

export const event_list = {
    online: 'online',
    offline: 'offline',
    newFriend: "newFriend",
    newRequest: "newRequest",
    newUser: "newUser",
}



const socket = io.connect('http://localhost:8080');

const useSocketRequest = (update_events = {}) => {
    const [user,setUser] = useState('');
    const [currentEvent, setCurrentEvent] = useState('');
    const [body, setBody] = useState('');
    const [push, doPush] = useState(false);

    const onPush = () => socket.emit(currentEvent, body);
    // ? effect to Receive Notification
    useEffect(_=>{
        socket.on(event_list.newRequest,data=>{
            console.log('New Request');
            console.log(data)
            update_events.onNewReceievedRequest(data,user);
        })

        socket.on(event_list.newFriend,data=>{
            console.log('New Friend');
            console.log(data)
           update_events.onRequestApproval(data,user);
        });
        socket.on(event_list.newUser,data=>{
            console.log('New User Found');
            console.log(data);
            update_events.onNewUserRegistration(data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socket,user]);





    // ? effect to send events notification
    useEffect(_ => {
        if (push && Object.keys(event_list).includes(currentEvent)) {
            onPush();
            return _ => {
                setBody('');
                currentEvent.toString().length>0 && setCurrentEvent('');
                push && doPush(false);
            }
        }else {
            return _ => {
                push && console.error(`trying to sent Unknown Request`);
                currentEvent.toString().length>0 && setCurrentEvent('');
                push && doPush(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentEvent, push]);

    const sent = ()=> doPush(true)

    return {setCurrentEvent, setBody,setUser,sent};
}


export default useSocketRequest