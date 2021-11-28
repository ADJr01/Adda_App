import React, {useContext} from "react";
import Shared from "../../../../context/Shared";
import styled from '../UI/profile.module.css'
import {calcAge} from "../../../../Utils/Utility";

const ProfileBody = props => {
    const shared = useContext(Shared);
    return (
        <div className={`${styled["profile-body"]}`}>
            <p className={styled.name}>{`${shared.userdata.firstName} ${shared.userdata.lastName}`}</p>
            <p className={styled.mail}>{shared.userdata.email}</p>
            <p className={styled.job}> {shared.userdata.gender}| {calcAge(shared.userdata.dob)} Years Old</p>
        </div>
    )
}

export default ProfileBody;