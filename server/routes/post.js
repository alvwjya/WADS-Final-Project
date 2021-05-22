const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { post } = require('./auth');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");

router.get('/allpost', requireLogin, (req, res) => {
    Post.find().sort({ date: 1 }) //get all the post 
        .populate("username", "_id username") // to get info about people who posted the post
        .then(posts => {
            res.json({ posts: posts })
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/newpost', requireLogin, (req, res) => {
    const { title, caption, tag, photo } = req.body;
    if (!title || !photo) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    req.Users.password = undefined;
    const post = new Post({
        title,
        tag,
        caption,
        photo,
        username: req.Users
    });
    post.save().then(result => {
        res.status(200).json({ post: result })
    })
        .catch(err => {
            console.log(err)
        });
});

router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ username: req.Users._id }).sort({ date: 1 })
        .populate("username", "_id username")
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err)
        });
});

router.get('/postdetail', requireLogin, (req, res) => {
    Post.findOne({ _id: req.headers.p })
        .populate("username", "_id username")
        .populate("comments.username", "_id username")
        .then(array => {
            res.json({ post: array })
        })
        .catch(err => {
            console.log(err);
        });
})



router.put('/like', requireLogin, (req, res) => {
    Post.findOne({ _id: req.body.postId })
        .then(array => {
            if (array.likes.includes(req.Users._id)) {
                Post.findByIdAndUpdate(req.body.postId, {
                    $pull: { likes: req.Users._id }
                }, {
                    new: true
                }).exec((err, result) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    } else {
                        res.json(result)
                    }
                }).catch(err => {
                    return res.status(500).json({ message: err })
                })
            } else {
                if (array.dislikes.includes(req.Users._id)) {
                    Post.findByIdAndUpdate(req.body.postId, {
                        $pull: { dislikes: req.Users._id },
                        $push: { likes: req.Users._id }
                    }, {
                        new: true
                    }).exec((err, result) => {
                        if (err) {
                            return res.status(422).json({ error: err })
                        } else {
                            res.json(result)
                        }
                    }).catch(err => {
                        return res.status(500).json({ message: err })
                    })
                } else {
                    Post.findByIdAndUpdate(req.body.postId, {
                        $push: { likes: req.Users._id }
                    }, {
                        new: true
                    }).exec((err, result) => {
                        if (err) {
                            return res.status(422).json({ error: err })
                        } else {
                            res.json(result)
                        }
                    }).catch(err => {
                        return res.status(500).json({ message: err })
                    })
                }
            }
        })
})


router.put('/dislike', requireLogin, (req, res) => {
    Post.findOne({ _id: req.body.postId })
        .then(array => {
            if (array.dislikes.includes(req.Users._id)) {
                Post.findByIdAndUpdate(req.body.postId, {
                    $pull: { dislikes: req.Users._id }
                }, {
                    new: true
                }).exec((err, result) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    } else {
                        res.json(result)
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                if (array.likes.includes(req.Users._id)) {
                    Post.findByIdAndUpdate(req.body.postId, {
                        $pull: { likes: req.Users._id },
                        $push: { dislikes: req.Users._id }
                    }, {
                        new: true
                    }).exec((err, result) => {
                        if (err) {
                            return res.status(422).json({ error: err })
                        } else {
                            res.json(result)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
                Post.findByIdAndUpdate(req.body.postId, {
                    $push: { dislikes: req.Users._id }
                }, {
                    new: true
                }).exec((err, result) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    } else {
                        res.json(result)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        })
})


router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        comment: req.body.comment,
        username: req.Users._id
    }

    if (!comment.comment || !comment.username) {
        return res.status(422).json({ message: "Unable to comment, make sure to fill all the fields" });
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    }).populate("comments.username", "_id username")
        .populate("username", "_id username")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})


router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findById(req.params.postId)
        .populate("username", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            else if (post.username._id.toString() === req.Users.id.toString()) {
                post.remove()
                    .then(
                        res.status(200).json({ message: "Post Deleted." })
                    ).catch(err => {
                        res.statuc(401).json({ error: err })
                    })
            }
            else {
                return res.status(401).json({ error: "Unauthorized to delete post." })
            }
        })
});


router.delete('/deletecomment/:commentId', requireLogin, (req, res) => {
    Post.findOneAndUpdate({ _id: req.headers.p },
        { $pull: { comments: { _id: req.params.commentId } } })
        .then(result => {
            //console.log(result.comments[0]._id)
            return res.status(200).json({ result })
        }).catch(err => {
            return res.status(402)
        })
});

module.exports = router;
