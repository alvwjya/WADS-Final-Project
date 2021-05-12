const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const Users = mongoose.model("Users")

module.exports = (req,res,next) => {
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err) {
            return res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        Users.findById(_id).then(userdata => {
            req.Users = userdata
        })
        next() 
    })
}