import {LinkElemImg, LinkImg} from "../UI/LinksUI";

const LinkItemImage = ({ico}) => {

    return <LinkImg>
        <LinkElemImg src={ico} alt='link'/>
    </LinkImg>
}

export default LinkItemImage;