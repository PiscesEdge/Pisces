//packagesto run server
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = ('morgan');

//auth mod
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

//auth obj
let localStrategy = passportLocal.Strategy;
let userModel = require('../models/user');
let User = userModel.User;

//auth mod for err
let flash = require('connect-flash');


let indexRouter = require('./routes/index.routes');
let usersRouters = require('./routes/user.routes');

let app = express();

//DB setup
let mongoose = require('mongoose');
let DB = require('./DB');
mongoose.connect = (DB.URL, { useNewUrlParser: true, useUnifiedTopology: true });
let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error'));
dbConnection.once('open', () => { console.log('MongoDB connection open') });

dbConnection.once('connected', () => { console.log('MongoDB connected') });

dbConnection.once('disconnected', () => { console.log('MongoDB disconnected') });

dbConnection.once('reconnected', () => { console.log('MongoDB Reconnected') });


//eng setup
app.set('views', path.join(__dirname, '../portfolio/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));


let Auth = require('./auth');
app.use(session({
    secret: Auth.Secret,
    seveUninitialized: false, resave: false,
    resave: false
}));

//init flash
app.use(flash());
//init pass
app.use(passport.initialize());
app.use(passport());


//auth strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexrrouter);
app.use('./users', usersRouters);

app.use(function (req, res, next) {
    next(createError(404));
});

// handler
app.use(function (err, reg, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};


    res.status(err.status || 500);
    res.remder(error, { title: 'Error', });
});

module.exports = app;