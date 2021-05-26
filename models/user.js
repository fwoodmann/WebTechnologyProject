const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
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
    password: { //password restrictions?
        type: String,
        required: true
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }],

}, {
    timestamps: true
});

UserSchema.methods.findUser = function () {
    return this.model("User").find({
        username: this.username
    }).exec();
}

module.exports = mongoose.model("User", UserSchema);