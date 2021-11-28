import React from 'react';
import ReactDOM from 'react-dom';
import {positions, Provider as AlertProvider, transitions, types} from 'react-alert'
//https://github.com/schiehll/react-alert-template-basic/tree/master/src
import AlertTemplate from 'react-alert-template-basic'
import {AuthorizeContext} from "./context/Authorizer";
import './index.css';
import App from './App';


const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_LEFT,
    timeout: 4000,
    offset: '30px',
    type: types.SUCCESS,
    // you can also just use 'scale'
    transition: transitions.SCALE
}


ReactDOM.render(
    <React.StrictMode>
        <AlertProvider template={AlertTemplate} {...options}>
            <AuthorizeContext>
                <App/>
            </AuthorizeContext>
        </AlertProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

