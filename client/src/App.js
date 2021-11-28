import LogIn from "./components/Auth/LOGIN/LogIn";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Authorizer from "./context/Authorizer";
import {useContext} from "react";
import DashBoard from "./components/DashBoard/DashBoard";

function App() {
    const authorizer_context = useContext(Authorizer)


    return (

        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {<Redirect to='/auth'/>}
                </Route>
                <Route exact path="/auth">
                    {!authorizer_context.isAuthorized ? <LogIn/> : <Redirect to='/dashboard'/>}
                </Route>
                <Route exact path="/dashboard">
                    {authorizer_context.isAuthorized ? <DashBoard/> : <Redirect to='/auth'/>}
                </Route>
                <Route exact>
                    {!authorizer_context.isAuthorized ? <Redirect to='/auth'/> : <Redirect to='/dashboard'/>}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
