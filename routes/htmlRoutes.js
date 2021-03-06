var express = require("express");
var router = express.Router();
var DogController = require('../controllers/DogController')
var UserController = require('../controllers/UserController')
var RatingController = require('../controllers/RatingController')
var RentalController = require('../controllers/RentalController')
var authenticate = require('../middlewares/authenticator')

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/signUp", function (req, res) {
  if (req.session.user) {
    res.redirect('/gallery')
  } else {
    UserController.signup(req, res);
  }
});

router.get("/gallery", authenticate, function (req, res) {
  DogController.getAllDogs(req, res);
});
router.get("/create/dog", authenticate, function (req, res) {
  res.render('createDog')
});
router.get("/dog/:dogId/rate", authenticate, function (req, res) {
  console.log("DOG Rating hit");
  RatingController.rateDog(req, res);
});


router.get("/rentals", authenticate, function (req, res) {
  RentalController.getRentals(req, res);
});



router.get("/confirmation/:dogId", function (req, res) {
  // res.render("confirmation");
  // DogController.getSingleDog(req, res, function(data) {
  //   res.send(data);
  // });
  // Check Authentication before reserve 
  if (req.isAuthenticated())
    DogController.getSingleDog(req, res);
  else {
    res.redirect("/auth/google/callback");
  }
});

router.post("/filter", authenticate, function (req, res) {
  DogController.filterDogs(req, res)
});


router.get("/user-profile", function (req, res) {
  if (req.isAuthenticated())
    UserController.getUser(req, res);
  else {
    res.redirect("/auth/google/callback");
  }
});
router.get("/user-profile/:userId",authenticate, function (req, res) {
    UserController.getDogRatingByUser(req, res);
});


router.get("/privacy-policy", function (req, res) {
  res.render("privacyPolicy");
});

router.get("/sitemap", function (req, res) {
  res.render("sitemap");
});

module.exports = router;