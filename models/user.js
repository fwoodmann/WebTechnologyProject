const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model("User", loginSchema);