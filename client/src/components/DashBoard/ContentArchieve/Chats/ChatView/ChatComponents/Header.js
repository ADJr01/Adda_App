import {
    ChatHeader,
    ChatHeaderContents,
    ChatHeaderContentsUser,
    ChatImg,
    HeaderContentStatus, HeaderContentStatusLogo,
    HeaderContentStatusText
} from "../UI/ChatUI";

const Header = ({img,itype,name,isActive})=>{
    return <ChatHeader>
        <ChatImg src={`${img}.${itype}:base64`} alt='chat_with'/>
        <ChatHeaderContents>
            <ChatHeaderContentsUser>
                {name}
            </ChatHeaderContentsUser>
            <HeaderContentStatus>
                <HeaderContentStatusLogo/>
                <HeaderContentStatusText>{isActive?'Active Now':'Not Active'}</HeaderContentStatusText>
            </HeaderContentStatus>
        </ChatHeaderContents>
    </ChatHeader>
}

export default Header;