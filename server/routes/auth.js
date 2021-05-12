const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.send("Hello")
})

router.post('/signup',(req,res) =>{
    const {username, email, password} = req.body
    if (! email || !password || !username) {
        res.json({error:"Please fill in all the required data"})
    }
    res.json({message:"successfully login"})
})

module.exports = router