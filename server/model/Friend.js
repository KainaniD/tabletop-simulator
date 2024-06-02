const mongoose = require('mongoose')

const FriendsSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    status: {
      type: Number,
      default: 0,
      enums: [
          0,    //'add friend',
          1,    //'requested',
          2,    //'pending',
          3,    //'friends'
      ]
    }
  }, {timestamps: true})
 
 const friendsModel = mongoose.model("friends", FriendsSchema, "friends")
 
  module.exports = friendsModel