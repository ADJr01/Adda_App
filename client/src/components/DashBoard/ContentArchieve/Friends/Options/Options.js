import Shared from "../../../../../context/Shared";
import {useContext} from "react";
import {OptionsUI} from "../../UI/CardUI";
import {OptActive, Option} from "../../UI/ButtonOption";

const Options = _ => {
    const shared = useContext(Shared);
    let Friend = shared.currentFriendsView === 'Friends' ? OptActive : Option;
    let FindFriend = shared.currentFriendsView === 'Friends' ? Option : OptActive;
    return <OptionsUI>
        <Friend onClick={_ => shared.changeFriendsView('Friends')} title='Friends'>Friends</Friend>
        <FindFriend onClick={_ => shared.changeFriendsView('Find friends')} title='Find friends'>Find
            friends</FindFriend>
    </OptionsUI>
}

export default Options;