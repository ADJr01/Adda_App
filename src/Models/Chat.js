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
        },
        isSent: {
            type: Boolean,
            default: true
        }


    }
)

const chat_Struct = new mongoose.Schema({
    chatID: {
        type: String,
        required: [true, "Coupled ID is mandatory"],
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


/*{
  _id: new ObjectId("61a713274a27fb8ae1753762"),
  chatID: '..089@@aaaaaaccdegghhiillmmmmnnooprstt',
  conversation_init: 2021-12-01T06:16:06.266Z,
  chats: [
    {
      sent_on: 2021-12-01T06:16:06.263Z,
      sent_for: 'sthep90@gmail.com',
      sent_by: 'adnanrahat8@gmail.com',
      content: 'hy there1 how are you',
      isSent: true,
      _id: new ObjectId("61a713274a27fb8ae1753763")
    }
  ],
  isDeleted: false,
  __v: 0
}
*/