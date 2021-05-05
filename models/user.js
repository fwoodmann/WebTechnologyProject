const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    id: String,
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model("User", UserSchema);