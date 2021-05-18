const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = mongoose.model("Users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const requireLogin = require('../middleware/requireLogin');

router.get('/', (req, res) => {
    res.send("Hello");
});



router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
        res.json({ error: "Please fill in all the required data" });
    }

    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return res.json({ error: "Invalid email!" });
    }
    
    Users.find({ $or: [{ username: username }, { email: email }] })
        .then((savedUser) => {
            if (savedUser.length > 0) {
                return res.status(422).json({ error: "Username or email unavailable!" });
            }

            //put bigger number if you want it to become more secure
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new Users({
                        username,
                        email,
                        password: hashedPassword
                    });
                    user.save()
                        .then(user => {
                            res.json({ message: "Account created successfully" });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                });
        });

});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please enter email or password" });
    }
    Users.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" });
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        //res.json({message:"successfully signed in"})
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        res.json({ token });
                    }
                    else {
                        return res.status(422).json({ error: "Invalid email or password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
})

module.exports = router