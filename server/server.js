const express = require('express');
const app = express();
const PORT = 4000;


const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
app.use(cors());

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

const server = http.createServer(app);

const io = new Server(server, {
    cors: {origin:"http://localhost:3000", methods: ["GET", "POST"]},
});

io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);
    
    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data);
    });
});

server.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})