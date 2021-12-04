'use strict'
const Chat = require('../../../Models/Chat');
const {chatHash} = require('../../Utils/Utility');

const requestChatData = async between => {
    if (between.hasOwnProperty('sender') && between.hasOwnProperty('receiver')) {
        const parsed = await Chat.findOne({chatID: chatHash(between.sender, between.receiver)});
        if (parsed === null) {
            return {
                hasChat: false,
                data: null
            }
        } else {
            const chatArr = parsed.chats;
            const total = chatArr.length - 1;
            for (let i = total; i >= 0; i--) {
                if (chatArr[i].sent_for === between.sender && chatArr[i].isSent === false) {
                    chatArr[i].isSent = true;

                } else {
                    i < total && await parsed.save();
                    break;
                }
            }

            return {
                hasChat: true,
                data: chatArr
            }
        }
    }
    return {
        hasChat: false,
        data: null
    }
}

const getUnReceived = async between => {
    if (between.hasOwnProperty('sender') && between.hasOwnProperty('receiver')) {
        const parsed = await Chat.findOne({chatID: chatHash(between.sender, between.receiver)});
        if (parsed === null) {
            return {
                hasUnRecevied: false,
                data: null
            }
        }
        const list = [];
        const chatArr = parsed.chats;
        const total = chatArr.length - 1;
        for (let i = total; i >= 0; i--) {
            if (chatArr[i].sent_for === between.sender && chatArr[i].isSent === false) {
                list.unshift(chatArr[i]);
                chatArr[i].isSent = true;

            } else {
                i < total && await parsed.save();
                return {
                    hasUnRecevied: list.length > 0,
                    data: list,
                }
            }
        }


    } else {
        console.log(between);
        return {
            hasUnRecevied: false,
            data: null
        }
    }

}

const persistChat = async (between, content, isSent) => {
    if (between.hasOwnProperty('sender') && between.hasOwnProperty('receiver')) {
        const chat_id = chatHash(between.sender, between.receiver);// ? creating hash for particular char couple
        const chat_list_based_on_id = await Chat.findOne({chatID: chat_id});
        if (chat_list_based_on_id !== null) {
            const chat_array = chat_list_based_on_id.chats;
            chat_array.push({
                sent_for: between.receiver,
                sent_by: between.sender,
                content: content,
                isSent: isSent
            });
            await chat_list_based_on_id.save();
            return true;
        } else {
            await Chat.create({
                chatID: chat_id,
                chats: [
                    {
                        sent_for: between.receiver,
                        sent_by: between.sender,
                        content: content,
                        isSent: isSent
                    }
                ]

            });
            return true;
        }
    } else {
        throw new Error('Invalid coupled data');
    }
}

module.exports = {requestChatData, getUnReceived, persistChat}