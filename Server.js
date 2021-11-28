/*
*  * title : Adda-App server
*  * author : adnan
* */
// ! dependencies
const dotenv = require('dotenv');
const express = require('express');
const {auth_Router, setAuthNotifier} = require('./src/Routers/Auth.Route');
const {dashBoardRouter, setDashNotifier} = require('./src/Routers/DashBoard.Route');
const app = express();
const expressServer = require('http').createServer(app);
const {Server} = require('socket.io');
const cors = require('cors');
dotenv.config({path: './config.env'});
app.use(cors())
app.use(express.json());
const mongoose = require('mongoose');

// ? socket initialization
const event_list = require("./src/modules/Controller/SocketController/EventList");
const Io = new Server(expressServer, {cors: {origin: process.env.CLIENTPORT, methods: ["GET", "POST"]}});
const socketSessions = require('./src/modules/Controller/SocketController/SocketSession')
const sessionAdapter = socketSessions();


// * Mongoose Connection
mongoose.connect(process.env.ALTAS).then(_ => {
    process.stdout.write('Adda Server Initialized  Successfully\n=> ');
}).catch(err => {
    console.log(`Couldn't Initialize Server ${err.message}\n=> call exit -1`);
    expressServer.close();
    app.close();
    process.exit(-1);
    return -1
})


Io.on('connection', socket => {
    // ? Do All sorts of Operation on distinct User just by emitting event find distinct user through + socket client array
    // * Event Emitting CheatSheet:   https://socket.io/docs/v3/emit-cheatsheet/
    const notify = (onEvent, body, global = false) => {
        console.log('notifying');
        if (global) {
            socket.broadcast.emit(onEvent, body);
            return true
        }
        if (body.hasOwnProperty('for') && Object.keys(event_list).includes(onEvent)) {
            sessionAdapter.getUserSessions(body.for).forEach(e => Io.to(e).emit(onEvent, body));
            return true;
        } else {
            console.log(`Has For ${body.hasOwnProperty('for')}`);
            console.log(Object.keys(event_list), onEvent);

            throw new ErrorEvent('No end user found while processing socket event.');
        }

    }

    socket.on('online', data => {
        console.log(`User Online: ${data.uID} session: ${socket.id}`);
        sessionAdapter.newSession(data.uID, socket.id);

    });


    setAuthNotifier(_ => notify);
    setDashNotifier(_ => notify);

    // ? Mounting Routers to Routes
    app.use('/auth', auth_Router);
    app.use('/dashboard', dashBoardRouter);


    socket.on('offline', _ => {
        sessionAdapter.removeSession(socket.id) && console.log(`User  offline session: ${socket.id}`);

    });

    socket.on('disconnect', _ => {
        sessionAdapter.removeSession(socket.id) && console.log(`User  offline session: ${socket.id}`);

    });
});


// * Mounting The Server to Serve
expressServer.listen(process.env.PORT, _ => {
    console.log(`Server Mounted on Port: ${process.env.PORT}`);
});






