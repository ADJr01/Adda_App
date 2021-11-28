import {useEffect, useState} from "react";
import * as validator from '../../Utils/Utility'

const dataHolder = validator.dateState();
dataHolder.setDate(1990);
dataHolder.setDate('Jan');
dataHolder.setDate(1)

const useAuthSIGNUP = _ => {
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState({valid: false, match: password === repassword});
    const [dob, setDob] = useState(1)
    const [gender, setGender] = useState('');
    const [errorCause, seterrorCause] = useState('');
    const [isFormValid, setIsFormvalid] = useState(false);
    const [errorOn, serErrorOn] = useState(0);

    useEffect(_ => {
        dataHolder.setDate(dob);
    }, [dob])

    // ! validate whole form
    useEffect(_ => {
        if (fname.length > 0 && lname.length > 0 && isValidEmail && isValidPassword.valid && isValidPassword.match && gender.length > 0 && dataHolder.isValidDate()) {
            seterrorCause('');
            serErrorOn(0);
            setIsFormvalid(true)
        } else {
            isFormValid && setIsFormvalid(false);
            if (fname.length < 1 || lname.length < 1) {
                serErrorOn(fname.length < 1 ? 1 : 2);
                seterrorCause(errorOn === 1 ? 'First Name Required' : 'Last Name Required');
            } else if (!isValidEmail) {
                serErrorOn(3);
                seterrorCause('Email  is Invalid.');
            } else if (!isValidPassword.valid || !isValidPassword.match) {
                serErrorOn(!isValidPassword.valid ? 4 : 5);
                seterrorCause(!isValidPassword.valid ? 'Not Valid Password. It must contains a number, a capital letter Alphabet and Small letter Alphabet' : 'Password Do Not Match');
            } else if (!dataHolder.isValidDate()) {
                serErrorOn(6);
                seterrorCause('Invalid Date.Please Choose Your Birth Date.')
            } else if (gender.length < 1) {
                serErrorOn(7);
                seterrorCause('Please Choose Your Gender');
            }
        }


    }, [fname, lname, isValidPassword, isValidEmail, isFormValid, gender.length, email.length, errorOn]);


    // ! validates password
    useEffect(_ => {
        if (validator.isValidPassword(password)) {
            setIsValidPassword(prev => {
                return {...prev, valid: true}
            });
        } else {
            isValidPassword.valid && setIsValidPassword(prev => {
                return {...prev, valid: false}
            });
        }
        if (isValidPassword.valid && repassword === password) {
            setIsValidPassword(prev => {
                return {...prev, match: true}
            });
        } else {
            isValidPassword.match && setIsValidPassword(prev => {
                return {...prev, match: false}
            });
        }


    }, [isValidPassword.match, isValidPassword.valid, password, repassword]);


    // ! validates email
    useEffect(_ => {
        if (email.length >= 3) {
            if (validator.isValidEmail(email)) {
                setIsValidEmail(true);
            } else {
                setIsValidEmail(false);
            }
        }
    }, [email]);


    return {
        setFName,
        setLName,
        setEmail,
        setPassword,
        setRePassword,
        setDob,
        setGender,
        values: {
            fname,
            lname,
            email,
            isValidEmail,
            password,
            date: dataHolder.getDate(),
            repassword,
            isValidPassword,
            gender,
            isFormValid,
            errorCause,
            errorOn
        }
    }
}

export default useAuthSIGNUP;