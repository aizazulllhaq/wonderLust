const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
    // passport-local-mongoose - username ( unique ) & password ( salt + hash ) create by default
});

userSchema.plugin(passportLocalMongoose);

exports.User = model("User", userSchema);