const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tag: {
        type: String,
    },
    caption: {
        type: String
    },
    photo: {
        type: String,
        required: true
    },
    username: {
        type: ObjectId,
        ref: "Users"
    },
    date: {
        type: Date,
        default: new Date()
    }
})

mongoose.model("Post", postSchema);