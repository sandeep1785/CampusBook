var express= require("express");
var app= express();
var bodyParser = require("body-parser");
var mongoose= require("mongoose");
var Campus= require("./models/campus");
var seedDB = require("./seeds");
var Comment= require("./models/comment");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var  methodOverride = require("method-override");
var flash = require("connect-flash");
//Routes
var indexRoute = require('./routes/index'),
    campusRoute = require('./routes/campus'),
    commentRoute = require('./routes/comments');





mongoose.connect("mongodb://localhost/uiet_campus");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodOverride('_method'));
app.use(flash());

// to serve public directory
app.use(express.static(__dirname + "/public"));

 //  seedDB();
//PASSPORT CONFIGURATION===========
app.use(require('express-session')({
  secret: "Once Again!",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//for current user show
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");

    next();
  });


app.use("/campus",campusRoute);
app.use("/campus/:id/comments",commentRoute);
app.use(indexRoute);



app.listen(3500, function(){
    console.log("Server is Started");
});