// modules
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const db=require('./config/connection')
const session = require('express-session');
const cookieParser = require("cookie-parser");

const userRouter=require('./routes/user');
const adminRouter=require('./routes/admin');
// view engine setup

app.set('views', path.join(__dirname,'views'));
app.set('view engine','hbs');
 
//public path 
app.use(express.static(__dirname));
app.use("/javascript", express.static(path.join(__dirname + "/public/javascript")));


db.connect((err)=>{
    if(err) console.log("coonection error"+err)
    else console.log("database connected")
})

app.use(session({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
    resave: false,
}))

//to prevent storing cache
app.use((req, res, next) => {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next()
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRouter)
app.use('/admin',adminRouter)

app.use(cookieParser());



app.listen(5000,()=>{
    console.log("listening to port 5000")
});
