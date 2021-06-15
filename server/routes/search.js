const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { post } = require('./auth');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");
const Users = mongoose.model("Users");

// This is used to search a user by using regex.
router.post('/search-users', (req, res) => {
    let userPattern = new RegExp("^" + req.body.query)
    Users.find({ username: { $regex: userPattern } })
        .select("_id username")
        .then(user => {
            res.json({ user })
        }).catch(err => {
            console.log(err)
        })
})

// This is used to search a tag by using regex.
router.get('/search-tag/:query', (req, res) => {
    let tagPattern = new RegExp("^" + req.params.query)
    Post.find({ tag: { $regex: tagPattern } }).sort({ date: -1 })
    .populate("username", "_id username")
        .then(posts => {
            res.json({ posts })
        }).catch(err => {
            console.log(err)
        })
})

module.exports = router
