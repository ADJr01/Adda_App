import {useEffect, useState} from "react";
import {isValidEmail} from '../../Utils/Utility'

const useAuthLog = _ => {
    const [emailinput, setEmailInput] = useState('');
    const [isEmailValid, setEmailVald] = useState(false);
    const [passinput, setPassInput] = useState('');
    const [isPassValid, setIsPassValid] = useState(false);


    useEffect(_ => {
        if (emailinput.length >= 3) {
            setEmailVald(isValidEmail(emailinput))
        }
        if (passinput.length >= 4) {
            !isPassValid && setIsPassValid(true);
        } else {
            isPassValid && setIsPassValid(false);
        }
        return _ => {
        }

    }, [emailinput, isPassValid, passinput]);

    return {setEmailInput, setPassInput, isEmailValid, isPassValid, emailinput, passinput}
}

export default useAuthLog;