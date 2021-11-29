const mongoose = require('mongoose');
const chat_body = mongoose.Schema(
    {
        sent_on: {
            type: Date,
            default: Date.now()
        },
        sent_for: {
            type: String,
            required: [true, "Recipient ID is Mandatory"],
        },
        sent_by: {
            type: String,
            required: [true, "Author ID is Mandatory"],
        },
        content: {
            type: String,
            required: [true, "text data is Mandatory"],
        }

    }
)

const chat_Struct = new mongoose.Schema({
    chatID: {
        type: String,
        required: [true, "Key is mandatory"],
        unique: true
    },
    conversation_init: {
        type: Date,
        default: Date.now()
    },

    chats: [chat_body],
    isDeleted: {
        type: Boolean,
        default: false
    }

});
const Chat = mongoose.model('chat',chat_Struct);
module.exports = Chat