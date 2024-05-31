const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
   username:String,
   email:String,
})

UserSchema.plugin(passportLocalMongoose); 

const UserModel = mongoose.model("users", UserSchema, "users")

module.exports = UserModel