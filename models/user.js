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

UserSchema.pre("save", function(next) {
    let user = this;

    bcrypt.hast(user.password, 10).then(hash => {
        user.password = hash;
        next();
    })
    .catch(error => {
        console.log(`Error in hashing password: ${error.message}`);
        next(error);
    })
});

UserSchema.methods.passwordComparison = function(inputPassword){
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", UserSchema);