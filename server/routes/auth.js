const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Users = mongoose.model("Users")
const bcrypt = require('bcryptjs')

router.get('/',(req,res) => {
    res.send("Hello")
})

router.post('/signup',(req,res) =>{
    const {username, email, password} = req.body
    if (! email || !password || !username) {
        res.json({error:"Please fill in all the required data"})
    }
    res.json({message:"successfully login"})
    Users.findOne({username: username})
    .then ((savedUser) => {
        if (savedUser){
            return res.status(422).json({error:"username already exist. Please find another pne!"})
        }

        //put bigger number if you want it to become more secure
        bcrypt.hash(password,12)
        .then(hashedPassword => {
            const user = new Users({
                username, 
                email,
                password: hashedPassword
            })
            user.save()
            .then(user => {
                res.json({message: "Successfully on created an account"})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch (err =>{
            console.log(err)
        })
    })

        })
        


module.exports = router