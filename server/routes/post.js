const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { post } = require('./auth');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");

// This is used to get all post.
router.get('/allpost', requireLogin, (req, res) => {
    Post.find().sort({ date: -1 }) //get all the post 
        .populate("username", "_id username") // to get info about people who posted the post
        .then(posts => {
            res.json({ posts: posts })
        })
        .catch(err => {
            console.log(err);
        });
});

// This is used to create new post
// which require title, tag, caption, photo URL, and the user.
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

// This is used to show the post detail from a post.
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

/*
This is used for like a post.
It require the post ID.
It will check whether the user already like/ dislike the post.
If not yet, it will like the post. If already like, it will unlike the post.
If the user already dislike the post, it will automatically undislike the post and like the post.
*/

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


/*
This is used for dislike a post.
It require the post ID.
It will check whether the user already like/ dislike the post.
If not yet, it will dislike the post. If already dislike, it will undislike the post.
If the user already like the post, it will automatically unlike the post and dislike the post.
*/
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


// This is used to give comment to a post
// It require comment and also the post ID.
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


// This is used to delete a post.
// It require post ID.
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


// This is used to delete a comment.
// It reuire the comment ID.
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
