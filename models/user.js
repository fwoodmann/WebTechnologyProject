const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model("User", loginSchema);