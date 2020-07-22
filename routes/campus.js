var express = require('express');
var router = express.Router();
var Campus = require('../models/campus');
const campus = require('../models/campus');

router.get("/", function(req, res){
    // get all campus from dbs
    Campus.find({}, function(err, allCampus){
        if(err){
            console.log(err);
        }else{
            res.render("campus/index", {campus:allCampus, currentUser: req.user });
        }
    });
   // 
});

router.get("/new",isLoggedIn, function(req, res){

    res.render("campus/new");

});

router.post("/",isLoggedIn, function(req, res){
    // data from form and add to campground
    var name= req.body.name ;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampus= {name: name, image: image, description:desc,author:author}
    //create a new campus and push it to db
    Campus.create(newCampus,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
             // redirect to campus
            res.redirect("/campus"); 
        }
    });

     
});

//SHOW ROUTES

router.get("/:id", function(req, res){
    //find campus with id
    Campus.findById(req.params.id).populate("comments").exec(function(err, foundCampus){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampus);
            res.render("campus/show", {campus: foundCampus});
        }
    });
    
    // render show template with that ca,pus
    
});

// EDIT - shows edit form for a campground
router.get("/:id/edit",isLoggedIn, checkCampusOwnership, function(req, res){
    //render edit template with that campground
    Campus.findById(req.params.id, function(err, foundCampus){
        // if(err){
        //     res.redirect("/campus");
        // }
        // else{
            
            res.render("campus/edit", {campus: foundCampus});
        // }
    });

});

    

  router.put("/:id",checkCampusOwnership, function(req, res){
   
      Campus.findByIdAndUpdate(req.params.id, req.body.campus, function(err, campus){
          if(err){
             // req.flash("error", err.message);
              res.redirect("/campus");
          } else {
              //req.flash("success","Successfully Updated!");
              res.redirect("/campus/" + campus._id);
          }
      });
    });
 
  
    router.delete("/:id",checkCampusOwnership, function(req, res) {
        Campus.findByIdAndRemove(req.params.id, function(err, campus) {
          if (err) {
           // req.flash("error", err.message);
           // return res.redirect("back");
           res.redirect("/campus");
          }
          else{
            res.redirect("/campus");

          }
        //   try {
        //    // await cloudinary.v2.uploader.destroy(campground.imageId);
        //    // campground.remove();
        //     res.redirect("/campus");
        //   } catch (err) {
        //     if (err) {
        //       req.flash("error", err.message);
        //       return res.render("error");
        //     }
        //   }
        });
      });


//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  }


  function checkCampusOwnership(req, res, next){
      if(req.isAuthenticated()){
          campus.findById(req.params.id, function(err, foundCampus){
            if(err){
                res.redirect("back");
            }  else{
                if(foundCampus.author.id.equals(req.user._id)){
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

module.exports = router;