var express     = require('express');
var app         = express();
var path        = require('path');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	  = require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./models/user'); // get the mongoose model
var port 	      = process.env.PORT || 4200;
var jwt 			  = require('jwt-simple');
var moment      = require('moment');
//initialize moment
moment().format();
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'dist')));
// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());
// pass passport for configuration
require('./config/passport')(passport);
//get the router
var routes = require('./routes/index');
app.use('/', routes);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname,'dist','index.html'));
});
// connect to database
mongoose.connect(config.database,function(){
  console.log('connect to DB');
  //mongoose.connection.db.dropDatabase();
});
// Start the server
app.listen(port);
console.log(':) watch out your app: http://localhost:' + port);
