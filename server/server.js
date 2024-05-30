const express = require('express');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose')
const userModel = require('./model/User')
const roomModel = require('./model/Rooms')

const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

mongoose.connect('mongodb+srv://keelanhu01:yjX6GhQTrZhNDkJs@tabletop-simulator.g6o2qfy.mongodb.net/?retryWrites=true&w=majority&appName=Tabletop-Simulator')
app.use(express.json())
app.use(cors());

app.post("/login", (req, res) => {
    const {name, password} = req.body;
    userModel.findOne({name : name})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post("/register", (req, res) => {
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/rooms", (req, res) => {
    roomModel.create(req.body)
    .then(rooms => res.json(rooms))
    .catch(err => res.json(err))
})

app.get("/rooms", (req, res) => {
    var rooms = {}
    roomModel.find({}, function (err, room) {
        console.log(room)
        rooms[room.name] = room
    })
    res.send(rooms)
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