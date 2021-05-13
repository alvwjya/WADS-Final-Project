const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { post } = require('./auth')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

router.post('/createpost',requireLogin, (req,res) => {
    const {title, body} = req.body
    if (!title || !body) {
        return res.status(422).json({error:"please add all the fields"})
    }
    req.Users.password = undefined
    const post = new Post({
        title,
        body,
        postedBy:req.Users
    })
    post.save().then(result => {
        res.json({post:result})
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router
