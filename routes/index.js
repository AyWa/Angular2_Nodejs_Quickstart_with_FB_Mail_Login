var express   = require('express');
var passport  = require('passport');
var router    = express.Router();
var config    = require('../config/database'); // get db config file
var User      = require('../models/user'); // get the mongoose model
var jwt 			= require('jwt-simple');


router.get('/auth/facebook',passport.authenticate('facebook',{scope: ['email','user_birthday','user_location','user_friends']}));

router.get('/auth/facebook/callback',passport.authenticate('facebook',{ session: false, failureRedirect: '/'}),
  function(req, res) {
    var token = 'JWT '+jwt.encode(req.user.data, config.secret);
    res.redirect('/auth/facebook/callback/'+token);
});
// create a new user account (POST http://localhost:8080/api/signup)
router.post('/signin', function(req, res) {
  if (!newUserValid(req.body.newUser)) {
    console.log('wtf please name and pwd');
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User(req.body.newUser);
    // save the user
    console.log('create new user: ' + newUser);
    newUser.save(function(err) {
      if (err) {
        res.json({success: false, msg: 'Username already exists.'});
        throw err;
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
  User.findOne({
    "data.email": req.body.login.data.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      console.log('no user');
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      console.log('user');
      user.comparePassword(req.body.login.data.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          console.log('user & mdp same');
          var token = jwt.encode(user.data, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          console.log('user & mdp not same');
          return res.status(403).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var user=req.user;
  res.json({success: true, msg: 'Welcome in the member area ' + user.profile.firstName +' ' +user.profile.lastName + '!'});
});
router.post('/editprofile', passport.authenticate('jwt', { session: false}), function(req, res){
  var user=req.user;
  console.log(user);
  User.findOneAndUpdate(
    {"_id": req.user._id},
    {
      $set:{
        'profile.firstName' : req.body.new_user_profile.profile.firstName,
        'profile.lastName' : req.body.new_user_profile.profile.lastName,
        'profile.city' : req.body.new_user_profile.profile.city,
        'profile.phone' : req.body.new_user_profile.profile.phone,
      }
    },{new:true},//return the updated doc
    function(err,user_updated) {
      console.log(user_updated);
      if(err) res.json({success: false});
      else res.json({success: true,user_updated});
  });
});
router.get('/privateprofile', passport.authenticate('jwt', { session: false}), function(req, res) {
  var user=req.user.profile;
  res.json({success: true,user});
});
router.get('/myfriends', passport.authenticate('jwt', { session: false}), function(req, res){
  var user=req.user.profile;
  User.find({
    'friends': ''
  },function(err,friends){
    console.log('hey');
    console.log(friends)
    res.json({success: true,friends});
  })
});
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
newUserValid = function(newUser){
  if(profileValid(newUser.profile)&&dataValid(newUser.data)) return true;
  return false;
}
profileValid = function(userProfile){
  if(userProfile.firstName && userProfile.lastName && userProfile.birthDay && userProfile.gender ) return true;
  return false;
}
dataValid = function(userData) {
  if(userData.email && userData.password) return true;
  return false;
}
module.exports = router;
