import {
    ChatHeader,
    ChatHeaderContents,
    ChatHeaderContentsUser,
    ChatImg,
    HeaderContentStatus,
    HeaderContentStatusLogo,
    HeaderContentStatusText
} from "../UI/ChatUI";
import {useContext} from "react";
import Shared from "../../../../../../context/Shared";

const Header = () => {
    const shared = useContext(Shared);
    const {image, itype, name, isActive} = shared.recipientDetails;
    return <ChatHeader>
        <ChatImg src={`data:image/${itype};base64,${image}`}  alt={name}/>
        <ChatHeaderContents>
            <ChatHeaderContentsUser>
                {name}
            </ChatHeaderContentsUser>
            <HeaderContentStatus>
                <HeaderContentStatusLogo style={{background: !isActive && '#F44336'}}/>
                <HeaderContentStatusText>{isActive ? 'Active Now' : 'Not Active'}</HeaderContentStatusText>
            </HeaderContentStatus>
        </ChatHeaderContents>
    </ChatHeader>
}

export default Header;