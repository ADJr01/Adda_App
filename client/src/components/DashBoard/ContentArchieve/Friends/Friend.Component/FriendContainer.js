import React, {useContext} from "react";
import {CardsUI} from "../../UI/CardUI";
import FriendCard from "./FriendCard/FriendCard";
import Shared from "../../../../../context/Shared";
import {H3} from "../../../Style/BasicUI";

const FriendContainer = _ => {
    const shared = useContext(Shared);

    return <CardsUI>
        {shared.friendsViewData.length > 0 &&
            shared.friendsViewData.map((e, i) =>
                <FriendCard key={i}
                            name={`${e.fname} ${e.lname}`}
                            email={e.email} img={e.display.img}
                            itype={e.display.format}/>
            )}
        {shared.friendsViewData.length < 1 && <H3>No Data</H3>}
    </CardsUI>
}

export default FriendContainer;