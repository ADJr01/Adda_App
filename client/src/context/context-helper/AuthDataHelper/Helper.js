import {encodetoVersed, hash_MD5, hash_sha56} from "../../../Utils/Crypter";

const request_types = {
    login: 15515,
    register: 15586,
    flush: 18385,
    check: 1455
}
export const data_build_sign_up = data => {
    return {
        type: request_types.register,
        data: encodetoVersed(
            JSON.stringify(
                {
                    first_name: data.fname,
                    last_name: data.lname,
                    dob: data.date,
                    gender: data.gender,
                    email: data.email.toString().toLowerCase(),
                    password: hash_MD5(hash_sha56(data.password))
                }
            )
        )
    }

}

export const data_build_login = data => {
    return {
        type: request_types.login,
        data: encodetoVersed(
            JSON.stringify(
                {
                    email: data.email.toString().toLowerCase(),
                    password: hash_MD5(hash_sha56(data.password))
                }
            )
        )

    }
}

export const data_build_logOUT = email => {
    return {
        type: request_types.flush,
        data: encodetoVersed(
            JSON.stringify(
                {
                    email: email
                }
            )
        )
    }


}

export const data_build_check = token => {
    return {
        type: request_types.check,
        data: encodetoVersed(
            JSON.stringify(
                {
                    acpc: token
                }
            )
        )
    }


}