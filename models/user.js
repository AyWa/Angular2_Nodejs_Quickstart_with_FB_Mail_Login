var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

//todo birthday //age based on birthday
var UserSchema = new Schema({
  // set up a mongoose model
  profile: {
    firstName: {type: String, trim: true, required: true },
    lastName: {type: String, trim: true, required: true },
    city: {type: String},
    phone: {type: String},
    birthDay: {type: Date, required: true},
    gender: {type: String, lowercase: true, enum: ["male","female","licorn"], required: true},
    age: {type: Number, min: 13, max: 120},
    image: {type: String,trim: true}
  },
  data: {
    email: { type: String, unique: true, lowercase: true, trim: true, required: true },
    facebookId: {type: String, lowercase: true, trim: true},
    password: {type: String, trim: true},
    passwordResetToken: {type: String},
    passwordResetExpires: {type: Date},
    isAdmin: {type: Boolean, required: true, default: false},
  },
  position: {
    lastPosition: {type: String}
  },
  preferences: {
    placeLiked: [{
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
      dateJoined: {type: Date, default: Date.now}
    }],
    placeDisLiked: [{
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
      dateJoined: {type: Date, default: Date.now}
    }]
  },
  friends:{
    accepted:[{
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      dateAccepted: {type: Date, default: Date.now}
    }],
    pending:[{
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      dateAccepted: {type: Date, default: Date.now}
    }]
  }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if(typeof user.data.facebookId !== 'undefined' && user.data.facebookId !== null){
      console.log('facebook save =>no bscrypt');
      return next();
    }
    else if (this.isModified('password') || this.isNew) {
        console.log('not facebook save ==> bscrypt');
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.data.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.data.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.data.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
