const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
//const { MONGOURI } = require('./keys');

/*
const customMiddleware = (req, res, next) => {
    console.log("middleware executed");
    next();
}


//It is used to all page
//app.use(customMiddleware)
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

});

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on('error', (err) => {
    console.log("error", err);
})



app.use(express.json())
require('./models/users');
require('./models/post');
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.use(require('./routes/search'));

*/

app.get('/', (req, res) => {
    console.log("Welcome to Redgram");
    res.send("Hello World!!!");
})
/*
app.get('/about', customMiddleware, (req, res) => {
    console.log("about page");
    res.send("About");
})
*/

app.listen(port, () => {
    console.log("Server is running on port: ", port);
})