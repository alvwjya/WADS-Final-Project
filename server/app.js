const express = require('express')
const app = express()
const mongoose =require('mongoose')
const port = 4000
const {MONGOURI} = require('./keys')

require('./models/users')

app.use(express.json())
app.use(require('./routes/auth'))


const customMiddleware = (req,res,next)=> {
    console.log("middleware executed")
    next()
}


//It is used to all page
//app.use(customMiddleware)

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})

mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=> {
    console.log("connected to mongo")
} )

mongoose.connection.on('error',(err)=> {
    console.log("error", err)
} )

app.get('/', (req,res) => {
    console.log("home page")
    res.send("Hello world")
})

//specific page middleware 
app.get('/about', customMiddleware, (req,res) => {
    console.log("about page")
    res.send("About")
})

app.listen(port, ()=> {
    console.log("server is running on", port)
})