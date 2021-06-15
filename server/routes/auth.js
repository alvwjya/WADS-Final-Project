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


// This is the API for signup
router.post('/signup', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    // This is to check whether all fields alredy filled or not.
    if (!email || !password || !username || !confirmPassword) {
        return res.status(422).json({ error: "Please fill in all the required data" });
    }

    // This is used to check whether the email address format is valid or not.
    else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return res.status(422).json({ error: "Invalid email address." });
    }

    // This is to check whether the password and the confirmation password is same or not.
    else if (confirmPassword != password) {
        return res.status(422).json({ error: "The password and confirmation password do not match." });
    }

    // This is to check if the password has length more than six character or not.
    else if (password.length < 6) {
        return res.status(422).json({ error: "Password must be at least 6 characters." });
    }

    // This is used to check if the username/email address already exit or not.
    Users.find({ $or: [{ username: username }, { email: email }] })
        .then((savedUser) => {
            if (savedUser.length > 0) {
                return res.status(422).json({ error: "Sorry, username or email unavailable." });
            }

            //put bigger number if you want it to become more secure
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new Users({
                        username,
                        email,
                        password: hashedPassword
                    });
                    // If there is no user with username/email address in the database, it will return statuc code 200.
                    user.save()
                        .then(user => {
                            return res.status(200).json({ message: "Account created successfully." });
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


// This is used for signin.
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    
    // This is to check whether all fields already filled or not.
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill in all the required data." });
    }

    // This is to check the email address format.
    else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return res.status(422).json({ error: "Invalid email address." });
    }

    else {
        // This is to search the email in the database.
        Users.findOne({ email: email })
            .then(savedUser => {
                // If email is not registered.
                if (!savedUser) {
                    return res.status(401).json({ error: "The email you entered doesn't belong to an account. Please check your email and try again." });
                }

                // This is comparing the hashed password is it the same or not.
                bcrypt.compare(password, savedUser.password)
                    .then(doMatch => {
                        if (doMatch) {
                            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                            const { _id, username, email } = savedUser
                            return res.status(200).json({ token, user: { _id, username, email } });
                        }
                        else {
                            return res.status(401).json({ error: "Sorry, your password was incorrect." });

                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
    }

})


module.exports = router;
