var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var fbStrategy = require('passport-facebook').Strategy;
// load up the user model
var User = require('../app/models/user');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
  var opts = {};
  console.log('passport export');
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  //{"data.email": jwt_payload.email} {id: jwt_payload.id}
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log('passport export');
    User.findOne({"data.email": jwt_payload.email}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
  passport.use(new fbStrategy({
      clientID: config.FACEBOOK_APP_ID,
      clientSecret: config.FACEBOOK_APP_SECRET,
      callbackURL: 'http://mhurabielle.fr:443/auth/facebook/callback',
      profileFields: ['id','first_name', 'last_name', 'photos', 'emails', 'gender', 'birthday']
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log('****************************************************************');
      console.log(profile._json);
      console.log('****************************************************************');
      User.findOne({ 'data.facebookId': profile.id }, function (err, user) {
        if(!user){
          //create user
          console.log('create new user');
          var newUser = new User();
          newUser.data.facebookId = profile._json.id;
          newUser.data.email = profile._json.email;
          newUser.profile.gender = profile._json.gender;
          newUser.profile.firstName = profile._json.first_name;
          newUser.profile.lastName = profile._json.last_name;
          newUser.profile.birthDay = profile._json.birthday;
          console.log(newUser);
          newUser.save(function(err) {
            if (err) {
              return cb(err, '');
              throw err;
            }
            return cb(err, user);
          });
        }
        else{
          console.log('user find');
          return cb(err, user);
        }
      });
    }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
