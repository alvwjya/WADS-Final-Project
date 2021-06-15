const mongoose = require('mongoose')

// This is the structure of the mongoDB for users.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

mongoose.model("Users", userSchema)