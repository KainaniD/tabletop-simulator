const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
   name: { type: String, required: true}
})

const roomModel = mongoose.model("rooms", RoomSchema, "rooms")

module.exports = roomModel