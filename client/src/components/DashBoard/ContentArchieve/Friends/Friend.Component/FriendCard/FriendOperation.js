import {useContext} from "react";
import Shared from "../../../../../../context/Shared";
import {FriendBTN, FriendOperate} from "../../../UI/CardUI";
import PopUpChat from "../../../Chats/ChatView/ChatComponents/ChatPopUp";



const FriendOperation = ({name,email,image,itype}) => {
    const shared = useContext(Shared);
    const Sent = shared.userdata.sent.includes(email);
    const Received = shared.userdata.request.includes(email)
    const details = {
        name,email,image,itype
    }

    const onChatClick = ()=> {
        shared.setRecipient(email);
    }

    const onCloseClick = ()=>{
        shared.setRecipient('');
    }

    return shared.currentFriendsView === 'Friends' ? (
            <FriendOperate>
                <FriendBTN>View Profile</FriendBTN>
                <FriendBTN onClick={onChatClick}>Chat</FriendBTN>
                {/*if chat button clicked*/}
                    <PopUpChat details={details} onClose={onCloseClick}/>
            </FriendOperate>)
        :
        (<FriendOperate>
            <FriendBTN onClick={_ => (!Sent && !Received && shared.sendFriendRequest(email)) ||
                (Received && shared.acceptFriendRequest(email))}>
                {(Sent && 'Request Sent') || (Received && 'Accept Request') || 'Add Friend'}
            </FriendBTN>
        </FriendOperate>)
}

export default FriendOperation;