import {
    ChatHeader,
    ChatHeaderContents,
    ChatHeaderContentsUser,
    ChatImg,
    HeaderContentStatus,
    HeaderContentStatusLogo,
    HeaderContentStatusText
} from "../UI/ChatUI";

const Header = ({image, itype, name, isActive}) => {
    return <ChatHeader>
        <ChatImg src={`data:image/${itype};base64,${image}`}  alt={name}/>
        <ChatHeaderContents>
            <ChatHeaderContentsUser>
                {name}
            </ChatHeaderContentsUser>
            <HeaderContentStatus>
                <HeaderContentStatusLogo style={{background:'#F44336'}}/>
                <HeaderContentStatusText>{isActive ? 'Active Now' : 'Not Active'}</HeaderContentStatusText>
            </HeaderContentStatus>
        </ChatHeaderContents>
    </ChatHeader>
}

export default Header;