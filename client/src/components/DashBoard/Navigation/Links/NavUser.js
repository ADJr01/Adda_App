import React, {useContext} from "react";
import Shared from "../../../../context/Shared";
import {Label, LabelInput, UserImgElem, UserPElem, UserUI} from "../UI/UserUI";
import {H3} from "../../Style/BasicUI";


const NavUser = _ => {
    const shared = useContext(Shared);
    const Image = shared.userdata.display.img;
    const format = shared.userdata.display.format;
    return <UserUI>
        <UserImgElem src={`data:image/${format};base64,${Image}`} alt="display_nav"/>
        <Label>
            <LabelInput
                type='file'
                accept='.jpg,.png,.jpeg'/>
            <span title='Upload Your Own Pic'>+</span>
        </Label>
        <H3>{shared.userdata.firstName}</H3>
        <UserPElem>Community Member</UserPElem>
    </UserUI>
}

export default NavUser;