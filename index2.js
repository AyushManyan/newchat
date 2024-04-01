const express = require('express');
const app = express();
const fs=require('fs');
const server=require('socket.io');


const io = server(app.listen(3000));

app.get('/', (req, res) => {
    fs.readFile('chatweb.html', 'utf8', function(err, data) {
        if (err) throw err;
        res.send(data);
    });

});
var myname="";

io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.on("join",username=>{
    //     socket.username=username;
    //     io.emit("chat msg",{type:"notification",msg:`${username} has joined the chat`});
    // })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('user-disconnected', myname);
    });
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg);
        io.emit('chat message', msg);
    }
    );
    socket.on('new-user', (msg) => {
        myname=msg;
        console.log('new user: ' + msg);
        io.emit('new-user', msg);
    });
});