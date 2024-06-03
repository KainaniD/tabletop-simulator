const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
   username:{type: String, required: true},
   email:{type: String, required: true},
   friends:[{type: mongoose.Schema.Types.ObjectId, ref: "friends"}]
})

UserSchema.plugin(passportLocalMongoose); 

const userModel = mongoose.model("users", UserSchema, "users")

module.exports = userModel