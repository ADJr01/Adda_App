// ! @Route to /auth
const {log} = require("../modules/Utils/Utility");
const {parseAuth} = require("../modules/Parser/Parser");
const onSignUp = require("../../src/modules/Controller/AuthControllers/SignUpController");
const onLogIn = require("../../src/modules/Controller/AuthControllers/LogInController");
const onLogOut = require("../../src/modules/Controller/AuthControllers/LogOutController");
const onTokenValidate = require("../../src/modules/Controller/AuthControllers/TokenvalidatorController");
const express = require("express");
const {encodetoVersed} = require("../modules/Encryption/Crypter");
const event_list = require("../modules/Controller/SocketController/EventList");
const auth_Router = express.Router();
let notifier = '';
const setAuthNotifier = func=>{
    notifier = func();
}
const data_configs = {
    request_types: {
        login: 15515,
        register: 15586,
        flush: 18385,
        check: 1455
    }
}
// ! @Router to /Auth
auth_Router.route('/')
    .get((req,res)=>{
        res.status(501).json({isAuthorized: false,token: null,Redirect: null,Resources: -1})
    })
    .post( async (req, res) => {
        const data = parseAuth(req.body.data);
        const requestParams = data[0] && JSON.parse(data[1]);
        if (data[0]) {

            // ? on Register Rote
            if (req.body.type === data_configs.request_types.register) {
                const controller = await onSignUp(requestParams);
                if (controller.responseCode !== 201) {
                    log('Register Failed ' + controller.responseCode);
                    res.status(controller.responseCode).json({
                        status: 'failed',
                        message: controller.responseCode === 400 ? 'User Already Exist' : 'Something is Wrong',
                        exist: controller.responseCode === 400
                    })

                } else {
                    notifier(event_list.newUser,{fname:controller.fname,lname: controller.lname,email:controller.email,display:controller.display},true);
                    res.status(controller.responseCode).json({
                        status: 'OK',
                        saved: true,
                        display: controller.display,
                        token: encodetoVersed(controller.userToken),
                    });
                }

                // ? on LOGIN Route
            } else if (req.body.type === data_configs.request_types.login) {
                //handle LogIn
                const loginController = await onLogIn(requestParams);
                res.status(loginController.responseCode).json({
                    authorized: loginController.isAuthenticated,
                    status: loginController.responseCode,
                    token: loginController.isAuthenticated ? encodetoVersed(loginController.userToken) : null,
                    data:  loginController.info
                });

                // ? if user token is invalid
            } else if (req.body.type === data_configs.request_types.flush) {
                const flush = await onLogOut(requestParams.email);
                res.status(flush.responseCode).json({
                    isFlushed: flush.isFlushed
                })
            } else if (req.body.type === data_configs.request_types.check) {
                const validate = await onTokenValidate(requestParams.acpc);
                res.status(validate.responseCode).json({
                    isValid: validate.isValid
                });

            }


        } else {
            //send error
            res.status(422).json({
                status: 'error',
                reason: 'invalid request token. No Processable token found',
                data: 'Failed To Authorize User'
            })
        }
    })


module.exports = {auth_Router,setAuthNotifier};