const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
   name:String,
   users:Number
})

const RoomModel = mongoose.model("rooms", RoomSchema)

module.exports = RoomModel