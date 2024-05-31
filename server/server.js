const express = require('express');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

const userModel = require('./model/User')
passport.use(userModel.createStrategy());   
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

const roomModel = require('./model/Rooms')

const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

mongoose.connect('mongodb+srv://keelanhu01:yjX6GhQTrZhNDkJs@tabletop-simulator.g6o2qfy.mongodb.net/?retryWrites=true&w=majority&appName=Tabletop-Simulator')
app.use(express.json())
app.use(cors());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))

app.use(passport.session());
  
app.post("/users", (req, res) => {
    const {username, email, password} = req.body;
    
    userModel.findOne({username : username})
    .then((user) => {
        if(user) {
            res.json({success: false, message: "a user with the name " + username + " already exists"})
        }else{
            userModel.register(new userModel ({username: username, email: email}), password)
            .then (res.json( {success: true, message: "Hi" + username + " you've registered your account!"}))
            .catch (err => res.json(err))
        }
    })
})

app.get("/users", (req, res) => {
    const {username, password} = req.query
    req.body = {username: username, password: password}
    passport.authenticate("local", function (err, user) { 
        if (err) { 
            res.json({ success: false, message: "something wrong happened :(" }); 
        } 
        else { 
            if (!user) { 
                res.json({ success: false, message: "username or password incorrect" }); 
            } else {
                req.login(user, function(err) {
                    if (err) {
                        res.json({ success: false, message: "something wrong happened :(" }); 
                    } else {
                        res.json({ success: true, message: "you logged in", user: user})
                    }
                })
            }
        } 
    })(req, res); 
})

app.post("/rooms", (req, res) => {

    const {name} = req.body;
    
    roomModel.findOne({name : name})
    .then((room) => {
        if(room) {
            res.json({success: false, message: "there already exists a room with this name"})
        }else{
            roomModel.create(req.body)
            .then(res.json({success: true, message: "room created"}))
            .catch(err => res.json(err))
        }
    })

})

app.get("/rooms", (req, res) => {
    const {id, condition} = req.query
    if (condition === "delete") {
        roomModel.deleteOne({name : id})
        .then(res.json({ success: true, message: "successfully deleted"}))
        .catch(res.json({ success: false, message: "failed to delete" }))
    } else if (condition === "query") {
        roomModel.find({})
        .then((room) => {
            res.json(room)
        })
        .catch(err => res.json(err))
    }
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