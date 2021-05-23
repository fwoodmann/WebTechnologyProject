const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{  //password restrictions?
        type: String,
        required: true
    }
});

UserSchema.methods.findUser = function () {
    return this.model("User").find({username: this.username}).exec();
}

module.exports = mongoose.model("User", UserSchema);