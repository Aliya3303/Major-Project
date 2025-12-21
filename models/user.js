const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// USER SCHEMA
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
         unique: true 
    }
});

// Automatically adds username + password hash + salt
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);