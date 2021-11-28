import styled from '../UI/profile.module.css'
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileLinks from "./ProfileLinks";

const Profile = props => {


    return (
        <div className={styled.profile}>
            <ProfileHeader/>
            <ProfileBody/>
            <ProfileLinks/>
        </div>
    )
}

export default Profile;