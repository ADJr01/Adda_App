import {ChatSent, InputContainer, TextInput} from "../UI/ChatUI";
import RightArrow from "../../../../../Ico/RightArrow";
const Footer = _ => {

    return <InputContainer>
        <TextInput type='text'/>
        <ChatSent>
            <RightArrow/>
        </ChatSent>
    </InputContainer>
}

export default Footer;