const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
   name:String,
})

const RoomModel = mongoose.model("rooms", RoomSchema, "rooms")

module.exports = RoomModel