import React, {useContext} from "react";
import Shared from "../../../context/Shared";
import {Nav} from "./UI/NavUI";
import NavUser from "./Links/NavUser";
import Links from "./Links/Links";


const Navigation = _ => {
    const shared = useContext(Shared);

    return <Nav>
        <NavUser/>
        <Links items={shared.navs}/>
    </Nav>
}

export default Navigation;