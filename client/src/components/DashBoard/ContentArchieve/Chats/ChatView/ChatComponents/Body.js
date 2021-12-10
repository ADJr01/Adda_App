import {useContext} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatPipe from "../../../../../../context/ChatPIPE";
import {You, YourFriend} from "../UI/ChatUI";
const Body = _ => {
    const pipe = useContext(ChatPipe)
    return <ScrollToBottom>
        {pipe.ActiveChat.
            map((e,i)=>(
                e.send_By === pipe.between.tu?
                    <You>{e.content}</You>
                    :
                    <YourFriend>
                        {e.content}
                    </YourFriend>
        ))


        }

    </ScrollToBottom>
}

export default Body;