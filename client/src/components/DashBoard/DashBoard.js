import {DashMainUI} from "./Style/DashMainUI";
import {ProfileContainerUI} from "./Style/ProfileContainerUI";
import Navigation from "./Navigation/Navigation";
import {SharedContext} from "../../context/Shared";
import Contents from "./ContentArchieve/Contents";

const DashBoard = _ => {


    return (
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
    )
}
export default DashBoard;