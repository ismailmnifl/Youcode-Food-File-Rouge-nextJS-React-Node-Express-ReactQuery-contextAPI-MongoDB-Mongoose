const express = require('express');

const logger = require('morgan');

const Mongoose = require('mongoose');

const bodyParser = require('body-parser');

const session = require('express-session');

const dotenv = require('dotenv');

dotenv.config();

var cors = require('cors');

Mongoose.connect('mongodb://localhost/youcodeFood', () => {
    console.log('connected to mongoDB database');
});

const app = express();
app.use(cors());

//sessions setup 
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
//routes

const users = require('./routes/users');
const restaurant = require('./routes/restaurant');
const roles = require('./routes/roles');
const reviews = require('./routes/review');
const category = require('./routes/category');
const meal = require('./routes/meal');
const reservation = require('./routes/reservation');
const auth = require('./routes/auth');
const upload = require('./routes/upload');
const card = require('./routes/card');
const stats = require('./routes/stats');


//middleware

app.use(logger('dev'));
app.use(bodyParser.json());
dotenv.config();
app.use(express.static('static'))

//routes

app.use('/user', users);
app.use('/restaurant', restaurant);
app.use('/role', roles);
app.use('/review', reviews);
app.use('/category', category);
app.use('/meal', meal);
app.use('/reservation', reservation);
app.use('/auth', auth);
app.use('/upload', upload);
app.use('/card', card);
app.use('/stats', stats);


//catche 404 error and forward theme to the error handler

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler function

app.use((err, req, res, next) => {
    const status = err.status || 500;

    //respond to client

    res.status(status).json({
        error: {
            message: error.message
        }
    });

    //respond to ourselves

    console.error(err);
});

//start the server

const port = app.get('port') || 8000;

app.listen(port, () => {
    console.log(`server in listening on port ${port}`);
});