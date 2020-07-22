const Campus = require("../models/campus");
var Comment    = require("../models/comment");

// all middleware goes here
const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
      }
      req.flash("error"," You Need To Be Logged in To Do That")
      res.redirect("/login");
};

middlewareObj.checkCampusOwenership = function(req, res, next) {
    if(req.isAuthenticated()){
        campus.findById(req.params.id, function(err, foundCampus){
          if(err){
            req.flash("error"," Campus Not Found")

              res.redirect("back");
          }  else{
              if(foundCampus.author.id.equals(req.user._id)){
                  next();
              }
              else{
                req.flash("error"," You Need To Be Logged In To Do That")

                  res.redirect("back");
              }
          }
        });
    }
    else{
        req.flash("error"," You Need To Be Logged in To Do That")

        res.redirect("back");
    }
};

middlewareObj.checkCommentOwenership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
          if(err){
              res.redirect("back");
          }  else{
              if(foundComment.author.id.equals(req.user._id)){
                  next();
              }
              else{
                req.flash("error"," You Dont Have Permission  Do That")

                  res.redirect("back");
              }
          }
        });
    }
    else{
        res.redirect("back");
    }
};
  
module.exports = middlewareObj;