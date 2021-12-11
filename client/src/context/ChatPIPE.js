import {createContext, useEffect, useState} from "react";
import {simpleSTORAGE} from "../Utils/SimpleStorage";
import {getPrevious, getUnReceived, sendMessage} from "./context-helper/ChatHelper/ChatHelper";
import {log} from "../Utils/Utility";

const chatHash = (str1, str2) => `${str1}${str2}`.split('').sort().join('');

const store_name = '_coupled';
const store = simpleSTORAGE(store_name);
const ChatPipe = createContext({
    ActiveChat: [],
    between: {},
    updateCouple: null,
    sendChat: null,
    chatText: '',
    setChatText: '',
    incoming: null,
    isActive: false,
    flush: null


});

export const ChatContext = props => {
    const [activeChatPipe, setActiveChatPipe] = useState([]);
    const [user, setUser] = useState({tu: '', ou: ''});
    const [coupleHash, setCoupleHash] = useState('');
    const [chatContent, updateChatContent] = useState('');
    const [incomingChatHash, setIncomingChatHash] = useState('');


    // * incoming hash update
    useEffect(_ => {
        if (incomingChatHash.length > 2 && coupleHash.length > 2) {
            coupleHash === incomingChatHash && setActiveChatPipe(store.getItem(coupleHash, false));
        }
        incomingChatHash.length > 0 && setIncomingChatHash('');
    }, [coupleHash, incomingChatHash])


    // * creating hash to persist
    useEffect(_ => {
        if ((user.ou.length > 1 && user.tu.length > 1)) {
            coupleHash.length < 1 && setCoupleHash(chatHash(user.tu, user.ou))
        } else {
            //checking if couple hash is not already empty then setting it to empty string
            (coupleHash.length > 0 && setCoupleHash(''))
        }

    }, [coupleHash, coupleHash.length, user]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async _ => {
        // * Check if simple storage have chat list.
        // * if not then ask server that if he has any chat data
        // * if server has chat data then grave it and save it in local storage
        // * if server doesn't have data then simply show empty chat
        // * if local storage have data then ask server if we have any unreceived chat
        // * if we have any unreceived chat then get it or show existing chat array
        if (coupleHash.length > 2 && user.tu.length > 2 && user.ou.length > 2) {
            let chatArray = store.getItem(coupleHash, false);
            chatArray && setActiveChatPipe(chatArray);
            if (!chatArray) {
                try {
                    chatArray = await getPrevious(user.tu, user.ou);
                    chatArray.length > 0 && setActiveChatPipe(chatArray);
                    chatArray.length > 0 && store.useItem(coupleHash, chatArray);
                } catch (e) {
                    console.log(user)
                    log(`Error on Chat PIPE getPrevious for hash ${coupleHash}`)
                    console.log(e.message)
                }
            } else {
                const unreceived = await getUnReceived(user.tu, user.ou);
                if (unreceived && unreceived.length > 0) {
                    chatArray = [...chatArray, ...unreceived];
                    setActiveChatPipe(chatArray);
                    store.useItem(coupleHash, chatArray);
                }
            }
        }else{
            setActiveChatPipe([]);
        }

    }, [coupleHash, user])

    const send = async _ => {
        if (user.ou.length > 1 && user.tu.length > 1 && chatContent.length > 0) {
            try {
                const text = chatContent;
                updateChatContent('');
                const state = await sendMessage(user.tu, user.ou, text);
                const prev = store.getItem(coupleHash, false);
                const data = {sent_for: user.ou, sent_by: user.tu, content: text};
                state.success && store.useItem(coupleHash, ((prev && [...prev, data]) || [data]));
                state.success && setActiveChatPipe(store.getItem(coupleHash, false))
                return true;
            } catch (e) {
                console.log(e.message)
                return false
            }
        } else {
            console.log('Not Valid Operation');
        }
    }


    const onNewIncomingText = chat => {
        const data = {sent_by: chat.from, sent_for: chat.for, content: chat.content}
        const hash = chatHash(data.sent_by, data.sent_for);
        const prev = store.getItem(hash, false);
        !prev ? store.useItem(hash, [data]) : store.useItem(hash, [...prev, data]);
        setIncomingChatHash(hash);

    }


    const flushChats = () => {
        store.deleteDB();
        store._init_();
    }


    return <ChatPipe.Provider
        value={{
            updateCouple: (user, to)=> setUser({tu: user, ou: to}) ,
            between: user,
            sendChat: send,
            incoming: onNewIncomingText,
            chatText: chatContent,
            isActive: false,
            ActiveChat: activeChatPipe,
            setChatText: updateChatContent,
            flush: flushChats
        }
        }
    >
        {props.children}

    </ChatPipe.Provider>


}


export default ChatPipe;