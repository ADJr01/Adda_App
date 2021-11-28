import styled from './style/style.module.css'
import {arrayBetween} from '../../../Utils/Utility'
import {createPortal} from "react-dom";
import {useContext, useEffect, useRef, useState} from "react";
import useAuthSIGNUP from "../../../Hooks/AuthHooks/useAuthSIGNUP";
import Authorizer from "../../../context/Authorizer";

const SignUp = ({onCancel}) => {
    const authorize_context = useContext(Authorizer);
    const {setDob, setFName, setEmail, setLName, setPassword, setRePassword, setGender, values} = useAuthSIGNUP();
    const [fnameRef, lnameRef, emailRef, passRef, rePassRef] = [useRef(), useRef(), useRef(), useRef(), useRef()];
    const [onSubmitError, setOnSubmitError] = useState(false);
    const [fnInputBlur, setFnInputBlur] = useState(false);
    const [lnInputBlured, setLnInputBlured] = useState(false);
    const [emailInputBlured, setEmailInputBlured] = useState(false);
    const [pasInputBlured, setPASInputBlured] = useState(false);
    const [rePasInputBlured, setREPASInputBlured] = useState(false);

    useEffect(_ => {
        fnameRef.current.addEventListener('blur', _ => {
            setFnInputBlur(true);
        });
        fnameRef.current.addEventListener('focus', _ => {
            setFnInputBlur(false);
        });

        lnameRef.current.addEventListener('blur', _ => {
            setLnInputBlured(true);

        });
        lnameRef.current.addEventListener('focus', _ => {
            setLnInputBlured(false);

        })
        passRef.current.addEventListener('blur', _ => {
            setPASInputBlured(true);

        });

        passRef.current.addEventListener('focus', _ => {
            setPASInputBlured(false);

        });
        rePassRef.current.addEventListener('blur', _ => {
            setREPASInputBlured(true);

        });

        rePassRef.current.addEventListener('focus', _ => {
            setREPASInputBlured(false);

        });

        emailRef.current.addEventListener('blur', _ => {
            setEmailInputBlured(true);

        });

        emailRef.current.addEventListener('focus', _ => {
            setEmailInputBlured(false);

        });


    }, [emailRef, fnameRef, lnameRef, passRef, rePassRef, values.email.length, values.isValidEmail]);

    const onSubmitRegister = _ => {
        if (values.isFormValid) {
            authorize_context.onUserRegistration(values);
        } else {
            setOnSubmitError(true);
            setTimeout(_ => {
                setOnSubmitError(false);
            }, 3000)
        }
    }


    return createPortal(<>
        <div className={styled.overlay}/>
        <div className={styled.registration}>
            <h1 className={styled["form-heading"]}>
                Create an account
            </h1>
            <p className={styled.text}>It's Secure</p>
            <form className={styled.formSection} onSubmit={event => event.preventDefault()}>
                <div className={styled["form-group"]}>
                    <input type="text" value={values.fname} className={`${styled.control} ${styled.half}`}
                           ref={fnameRef}
                           onChange={e => setFName(e.target.value)} placeholder="First Name"/>
                    <input type="text" value={values.lname} className={`${styled.control} ${styled.half}`}
                           ref={lnameRef}
                           onChange={e => setLName(e.target.value)} placeholder="Last Name"/>

                </div>
                {((fnInputBlur && values.fname.length < 1) || (lnInputBlured && values.lname.length < 1)) &&
                <p className={styled.errorCauseSignUp}>{values.fname.length < 1 ? 'First Name' : 'Last Name'} Cannot Be
                    Empty</p>}
                <div className={styled["form-group"]}>
                    <input type="text" value={values.email} className={styled.control} ref={emailRef}
                           onChange={e => setEmail(e.target.value)} placeholder="Email"/>

                </div>
                {emailInputBlured && values.errorOn === 3 &&
                <p className={styled.errorCauseSignUp}>{values.errorCause}</p>}
                <div className={styled["form-group"]}>
                    <input type="password" value={values.password} className={styled.control} ref={passRef}
                           onChange={e => setPassword(e.target.value)} placeholder="Password"/>

                    <input type="password" value={values.repassword} className={styled.control} ref={rePassRef}
                           onChange={e => setRePassword(e.target.value)} placeholder="Re-Type Password"/>


                </div>
                {pasInputBlured && values.errorOn === 4 &&
                <p className={styled.errorCauseSignUp}>{values.errorCause}</p>}
                {rePasInputBlured && values.errorOn === 5 &&
                <p className={styled.errorCauseSignUp}>{values.errorCause}</p>}
                <div className={styled["form-group"]}>
                    <p className={styled.sectitle}>Birthday</p>
                    <select onChange={e => setDob(e.target.value)} id="date">
                        {arrayBetween(1, 31).map(e => <option key={e} value={e}>{e}</option>)}

                    </select>
                    <select onChange={e => setDob(e.target.value)} id="month">
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                    </select>
                    <select onChange={e => setDob(e.target.value)} defaultValue='1990' id="year">
                        {arrayBetween(1910, 2020).map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
                <div onChange={e => setGender(e.target.value)} className={styled["form-group"]}>
                    <p className={styled.sectitle}>Gender</p>
                    <input className={styled.radios} type="radio" name="gender" value="male" id="gender1"/> <b
                    className="opt">Male</b>
                    <input className={styled.radios} type="radio" name="gender" value="female" id="gender2"/> <b
                    className="opt">Female</b>
                    <input className={styled.radios} type="radio" name="gender" value="trans" id="gender3"/> <b
                    className="opt">Other</b>
                </div>
                <div className={styled["form-group"]}>
                    <p className={styled.someText}>By clicking Sign Up, you agree to our Terms, Data Policy and
                        Condition. You
                        may receive Email notifications from us.</p>
                </div>
                <div className={styled["form-group"]}>
                    <button type="submit" onClick={_ => onSubmitRegister()} className={styled.btn}>Sign Up</button>
                    <button type="submit" onClick={_ => onCancel(false)} className={styled.cancel}>Cancel</button>
                </div>

            </form>
            {onSubmitError && <p className={styled.errorCauseSignUp}>{values.errorCause}</p>}
            {authorize_context.isBadRequest.state &&
            <p className={styled.errorCauseSignUp}>{authorize_context.isBadRequest.message}</p>}
        </div>


    </>, document.getElementById('portal'));

}


export default SignUp;