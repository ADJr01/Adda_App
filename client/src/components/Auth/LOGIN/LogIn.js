import './style/LogIn.css'
import {useContext, useEffect, useRef, useState} from 'react'
import useAuthLog from "../../../Hooks/AuthHooks/useAuthLog";
import wave from './img/wave.png'
import adda from './img/adda.png'
import avatar from './img/avatar.svg'
import Authorizer from "../../../context/Authorizer";
import SignUp from "../REGISTRATION/SignUp";

const LogIn = _ => {
    const {setEmailInput, setPassInput, isEmailValid, isPassValid, emailinput, passinput} = useAuthLog();
    const [showErr, setShowErrr] = useState({foremail: false, forpass: false});
    const [tempError, setTempError] = useState(false);
    const [popSignUp, requestSignup] = useState(false);
    const logemailRef = useRef();
    const logPasswordRef = useRef();
    const authrize_context = useContext(Authorizer);

    useEffect(_ => {

        logemailRef.current.addEventListener('focus', _ => {
            logemailRef.current.parentNode.parentNode.classList.add("focus");
            showErr.foremail && isEmailValid && setShowErrr(prev => {
                return {...prev, foremail: false}
            });
        });
        logPasswordRef.current.addEventListener('focus', _ => {
            logPasswordRef.current.parentNode.parentNode.classList.add("focus");
            showErr.forpass && isPassValid && setShowErrr(prev => {
                return {...prev, forpass: false}
            });
        });

        logemailRef.current.addEventListener('blur', _ => {
            logemailRef.current.value === "" && logemailRef.current.parentNode.parentNode.classList.remove("focus");
            if (logemailRef.current.value.length > 0 && !isEmailValid) {
                setShowErrr(prev => {
                    return {...prev, foremail: true}
                });
            } else {
                setShowErrr(prev => {
                    return {...prev, foremail: false}
                })
            }
        });

        logPasswordRef.current.addEventListener('blur', _ => {
            try {
                logPasswordRef.current.value === "" && logPasswordRef.current.parentNode.parentNode.classList.remove("focus");
                if (logPasswordRef.current.value.length > 0 && !isPassValid) {
                    setShowErrr(prev => {
                        return {...prev, forpass: true}
                    });
                } else {
                    setShowErrr(prev => {
                        return {...prev, forpass: false}
                    })
                }
            } catch (_) {

            }
        });


    }, [isEmailValid, isPassValid, showErr.foremail, showErr.forpass]);

    const onLogIN = _ => {
        if (isEmailValid && isPassValid) {
            authrize_context.onUserLogin({email: emailinput, password: passinput});
        } else {
            setTempError(true);
            setTimeout(_ => setTempError(p => !p), 2700)
        }
    }

    return <>
        <img className="wave" src={wave} alt='design'/>
        <div className="auth_container">
            <div className="img">
                <img className="logo" src={adda} alt='adda app'/>
            </div>
            <div className="login-content">
                <form onSubmit={e => e.preventDefault()}>
                    <img src={avatar} alt='login avatar'/>
                    <h2 className="title">Welcome</h2>
                    <div className="input-div one">
                        <div className="i">
                            <i className="fas fa-user"/>
                        </div>
                        <div>
                            <h5>Email</h5>
                            <input onChange={e => setEmailInput(e.target.value)} value={emailinput} type="email"
                                   ref={logemailRef}/>
                        </div>
                    </div>
                    <div className="input-div pass">
                        <div className="i">
                            <i className="fas fa-lock"/>
                        </div>
                        <div className="div">
                            <h5>Password</h5>
                            <input onChange={e => setPassInput(e.target.value)} value={passinput} type="password"
                                   ref={logPasswordRef}/>
                        </div>
                    </div>
                    <p className='errLogin'>{(showErr.foremail && 'Invalid Email') || (showErr.forpass && 'Invalid Password.') || ((authrize_context.isBadRequest.message.includes('Invalid')) && authrize_context.isBadRequest.message)}</p>
                    <p className='errLogin'>{tempError && 'Please Put Your Valid Email & Password'}</p>
                    <p className='reqreg' onClick={_ => requestSignup(true)}>Not Registered Yet!</p>
                    <input type="submit" onClick={_ => onLogIN()} className="btn" value="Login"/>
                </form>
            </div>
        </div>

        {popSignUp && <SignUp onCancel={requestSignup}/>}
    </>

}


export default LogIn;