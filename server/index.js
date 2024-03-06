const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{ //io is instance of http.Server
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    }
});

io.on("connection",(socket)=>{ // listen for connection
    console.log(`user connected to ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with ID ${socket.id} joined room: ${data}`);
    })
    
    socket.on("send_message",(data)=>{
        socket.to(data.roomID).emit("receive_message",data);
    })

    socket.on("disconnect",()=>{  //handle disconnect
        console.log("user disconnected", socket.id);
    });
});

server.listen(3001,()=>{
    console.log('Server is running on port 3001');
});
