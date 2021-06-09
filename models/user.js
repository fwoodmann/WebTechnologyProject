const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
}, {
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

UserSchema.methods.findUser = function () {
    return this.model("User").find({
        username: this.username
    }).exec();
},

module.exports = mongoose.model("User", UserSchema);