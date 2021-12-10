import {ChatViewUI, ChatWindow} from "./UI/ChatUI";
import ChatPipe from "../../../../../context/ChatPIPE";
import Header from "./ChatComponents/Header";
import Body from "./ChatComponents/Body";
import Footer from "./ChatComponents/Footer";
import {useContext} from "react";

const ChatView = ({name,image,itype,active})=> {
    const context = useContext(ChatPipe);

    return <ChatViewUI>
            <ChatWindow>
                <Header name={name} image={image} itype={itype} isActive={active}/>
                <Body/>
                <Footer/>
            </ChatWindow>
        </ChatViewUI>

}

export default ChatView;