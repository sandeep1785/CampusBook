var express = require('express');
var router = express.Router();
var campus = require('../models/campus');
var User = require('../models/user');
var passport = require('passport');



// ROUTES ------------------------------------------------
router.get("/", function(req, res){
    res.render("landing");
});







//==============================//
// AUTH ROUTES //

router.get("/register",function(req,res){
    res.render('register');
  }) 
  
  
  //handle sing up logic
  router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
      if(err){
        req.flash("error",err.message);
        res.render("register");
      }else{
        passport.authenticate("local")(req,res,function(){
          req.flash("Success"," Welcome To CampBook" + user.username);

          res.redirect("/campus");
        })
      }
    })
  })



//LOGIN ROUTESS
//SHOW LOGIN FORM
router.get("/login",function(req,res){
  //req.flash("error", "Logged you IN ");
    res.render('login');
  })
  
router.post("/login",passport.authenticate("local",
        {
          successRedirect: "/campus",
          failureRedirect: "/login"
        }), function(req,res){
  
  });
  
  //logout
  router.get("/logout",function(req,res){
    req.logout();
    req.flash("success", "Logged you Out ");
    res.redirect("/campus")
  })
  
  //middleware
  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error"," You Have to Login First")

    res.redirect("/login");
  }


  module.exports = router;