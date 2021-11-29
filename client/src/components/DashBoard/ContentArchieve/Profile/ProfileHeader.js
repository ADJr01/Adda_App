import React, {useContext} from "react";
import Shared from "../../../../context/Shared";
import styled from '../UI/profile.module.css'

const ProfileHeader = _ => {
    const shared = useContext(Shared);
    const Image = shared.userdata.display.img;
    const format = shared.userdata.display.format;

    return (
        <div className={`${styled["profile-header"]}`}>
            <img src={`data:image/${format};base64,${Image}`} className={`${styled["profile-img"]}`}
                 alt="display_profile"/>
        </div>
    )
}

export default ProfileHeader;