import {ActiveLinkItemUI, LinkItemUI} from "../UI/LinksUI";
import LinkItemImage from "./LinkItemImage";
import {H2} from "../../Style/BasicUI";
import {useContext} from "react";
import Shared from "../../../../context/Shared";

const Link = ({title, ico, item, isActive}) => {
    const sharedContext = useContext(Shared)
    return !isActive ? (<LinkItemUI onClick={_ => sharedContext.updateMenu(item)}>
        <LinkItemImage ico={ico}/>
        <H2>{title}</H2>
    </LinkItemUI>) : (<ActiveLinkItemUI onClick={_ => sharedContext.updateMenu(item)}>
        <LinkItemImage ico={ico}/>
        <H2 style={{color: '#f3e5f5'}}>{title}</H2>
    </ActiveLinkItemUI>);


}
export default Link;