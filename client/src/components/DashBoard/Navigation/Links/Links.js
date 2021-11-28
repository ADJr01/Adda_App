import React, {useContext} from "react";
import Shared from "../../../../context/Shared";
import {LinksUI} from "../UI/LinksUI";
import Link from "./Link";


const Links = ({items}) => {
    const shared = useContext(Shared);
    let LinkItemRender = null;
    try {
        LinkItemRender = items.map((e, i) => <Link isActive={i === shared.currentMenu && i !== items.length - 1}
                                                   item={i} key={i} title={e.title} ico={e.ico}/>)
    } catch (_) {
    }
    return (
        <LinksUI>
            {LinkItemRender}
        </LinksUI>
    )
}

export default Links;