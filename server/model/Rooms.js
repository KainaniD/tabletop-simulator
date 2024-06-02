const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
   name:String,
})

const roomModel = mongoose.model("rooms", RoomSchema, "rooms")

module.exports = roomModel