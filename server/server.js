const express = require('express');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

const userModel = require('./model/User')
passport.use(userModel.createStrategy());
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

const roomModel = require('./model/Rooms')

const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const friendsModel = require('./model/Friend');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

mongoose.connect('mongodb+srv://keelanhu01:yjX6GhQTrZhNDkJs@tabletop-simulator.g6o2qfy.mongodb.net/?retryWrites=true&w=majority&appName=Tabletop-Simulator')
app.use(express.json())
app.use(cors(corsOptions));


app.use(session({
    secret: 'this is a really good secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.session());
  
app.post("/register", (req, res) => {
    const {username, email, password} = req.body;
    
    userModel.findOne({username : username})
    .then((user) => {
        if(user) {
            return res.json({success: false, message: "a user with the name " + username + " already exists"})
        }else{
            userModel.register(new userModel ({username: username, email: email}), password)
            .then (res.json( {success: true, message: "Hi " + username + " you've registered your account!"}))
            .catch (err => res.json(err))
        }
    })
})

app.get("/login", (req, res) => {

    const { username, password } = req.query
    req.body = { username: username, password: password }
    passport.authenticate("local", function (err, user) {
        if (err) {
            return res.json({ success: false, message: "something wrong happened :(" });
        }
        else {
            if (!user) {
                return res.json({ success: false, message: "username or password incorrect" });
            } else {
                req.login(user, function (err) {
                    if (err) {
                        return res.json({ success: false, message: "something wrong happened :(" });
                    } else {
                        req.session.save()
                        return res.json({ success: true, message: "you logged in", user: user })
                    }
                })
            }
        }
    })(req, res);
})

app.get("/allusers", (req, res) => {
    userModel.findOne({ username: req.user.username })
        .then((currentuser) => {
            userModel.find({})
                .then((users) => {
                    var availableUsers = users.filter((user) => {
                        // Check if the user is not the current user
                        if (user.username !== currentuser.username) {
                            // Check if any of the current user's friends match the user
                            return !currentuser.friends.some((friendId) => {
                                return user.friends.includes(friendId);
                            });
                        }
                        return false;
                    });
                    return res.json(availableUsers);
                })
                .catch((err) => {
                    console.error("Error finding users:", err);
                    res.status(500).json({ error: "An error occurred while finding users." });
                });
        })
        .catch((err) => {
            console.error("Error finding current user:", err);
            res.status(500).json({ error: "An error occurred while finding the current user." });
        });
});

app.get("/queryallusers", (req, res) => {
    const { searchQuery } = req.query

    userModel.findOne({ username: req.user.username })
        .then((currentuser) => {
            userModel.find({ username: new RegExp(searchQuery, 'i') })
                .then((users) => {
                    var availableUsers = users.filter((user) => {
                        // Check if the user is not the current user
                        if (user.username !== currentuser.username) {
                            // Check if any of the current user's friends match the user
                            return !currentuser.friends.some((friendId) => {
                                return user.friends.includes(friendId);
                            });
                        }
                        return false;
                    });
                    return res.json(availableUsers);
                })
                .catch((err) => {
                    console.error("Error finding users:", err);
                    res.status(500).json({ error: "An error occurred while finding users." });
                });
        })
        .catch((err) => {
            console.error("Error finding current user:", err);
            res.status(500).json({ error: "An error occurred while finding the current user." });
        });
});

app.get("/currentrequests", (req, res) => {
    userModel.findOne({ username: req.user.username })
        .then((user) => {
            var requests = [];
            var promises = [];

            for (let i = 0; i < user.friends.length; i++) {
                const friendId = user.friends[i];
                const promise = friendsModel.findById(friendId)
                    .then((friend) => {
                        if (friend) {
                            if (friend.status != 4) {
                                return userModel.findById(friend.requester)
                                    .then((requesterUser) => {
                                        if (requesterUser.username !== req.user.username) {
                                            requests.push(requesterUser);
                                        }
                                    });
                            }
                        }
                    })
                    .catch((err) => {
                        console.error("Error processing friend:", err);
                    });

                promises.push(promise);
            }

            Promise.all(promises)
                .then(() => {
                    return res.json(requests);
                })
                .catch((err) => {
                    console.error("Error processing friend requests:", err);
                    res.status(500).json({ error: "An error occurred while processing friend requests." });
                });
        })
        .catch((err) => {
            console.error("Error finding user:", err);
            res.status(500).json({ error: "An error occurred while finding the user." });
        });
});

app.get("/allfriends", (req, res) => {
    userModel.findOne({ username: req.user.username })
        .then((user) => {
            var requests = [];
            var promises = [];

            for (let i = 0; i < user.friends.length; i++) {
                const friendId = user.friends[i];
                const promise = friendsModel.findById(friendId)
                    .then((friend) => {
                        if (friend) {
                            if (friend.status === 4) {
                                if (friend.requester.toString() != user._id) {
                                    return userModel.findById(friend.requester)
                                        .then((requesterUser) => {
                                            requests.push(requesterUser);
                                        });
                                } else if (friend.recipient.toString() != user._id) {
                                    return userModel.findById(friend.recipient)
                                        .then((requesterUser) => {
                                            requests.push(requesterUser);
                                        });
                                }

                            }
                        }
                    })
                    .catch((err) => {
                        console.error("Error processing friend:", err);
                    });

                promises.push(promise);
            }

            Promise.all(promises)
                .then(() => {
                    return res.json(requests);
                })
                .catch((err) => {
                    console.error("Error processing friend requests:", err);
                    res.status(500).json({ error: "An error occurred while processing friend requests." });
                });
        })
        .catch((err) => {
            console.error("Error finding user:", err);
            res.status(500).json({ error: "An error occurred while finding the user." });
        });
})

app.post("/createroom", (req, res) => {

    const { name } = req.body;

    roomModel.findOne({ name: name })
        .then((room) => {
            if (room) {
                return res.json({ success: false, message: "there already exists a room with this name" })
            } else {
                roomModel.create(req.body)
                    .then(res.json({ success: true, message: "room created" }))
                    .catch(err => res.json(err))
            }
        })

})

app.get("/deleteroom", (req, res) => {
    const { name } = req.query
    roomModel.deleteOne({ name: name })
        .then(() => {
            return res.json({ success: true, message: "successfully deleted" })
            
        })
        .catch((err) => {
            return res.json({ success: false, message: "failed to delete", error: err });
        });
})

app.get("/allrooms", (req, res) => {
    roomModel.find({})
        .then((room) => {
            return res.json(room)
        })
        .catch(err => res.json(err))
})

app.get("/queryrooms", (req, res) => {
    const { searchQuery } = req.query

    roomModel.find({ name: new RegExp(searchQuery, 'i') })
        .then((room) => {
            return res.json(room)
        })
        .catch(err => res.json(err))
})

app.get("/currentuser", (req, res) => {
    return res.json(req.user)
})

app.post("/session", (req, res) => {
    req.session.destroy(function (err) {
        return res.json(err)
    })
})

app.get("/sendfriendrequest", (req, res) => {
    if (!req.query.targetuser.friends) { req.query.targetuser.friends = [] }
    const targetusername = req.query.targetuser.username
    const currentusername = req.user.username

    userModel.findOne({ username: currentusername })
        .then((currentuser) => {
            if (currentuser) {

                userModel.findOne({ username: targetusername })
                    .then((targetuser) => {

                        for (let i = 0; i < currentuser.friends.length; i++) {
                            if (targetuser.friends.includes(currentuser.friends[i])) {
                                return res.json({success: false, message: "there already exists a request between users"})
                            }
                        }

                        var request = new friendsModel({ requester: currentuser, recipient: targetuser, status: 2 })

                        userModel.findOneAndUpdate({ username: currentuser.username }, { "$push": { "friends": request } })
                            .then(() => {
                                userModel.findOneAndUpdate({ username: targetuser.username }, { "$push": { "friends": request } })
                                    .then(() => {
                                        request.save()
                                        return res.json({ success: true, message: "your friend request to " + targetuser.username + " has been sent" })
                                    })
                                    .catch((err) => res.json(err))
                            })
                            .catch((err) => res.json(err))

                    })
                    .catch(err => res.json(err))
            } else {
                return res.json({ success: false, message: "something went wrong :(" })
            }
        })
        .catch(err => res.json(err))
})

app.get("/acceptfriendrequest", (req, res) => {
    if (!req.query.targetuser.friends) { req.query.targetuser.friends = [] }
    const targetusername = req.query.targetuser.username
    const currentusername = req.user.username

    userModel.findOne({ username: currentusername })
        .then((currentuser) => {
            if (currentuser) {
                userModel.findOne({ username: targetusername })
                    .then((targetuser) => {

                        for (let i = 0; i < currentuser.friends.length; i++) {
                            if (targetuser.friends.includes(currentuser.friends[i])) {
                                friendsModel.findByIdAndUpdate(currentuser.friends[i], { status: 4 })
                                    .then(() => {
                                        return res.json({ success: true, message: "you have added " + targetuser.username + " as a friend!" })
                                    })
                                    .catch((err) => res.json(err))
                            }
                        }

                    })
                    .catch(err => res.json(err))
            } else {
                return res.json({ success: false, message: "something went wrong :(" })
            }
        })
        .catch(err => res.json(err))
})

app.get("/removefriend", async (req, res) => {
    try {
        const targetusername = req.query.targetuser.username;
        const currentusername = req.user.username;

        const currentuser = await userModel.findOne({ username: currentusername });
        if (!currentuser) {
            return res.json({ success: false, message: "Something went wrong :(" });
        }

        const targetuser = await userModel.findOne({ username: targetusername });
        if (!targetuser) {
            return res.json({ success: false, message: "Target user not found" });
        }

        for (let i = 0; i < currentuser.friends.length; i++) {
            const friendId = currentuser.friends[i];
            if (targetuser.friends.includes(friendId)) {
                await friendsModel.findByIdAndDelete(friendId);
                await userModel.updateMany(
                    { _id: { $in: [currentuser._id, targetuser._id] } },
                    { $pull: { friends: friendId } }
                );
            }
        }

        return res.json({ success: true, message: `You have denied ${targetusername} as a friend!` });
    } catch (error) {
        console.error("Error denying friend request:", error);
        res.status(500).json({ success: false, message: "An error occurred while denying friend request" });
    }
});


const server = http.createServer(app);



const io = new Server(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

const roomIO = io.of("/rooms")
let rooms_with_players = {}


roomIO.on("connection", (socket) => {
    socket.on("rooms:connection", () => {})
    console.log(`connected to room user = ${socket.id}`)
    socket.on("sendMessage", (room, message) => {
        roomIO.to(room).emit("receiveMessage", message); // Broadcast the message to all clients in the room
        console.log(`User ${socket.id} broadcasting from room ${room}`);
        console.log('broadcasting message ' + {message} + 'to room' + {room}) 
        console.log(message)
        console.log(room)
    });
    socket.on("joinRoom", (room) => {           //, callback) => {
        console.log(`User ${socket.id} joining room ${room}`);
        socket.join(room);
        //callback({ status: 'ok' });
        const clients = io.sockets.adapter.rooms.get(room);
        const numClients = clients ? clients.size : 0;
        console.log('Clients: ' + numClients)
        console.log(rooms_with_players)
        if ((! rooms_with_players[room]) || (rooms_with_players[room].length === 0)) {
            rooms_with_players[room] = [socket]
        }
        else{
            rooms_with_players[room].push(socket)
        }
    });
    socket.on("disconnect", () => {
        let _temp = findSocket(socket);
        if (_temp) {
            let _room = _temp[0];
            let _socket_index = _temp[1]
            rooms_with_players[_room].splice(_socket_index,1)
        }
        
    })
    socket.on("gameClientConnected", (message) => {
        console.log(message);
        
        //socket.to(room).emit("")
        
    })
});

function findSocket(socket) {
    for (let room in rooms_with_players) {
        for (let i=0; i< rooms_with_players[room].length; i++){
            if (socket === rooms_with_players[room][i]) {
                return [room, i]
            }    
        }
    }
    return null;
}




io.on("connection", (socket) => {
    // console.log(`a user connected ${socket.id}`);
    // players.push(socket.id);


    // socket.on("send_message", (data) => {
    //   socket.broadcast.emit("receive_message", data);
    // });

    // socket.on("cardMoved", (data) => {
    //     socket.broadcast.emit("cardMoved", data)
    // })

    socket.on("disconnect", function () {
        console.log(`A user disconnected:${socket.id}` )
    });
});

server.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })