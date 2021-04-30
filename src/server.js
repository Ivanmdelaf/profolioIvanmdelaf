const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const morgan = require('morgan');

const app = express();
require('./bbdd/bd');
//Setting
///////////////////////////////////////////////////////////
//View Setting
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
///////////////////////////////////////////////////////////

//Middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    saveUninitialized: false,
    resave : false,
    secret: 'myscretKey'
}));
app.use(flash(function (req, res, next) {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
}));
///////////////////////////////////////////////////////////
//Routes
app.use('/',require('./routers/profile'));
///////////////////////////////////////////////////////////
app.listen(3000,()=>{
    console.log('Server Runnign on port 3000');
})