import {useContext} from "react";
import Shared from "../../../../../../context/Shared";
import {FriendBTN, FriendOperate} from "../../../UI/CardUI";

const FriendOperation = ({email}) => {
    const shared = useContext(Shared);
    const Sent = shared.userdata.sent.includes(email);
    const Received = shared.userdata.request.includes(email)
    return shared.currentFriendsView === 'Friends' ? (
            <FriendOperate>
                <FriendBTN>View Profile</FriendBTN>
                <FriendBTN>Chat</FriendBTN>
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