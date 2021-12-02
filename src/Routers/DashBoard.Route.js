const express = require("express");
const {isValidEmail} = require("../modules/Utils/Utility");
const {friendRequest,getAllUser, acceptFriend} = require("../modules/Controller/DashControllers/AllUser");
const event_list = require("../modules/Controller/SocketController/EventList");
const dashBoardRouter = express.Router();
let notifier = null;
const setDashNotifier = func=>{
    notifier = func();
}
// ! @Router to /dashboard/all
dashBoardRouter.route('/all')
    .post(async (req, res) => {
        const email = req.body.by;
        if (email && isValidEmail(email)) {
            const allUser = await getAllUser(email);
            res.status(allUser[0]).json(allUser[1]);
        } else {
            res.status(401).json({isAuthorized: -1, data: null});
        }
    });



dashBoardRouter.route('/upload')
    .get((req,res)=>{
        res.status(501).json({isAuthorized: false,message: 'service under implementation'})
    });

// ! @Router to /dashboard/friendReq
dashBoardRouter.route('/friendReq')
    .post(async (req,res)=>{
        const from = req.body.from;
        const to = req.body.to;
        const Response = await friendRequest(from,to);
        Response[0]===200 && notifier(event_list.newRequest,{"for":to,from: from});
        res.status(Response[0]).json(Response[1]);
    });

// ! @Router to /dashboard/accept
dashBoardRouter.route('/accept')
    .post(async (req,res)=>{
        const from = req.body.from;
        const to = req.body.ofUser;
        const Response = await acceptFriend(from,to);
        Response[0]===200 && notifier(event_list.newFriend,
            {isAccepted: true, newFriend:from,"for":to},
            false);
        res.status(Response[0]).json(Response[1]);
    });
module.exports = {dashBoardRouter,setDashNotifier};