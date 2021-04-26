import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const connectionURL = 'mongodb+srv://alvian_wijaya:BmP4cD9ivFmdJK5@redgramdb.62yn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const port = process.env.PORT ||5000;

mongoose.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>app.listen(port, () => console.log('server running on port: ' + port)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);