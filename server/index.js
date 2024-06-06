const express = require('express');

require('dotenv').config()

const path = (process.env.MODE === "dev") ? ".env.dev" : ".env.production"

require('dotenv').config({ path: path })


const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://keelanhu01:yjX6GhQTrZhNDkJs@tabletop-simulator.g6o2qfy.mongodb.net/?retryWrites=true&w=majority&appName=Tabletop-Simulator'
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const crypto = require('crypto')
const multer = require('multer')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const prisma = require('prisma')
const sharp = require('sharp')

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
const { all } = require('axios');

const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
    optionSuccessStatus: 200
}

mongoose.connect(MONGO_URL)
app.use(express.json())
app.use(cors(corsOptions));

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const AWSkey = process.env.AWSKEY
console.log(AWSkey)
const secret = process.env.SECRETKEY
const bucketName = '35l-project';
const bucketRegion = 'us-east-2';

const s3 = new S3Client({
    credentials: {
        accessKeyId: AWSkey,
        secretAccessKey: secret,
    },
    region: bucketRegion
});



app.use(session({
    secret: 'this is a really good secret',
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
        secure: (process.env.MODE === "dev") ? false : true,
        sameSite: (process.env.MODE === "dev") ? 'lax' : 'none',
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.session());

app.enable('trust proxy', 1)

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    const checkValidPassword = (process.env.MODE === "dev") ? false : true
    const checkValidEmail = (process.env.MODE === "dev") ? false : true

    if (checkValidPassword) {
        const containsLowercase = /[a-z]/
        const containsUppercase = /[A-Z]/
        const containsNumber = /[0-9]/
        const containsSpecial = /[!@#$%&*(){}]/
        const allRegexChecks = [[containsLowercase, "lowercase letter"], [containsUppercase, "uppercase letter"], [containsNumber, "number"], [containsSpecial, "special character"]]

        if (password.length < 10) {
            return res.json({ success: false, message: "please make a longer password, it must be at least 10 characters long" })
        }
        for (let i = 0; i < allRegexChecks.length; i++) {
            if (!password.match(allRegexChecks[i][0])) {
                return res.json({ success: false, message: "your password needs a " + allRegexChecks[i][1] })
            }
        }
    }

    if (checkValidEmail) {
        const regexCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!email.match(regexCheck)){
            return res.json({ success: false, message: "your email is invalid" })
        }
    }

    if (password.match)
        userModel.findOne({ username: username })
            .then((user) => {
                if (user) {
                    return res.json({ success: false, message: "a user with the name " + username + " already exists" })
                } else {
                    userModel.register(new userModel({ username: username, email: email }), password)
                        .then(res.json({ success: true, message: "Hi " + username + " you've registered your account!" }))
                        .catch(err => res.json(err))
                }
            })
})

app.get("/login", (req, res) => {

    const { username, password } = req.query
    req.body = { username: username, password: password }

    const passwordAttempt = (process.env.MODE === "dev") ? false : true


    passport.authenticate("local", function (err, user) {
        if (err) {
            return res.json({ success: false, message: "something wrong happened :(" })
        }
        else {
            if (!user) {
                if (passwordAttempt) {
                    userModel.findOne({ username: username })
                        .then((user) => {
                            if (user) {
                                const newAttempts = user.attempts - 1
                                if (newAttempts < 0) {
                                    userModel.findByIdAndDelete(user._id)
                                        .then(() => {
                                            friendsModel.findOneAndDelete({ requester: user._id })
                                                .then(() => {
                                                    friendsModel.findOneAndDelete({ reciever: user._id })
                                                        .then(() => {
                                                            return res.json({ success: false, message: "too many attempts, deleting your account" })
                                                        })
                                                        .catch(() => res.json({ success: false, message: "that user does not exist" }))
                                                })
                                                .catch(() => res.json({ success: false, message: "that user does not exist" }))
                                        })
                                        .catch(() => res.json({ success: false, message: "that user does not exist" }))
                                } else {
                                    userModel.updateOne({ _id: user._id }, { attempts: newAttempts })
                                        .then(() => {
                                            return res.json({ success: false, message: "you failed your password, attempts left: " + newAttempts })
                                        })
                                        .catch(() => res.json({ success: false, message: "that user does not exist" }))
                                }
                            } else {
                                res.json({ success: false, message: "that user does not exist" })

                            }
                        })
                        .catch(() => res.json({ success: false, message: "that user does not exist" }))
                } else {
                    return res.json({ success: false, message: "this user does not exist" })
                }
            } else {
                req.login(user, function (err) {
                    if (err) {
                        return res.json({ success: false, message: "that user does not exist" })
                    } else {
                        userModel.findOneAndUpdate({ _id: user._id }, { attempts: 10 })
                            .then(() => {
                                req.session.save()
                                return res.json({ success: true, message: "you logged in", user: user })
                            })
                            .catch(() => { return res.json({ success: false, message: "something wrong happened :(" }) })
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
                                return res.json({ success: false, message: "there already exists a request between users" })
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
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

app.post('/profile', upload.single('image'), async (req, res) => {

    const file = req.file
    const user = req.body.username
    const caption = req.body.caption

    const fileBuffer = await sharp(file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer()

    // Configure the upload details to send to S3
    const fileName = generateFileName()
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: file.mimetype
    }
    const filter = { username: user }
    const update = { pfp: fileName }
    const amog = await userModel.findOneAndUpdate(filter, update)
    t = await userModel.findOne({ username: req.username });


    // Send the upload to S3
    await s3.send(new PutObjectCommand(uploadParams));

    // Save the image name to the database. Any other req.body data can be saved here too but we don't need any other image data.

    res.send("amogus")
})
app.get("/profile", async (req, res) => {
    /*
    const posts = await prisma.posts.findMany({ orderBy: [{ created: 'desc' }] }) // Get all posts from the database
  
    for (let post of posts) { // For each post, generate a signed URL and save it to the post object
      post.imageUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: imageName
        }),
        { expiresIn: 60 }// 60 seconds
      )
    }
    */
    const user = req.query.user
    //console.log(user);
    const prof = await userModel.findOne({ username: user }).exec()

    const post = {};

    //console.log(prof);
    //console.log(prof.pfp);

    post.imageUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({
            Bucket: bucketName,
            Key: prof.pfp
        }),
        { expiresIn: 360 }// 60 seconds
    )
    //console.log(post.imageUrl)
    res.send(post)
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
    cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "POST"]
    },
});

const roomIO = io.of("/rooms")
let rooms_with_players = {}


roomIO.on("connection", (socket) => {
    socket.on("rooms:connection", () => { })
    console.log(`connected to rooms page = ${socket.id}`)
    socket.on("sendMessage", (room, message) => {
        roomIO.to(room).emit("receiveMessage", message); // Broadcast the message to all clients in the room
        console.log(`User ${socket.id} broadcasting from room ${room}`);
        console.log('broadcasting message ' + { message } + 'to room' + { room })
        console.log(message)
        console.log(room)
    });

    socket.on("joinRoom", (room) => {           //, callback) => {
        console.log(`User ${socket.id} joining room ${room}`);
        socket.join(room);
        //callback({ status: 'ok' });
        const clients = io.sockets.adapter.rooms.get(room);
        const numClients = clients ? clients.size : 0;

        console.log(rooms_with_players)
        if ((!rooms_with_players[room]) || (rooms_with_players[room].length === 0)) {
            rooms_with_players[room] = [socket]
        }
        else {
            rooms_with_players[room].push(socket)
            console.log("Sync data request sent")

            socket.on("gameClientConnected", (message) => {
                console.log(message);
                rooms_with_players[room][0].to(room).emit("sendSync", socket.id)
            })
        }

        socket.on("cardMoved", (card_name, x, y, facedown) => {
            socket.to(room).emit("cardMoved", card_name, x, y, facedown)
        })

        socket.on("cardAddedToHand", (name, cardFront) => {
            console.log(cardFront)
            socket.to(room).emit("cardAddedToHand", name, cardFront)
        })


        socket.on("leaveRoom", (room) => {
            console.log(`left ${room}`)
            socket.emit("destroyClient")
            socket.leave(room);
            socket.removeAllListeners("gameClientConnected")
            socket.removeAllListeners("cardMoved")
            socket.removeAllListeners("cardAddedToHand")
            socket.removeAllListeners("sendSync")
            let room_list = rooms_with_players[room];
            room_list.splice(room_list.indexOf(socket), 1)
        })


    });



    socket.on("sendSync", (id, game_data) => {
        console.log("sync data received")
        roomIO.to(id).emit("getSync", game_data)
    })


    // socket.on("cardMoved", (card_name, x, y) => {
    //     socket.to(room).emit("cardMoved", card_name, x, y)
    // }) //we will trying moving this inside joining room
});

function findRoom(socket) {
    for (let item of socket.rooms) {
        if (item !== socket.id) {
            return item;
        }
    }
    throw new Error('Socket is not in a room!')
}


function findSocket(socket) {
    for (let room in rooms_with_players) {
        for (let i = 0; i < rooms_with_players[room].length; i++) {
            if (socket === rooms_with_players[room][i]) {
                return [room, i]
            }
        }
    }
    return null;
}



server.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })