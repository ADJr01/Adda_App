import {Card, CardImgDiv, CardImgElem, CardInfoContent} from "../../../UI/CardUI";
import {H2, P} from "../../../../Style/BasicUI";
import FriendOperation from "./FriendOperation";


const FriendInfo = ({name, email,image,itype}) => {
    return <CardInfoContent>
        <H2>{name}</H2>
        <P>{email}</P>
        <FriendOperation name={name} email={email} image={image} type={itype}/>
    </CardInfoContent>
}


const FriendImg = ({img, type}) => {

    return <CardImgDiv>
        <CardImgElem src={`data:image/${type};base64,${img}`} alt='user_img'/>
    </CardImgDiv>
}


const FriendCard = ({img, itype, name, email}) => {

    return (
        <Card>
            <FriendImg type={itype} img={img}/>
            <FriendInfo name={name} email={email} image={img} type={itype}/>
        </Card>
    )

}

export default FriendCard;