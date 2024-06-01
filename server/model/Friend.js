const mongoose = require('mongoose')

const FriendsSchema = new mongoose.Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'users'},
    recipient: { type: Schema.Types.ObjectId, ref: 'users'},
    status: {
      type: Number,
      enums: [
          0,    //'add friend',
          1,    //'requested',
          2,    //'pending',
          3,    //'friends'
      ]
    }
  }, {timestamps: true})
 
 const FriendsModel = mongoose.model("friends", FriendsSchema, "friends")
 
  module.exports = FriendsModel