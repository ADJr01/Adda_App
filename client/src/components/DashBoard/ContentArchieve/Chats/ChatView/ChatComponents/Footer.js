import React from "react";
import ChatPipe from "../../../../../../context/ChatPIPE";
import {ChatSent, InputContainer, TextInput} from "../UI/ChatUI";
import RightArrow from "../../../../../Ico/RightArrow";
const Footer = _ => {
    const pipe = React.useContext(ChatPipe);


    return <InputContainer>
        <TextInput type='text'
                   onChange={e=>pipe.setChatText(e.target.value)}
                   value={pipe.chatText}
                   onKeyPress={e=>e.key === "Enter" && pipe.sendChat()}

        />
        <ChatSent onClick={pipe.sendChat}>
            <RightArrow/>
        </ChatSent>
    </InputContainer>
}

export default Footer;