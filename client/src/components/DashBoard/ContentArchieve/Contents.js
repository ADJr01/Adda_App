import React, {useContext} from "react";
import Shared from "../../../context/Shared";
import {Status, StatusSearch} from "./UI/StatusUI";
import {H1} from "../Style/BasicUI";
import Profile from "./Profile/Profile";
import Friends from "./Friends/Friends";
import ChatInterface from "./Chats/ChatInterface";
import {ContentUI} from "./UI/ContentUI";

let shared = null;
const StatusComponent = props => {
    shared = useContext(Shared);
    return <Status>
        <H1 style={{margin: "0.35rem 0.28rem"}}>{shared.MenuName}</H1>
        <StatusSearch type='text' placeholder='Search here'/>
    </Status>
}

const Contents = _ => {
    shared = useContext(Shared);
    const jsxMenu = shared.currentMenu === 0 ? <Profile/> :
        shared.currentMenu === 1 ?
            (<><StatusComponent/> <Friends/></>) :
            shared.currentMenu === 2 ?
                (<><StatusComponent/> <ChatInterface/></>) : '';
    return (<ContentUI>
        {jsxMenu}
    </ContentUI>);


}

export default Contents