var express = require('express');
var router = express.Router({mergeParams:true});
var Campus = require('../models/campus');
var Comment = require('../models/comment');
const comment = require('../models/comment');


//---------------------------------//
// COMMENT SECTION 
//---------------------------------//
router.get("/new", isLoggedIn,function(req, res){
    Campus.findById(req.params.id, function(err, campus){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campus: campus});
        }
    });
   
});

//POST
router.post("/",isLoggedIn, function(req, res){
    // look campus for id
    Campus.findById(req.params.id, function(err, campus){
        if(err){
            console.log(err);
            res.redirect("/campus");
        }
        else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    req.flash("error"," Something Went wrong")

                    console.log(err);
                }
                else{

                        //add username and save it for comment
                       //add username and id to comment
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        //save comment
                        comment.save();
                       campus.comments.push(comment);
                       campus.save();
                       req.flash("success","Successfully Added Comment")

                       res.redirect('/campus/'+ campus._id);

                }
            });
        }
    });
    // create new comments
});


router.get("/:comment_id/edit",checkCommentOwnership, function(req, res){
    comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {campus_id: req.params.id, comment: foundComment})
        }


    });

});

//UPDATE
router.put("/:comment_id", checkCommentOwnership,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
           // req.flash("error", err.message);
            res.redirect("/campus");
        } else {
            //req.flash("success","Successfully Updated!");
            res.redirect("/campus/" + req.params.id);
        }
    });
   // res.send("hello update route");
});

// DELETE COMMENT ROUTE
router.delete("/:comment_id",checkCommentOwnership,  function(req,res) {
    var commentId = req.params.comment_id;
    Comment.findByIdAndRemove(commentId, function(err) {
        if(err) {
            // console.log(err);
            // req.flash("error", err.message);
            res.redirect("back");
        } else {
            // Campground.findById(req.params.id, function(err, foundCampground) {
            //     var index = foundCampground.comments.indexOf(commentId); // Find the index location of the deleted comment using the ID value
            //     foundCampground.comments.splice(index,1); // Delete that ID from the Campground's comment array
            //     foundCampground.save(); // Save this state of the Database
            // });

             req.flash("success", "Successfully deleted comment");
            res.redirect("/campus/" + req.params.id);
        }
    });
});

function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
          if(err){
              res.redirect("back");
          }  else{
              if(foundComment.author.id.equals(req.user._id)){
                  next();
              }
              else{
                  res.redirect("back");
              }
          }
        });
    }
    else{
        res.redirect("back");
    }
}

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  }
  module.exports = router;
  