import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dbConfig from './config/database.js';


mongoose.connect(dbConfig.url);

const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


app.use(session({ cookie: { maxAge: 60000 },
    secret: 'ashish41191',
    resave: false,
    saveUninitialized: false}));
app.use(flash());
// app.use(morgan('dev')); //log request to console dev mode
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// use connect-flash for flash messages stored in session
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('view options', {layout: false});

require('./config/passport')(passport);
require('./routes/routing')(app,passport);
require('./models/sockets')(io);


server.listen(port);
console.log('listening...' + port);
