const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    author:{
        type: String,
        required: true
    }, 
    context:{
        type: String,
        required: true
    }, 
    comments:{
        type: String,

    }, 
    rating:{
        type: Number

    } 
});

postSchema.methods.findPost = function () {
    return this.model("Post").find({author: this.author}).exec();
}
module.exports = mongoose.model("post", postSchema);