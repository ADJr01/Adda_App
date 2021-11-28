import styled from '../UI/profile.module.css'

const ProfileLinks = ({facebooklink, utubelink, twitterlink, gitlink}) => {


    return (
        <div className={`${styled["social-links"]}`}>
            <a href={facebooklink && '#'} className={`fab fa-facebook ${styled["social-icon"]} ${styled.facebook}`}/>
            <a href={twitterlink && '#'} className={`fab fa-twitter ${styled["social-icon"]} ${styled.twitter}`}/>
            <a href={utubelink && '#'} className={`fab fa-youtube ${styled["social-icon"]} ${styled.tube}`}/>
            <a href={gitlink && '#'} className={`fab fa-github ${styled["social-icon"]} ${styled.git}`}/>
        </div>
    )
}

export default ProfileLinks;