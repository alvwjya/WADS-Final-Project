import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    caption: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    dislikeCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    }
});


const postMessage = mongoose.model('PostMessage', postSchema);

export default postMessage;