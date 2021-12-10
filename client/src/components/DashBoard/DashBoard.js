import {DashMainUI} from "./Style/DashMainUI";
import {ProfileContainerUI} from "./Style/ProfileContainerUI";
import Navigation from "./Navigation/Navigation";
import {SharedContext} from "../../context/Shared";
import Contents from "./ContentArchieve/Contents";
import {ChatContext} from "../../context/ChatPIPE";

const DashBoard = _ => {


    return (
            <ChatContext>
                <SharedContext>
                    <DashMainUI>
                        <ProfileContainerUI>
                            {/* MAIN CONTENTS START */}

                            <Navigation/>
                            <Contents/>

                            {/* MAIN CONTENTS END */}
                        </ProfileContainerUI>
                    </DashMainUI>
                </SharedContext>
            </ChatContext>
    )
}
export default DashBoard;