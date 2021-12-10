import axios from "axios";

const uri = {
    previous: 'http://localhost:8080/chat/previous',
    unreceived: 'http://localhost:8080/chat/unreceived',
    send: 'http://localhost:8080/chat/send',
}

//? previous
export const getPrevious = (user, toUser) =>new Promise((Resolve, Reject) => {
    axios.post(uri.previous, {"sender": user, "for": toUser})
        .then(response => {
            const hasPrev = response.data.hasPrevious
            Resolve(((hasPrev && response.data.data)||[]))
        }).catch(err => {
        console.log("Error Occur in get chathelper: getPrevious line 16")
        console.log(err);
        Reject(err);
    });
});

//! unreceived
export const getUnReceived = (user, toUser) => new Promise((Resolve, Reject) => {
    axios.post(uri.unreceived, {"sender": user, "for": toUser})
        .then(response => {
            const hasUnRecevied = response.data.hasUnRecevied
            Resolve(((hasUnRecevied && response.data.data) || []))
        }).catch(err => {
        console.log("Error Occur in chathelper: getUnReceived line 29")
        console.log(err);
        Reject([])
    });
})

// * send
export const sendMessage = (user, toUser, content) => new Promise((Resolve, Reject) => {
    axios.post(uri.send, {"sender": user, "for": toUser, "content": content})
        .then(response => {
            Resolve(response.data);
        }).catch(err => {
        console.log("Error Occur in get chathelper: sendMessage line 40")
        console.log(err);
        Reject(err)
    });
})


