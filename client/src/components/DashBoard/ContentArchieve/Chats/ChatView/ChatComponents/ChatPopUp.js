import {useContext, useEffect} from "react";
import Shared from "../../../../../../context/Shared";
import {createPortal} from "react-dom";
import styled from "../../../../../Auth/REGISTRATION/style/style.module.css";
import ChatPipe from "../../../../../../context/ChatPIPE";
import ChatView from "../ChatView";
import CloseIco from "../../../UI/CloseIco";

const PopUpChat = ({details,onClose}) => {
    const shared = useContext(Shared);
    const pipe = useContext(ChatPipe);

    useEffect(() => {
        shared.chatMode && pipe.updateCouple(shared.userdata.email,shared.recipient);
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
                            <ChatView name={details.name} image={details.image} itype={details.itype} active={pipe.isActive}/>
                        </div>
                </div>

            </>
            , document.getElementById('portal'));
    }else {
        pipe.updateCouple('','');
        return '';
    }
}

export default PopUpChat