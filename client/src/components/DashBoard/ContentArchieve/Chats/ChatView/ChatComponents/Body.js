import {useContext} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatPipe from "../../../../../../context/ChatPIPE";
import {ChatList, You, YourFriend,MiddleText} from "../UI/ChatUI";
const Body = _ => {
    const pipe = useContext(ChatPipe);

    if(pipe.ActiveChat.length>0){
        return (<ScrollToBottom className={"chatList"}>
            {pipe.ActiveChat.
            map((e,i)=>(e.sent_by === pipe.between.tu? <You key={i}>{e.content}</You> : <YourFriend key={i}>{e.content}</YourFriend>
            ))


            }

        </ScrollToBottom>)
    }else{
        return <MiddleText>No Chats</MiddleText>
    }

}

export default Body;

/*
    return <ChatList>
        <ScrollToBottom>
            {pipe.ActiveChat.
            map((e,i)=>(e.sent_by === pipe.between.tu? <You key={i}>{e.content}</You> : <YourFriend key={i}>{e.content}</YourFriend>
            ))


            }

        </ScrollToBottom>
    </ChatList>
}

*/