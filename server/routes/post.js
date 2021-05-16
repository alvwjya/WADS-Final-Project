const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { post } = require('./auth');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");

router.get('/allpost', (req, res) => {
    Post.find() //get all the post 
        .populate("postedBy", "_id name") // to get info about people who posted the post
        .then(posts => {
            res.json({ posts: posts })
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/createpost', requireLogin, (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    req.Users.password = undefined;
    const post = new Post({
        title,
        body,
        postedBy: req.Users
    });
    post.save().then(result => {
        res.json({ post: result })
    })
        .catch(err => {
            console.log(err)
        });
});

router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.Users._id })
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.jsonp({ mypost: mypost })
        })
        .catch(err => {
            console.log(err)
        });
});

module.exports = router;
