import React from "react";
import ChatPipe from "../../../../../../context/ChatPIPE";
import {ChatSent, InputContainer, TextInput} from "../UI/ChatUI";
import RightArrow from "../../../../../Ico/RightArrow";
//#F44336
const Footer = _ => {
    const [emptyChat, setEmpty] = React.useState(false);
    const pipe = React.useContext(ChatPipe);
    React.useEffect(_ => {
        const latency = setInterval(_ => {
            emptyChat && setEmpty(false);
        }, 5000);
        return _ => {
            clearInterval(latency);
        }
    }, [emptyChat])


    return <InputContainer>
        <TextInput type='text'
                   onChange={e => pipe.setChatText(e.target.value)}
                   value={pipe.chatText}
                   onKeyPress={e => e.key === "Enter" && ((pipe.chatText.length > 0 && pipe.sendChat)||setEmpty(true))}
                   style={{border: emptyChat && "1px solid #D84315", background: emptyChat && '#EF9A9A'}}

        />
        <ChatSent onClick={_=>((pipe.chatText.length > 0 && pipe.sendChat())||setEmpty(true))}>
            <RightArrow/>
        </ChatSent>
    </InputContainer>
}

export default Footer;