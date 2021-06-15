

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const { MONGOURI } =  require('./keys');


const customMiddleware = (req, res, next) => {
    console.log("middleware executed");
    next();
}

// This is to connect to the mongoDB Atlas
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

});

// This is to print whether connect successfully or not to the mongoDB.
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

// This is only used for simple testing purposes.
app.get('/', (req, res) => {
    console.log("Welcome to Redgram");
    res.send("Hello World!!!");
})

app.get('/about', customMiddleware, (req, res) => {
    console.log("about page");
    res.send("About");
})

// This is used to show the port of the server.
app.listen(port, () => {
    console.log("Server is running on port: ", port);
})