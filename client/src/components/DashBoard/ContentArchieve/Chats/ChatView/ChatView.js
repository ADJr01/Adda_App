import {ChatWindow,ChatViewUI} from "./UI/ChatUI";
import  {ChatContext} from "../../../../../context/ChatPIPE";

const ChatView = _=>{

    return <ChatContext>
        <ChatViewUI>
            <ChatWindow>

            </ChatWindow>
        </ChatViewUI>
    </ChatContext>
}

export default ChatView;