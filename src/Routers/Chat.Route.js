const express = require("express");
const chatRouter = express.Router();
const controller = require('../modules/Controller/ChatController/ChatControll')
const event_list = require("../modules/Controller/SocketController/EventList");
let notifier = null;
const setChatNotifier = func=>{
    notifier = func();
}
chatRouter.route('/send')
    .post(async (req,res)=>{
        const sender = req.body.sender;
        const content = req.body.content;
        const forUser = req.body.for;
        const isSent =  notifier(event_list.chat,{"for":forUser,from: sender,content:content});
        const isSaved = await controller.persistChat({sender:sender,receiver:forUser},content,isSent);
        res.status(isSaved?200:406).json({
            success: isSaved,
            sent: isSent
        })
    });
chatRouter.route('/unreceived')
    .post(async (req,res)=>{
        const askedBy = req.body.sender;
        const withUser = req.body.for;
        const data = await controller.getUnReceived({sender:askedBy,receiver:withUser});
        res.status(data.hasUnRecevied?200:304).json({
            hasUnRecevied: data.hasUnRecevied,
            data: data.data
        });


    });
chatRouter.route('/previous')
    .post(async (req,res)=>{
        const askedBy = req.body.sender;
        const withUser = req.body.for;
        const data = await controller.requestChatData({sender:askedBy,receiver:withUser});
        res.status(data.hasChat?200:201).json({
            hasPrevious: data.hasChat,
            data: data.data
        });

    });



module.exports = {chatRouter,setChatNotifier};
