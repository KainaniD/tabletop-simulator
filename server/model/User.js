const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
   username:{type: String, required: true},
   email:{type: String, required: true},
   pfp:{type:String, default: "0ea28f2880b6efa9daf4c6fe690c32d704fbfceac30abd639ac0a25497a1246a"},
   friends:[{type: mongoose.Schema.Types.ObjectId, ref: "friends"}]
})

UserSchema.plugin(passportLocalMongoose); 

const userModel = mongoose.model("users", UserSchema, "users")

module.exports = userModel