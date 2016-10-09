var express     = require('express');
var app         = express();
var path = __dirname + '/dist/';
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	  = require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./models/user'); // get the mongoose model
var port 	      = process.env.PORT || 4200;
var jwt 			  = require('jwt-simple');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path));
// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());
// pass passport for configuration
require('./config/passport')(passport);
//get the router
var routes = require('./routes/index');
app.use('/', routes);
// connect to database
mongoose.connect(config.database);
// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);
