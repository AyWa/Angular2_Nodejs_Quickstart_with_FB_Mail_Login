var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var fbStrategy = require('passport-facebook').Strategy;
// load up the user model
var User = require('../models/user');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
  var opts = {};
  console.log('passport export');
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  //{"data.email": jwt_payload.email} {id: jwt_payload.id}
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log('passport export');
    User.findOne({"data.email": jwt_payload.email},{data:'',profile:''},function(err, user) {
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
      clientSecret: config.FACEBOOK_APP_SECRET ,
      callbackURL: config.FACEBOOK_CALL_BACK,
      profileFields: ['id','first_name', 'last_name', 'picture.type(large)', 'emails', 'gender', 'birthday','location','friends']
    },
    function(accessToken, refreshToken, profile, cb) {

      console.log('****************************************************************');
      console.log(profile._json);
      console.log(profile._json.friends.data);
      console.log('****************************************************************');
      User.findOne(
        {'data.facebookId': profile.id},
        {'profile':'','data':''},
        function(err,user){
          if (err) return cb(err, '');
          else if(!user){
            //create user
            console.log('not user');
            my_user = new User;
            my_user.profile.firstName=profile._json.first_name;
            my_user.profile.lastName=profile._json.last_name;
            my_user.profile.birthDay=profile._json.birthday;
            my_user.profile.gender=profile._json.gender;
            my_user.profile.city=profile._json.location.name;
            my_user.profile.image=profile._json.picture.data.url;
            my_user.data.facebookId=profile._json.id;
            my_user.data.email=profile._json.email;
            //map les id
            var mesid=profile._json.friends.data.map(function(a){
              return a.id;
            })
            User.find(
              { 'data.facebookId' : { $in : mesid }
            },{id:''},function(err,alluser){return alluser}).then(function(alluser){
              console.log(alluser);
              alluser.map(function(usertmp){
                my_user.friends.accepted.push(usertmp._id);
              })
              my_user.save(function(err){
                //handle_friends(profile._json.friends.data,profile.id);
                if (err) return cb(err, my_user);
                else return cb(err, my_user);
              }).then(function(a){
                console.log('XXXXXXXU');
                a.friends.accepted.map(function(usertmp){
                  PersonModel.update(
                    { _id: usertmp._id },
                    { $push: { friends: a._id } },
                    done);
                    console.log('eeee');
                })
                console.log('XXXXXXXU');
              })
            });
          }
          else return cb(err, user);
        });
    }));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
