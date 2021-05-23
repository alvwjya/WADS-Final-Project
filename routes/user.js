const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { post } = require('./auth');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");
const Users = mongoose.model("Users");


router.get('/user/:id', requireLogin, (req, res) => {
    Users.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            Post.find({ username: req.params.id }).sort({ date: -1 })
                .populate("username", "_id username")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    res.json({ user, posts })
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found" })
        })
})

module.exports = router