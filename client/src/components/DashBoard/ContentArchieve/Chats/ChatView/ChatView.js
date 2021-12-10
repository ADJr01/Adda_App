import {ChatViewUI, ChatWindow} from "./UI/ChatUI";
import Header from "./ChatComponents/Header";
import Body from "./ChatComponents/Body";
import Footer from "./ChatComponents/Footer";

const ChatView = ({active})=> {

    return <ChatViewUI>
            <ChatWindow>
                <Header  isActive={active}/>
                <Body/>
                <Footer/>
            </ChatWindow>
        </ChatViewUI>

}

export default ChatView;