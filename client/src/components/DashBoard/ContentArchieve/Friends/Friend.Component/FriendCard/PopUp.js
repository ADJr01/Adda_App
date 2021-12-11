import {useContext, useEffect} from "react";
import Shared from "../../../../../../context/Shared";
import {createPortal} from "react-dom";
import styled from "../../../../../Auth/REGISTRATION/style/style.module.css";
import ChatPipe from "../../../../../../context/ChatPIPE";
import ChatView from "../../../Chats/ChatView/ChatView";
import CloseIco from "../../../UI/CloseIco";

const PopUpChat = ({onClose}) => {
    const shared = useContext(Shared);
    const pipe = useContext(ChatPipe);

    useEffect(() => {
        shared.chatMode ? pipe.updateCouple(shared.userdata.email,shared.recipient) : pipe.updateCouple('','')
    }, [shared.chatMode]);


    if(shared.chatMode){
        return createPortal(
            <>
                <div className={styled.overlay}/>
                <div className={styled.ChatContainer}>
                        <div className={styled.popChat}>
                            <span onClick={onClose}>
                            <CloseIco/>
                        </span>
                            <ChatView  active={pipe.isActive}/>
                        </div>
                </div>

            </>
            , document.getElementById('portal'));
    }else {
        return '';
    }
}

export default PopUpChat