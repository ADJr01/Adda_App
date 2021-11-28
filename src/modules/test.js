const {log} = require("./Utility/Utility");
const socketSessions = require("./Controller/SocketController/SocketSession");

const sessionAdapter = socketSessions();

sessionAdapter.newSession('a',2)
sessionAdapter.newSession('b',1);
sessionAdapter.newSession('a',3);
sessionAdapter.newSession('b',4);
sessionAdapter.newSession('a',10);
sessionAdapter.newSession('c',5)
sessionAdapter.newSession('c',16);
sessionAdapter.newSession('d',11);
console.log(sessionAdapter.getSessions());
sessionAdapter.newSession('d',12);
sessionAdapter.newSession('d',12);
sessionAdapter.newSession('d',13);
sessionAdapter.newSession('a',17)
console.log(sessionAdapter.getSessions());