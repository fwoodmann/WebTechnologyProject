const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    author: String,
    context: String,
    comments: String,
    rating: Number
});
module.exports = mongoose.model("post", postSchema);