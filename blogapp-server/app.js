var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User = require('./models/user'); // get our mongoose model

var app = express();

var db;
if (process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://127.0.0.1:27017/blogappDB_test');
else
    db = mongoose.connect('mongodb://127.0.0.1:27017/blogappDB'); //mongoose.connect(config.database); // connect to database

app.set('superSecret', config.secret); // secret variable

// use morgan to log requests to the console
app.use(morgan('dev'));

var Blogpost = require('./models/blogpostModel');
var Category = require('./models/categoryModel');



var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var blogpostRouter = require('./routes/blogpostRoutes')(Blogpost);
var categoryRouter = require('./routes/categoryRoutes')(Category);

app.use('/api/posts', blogpostRouter);
app.use('/api/categories', categoryRouter);

app.get('/', function (req, res) {
    res.send('welcome to blogapp api!');
});


// route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

app.get('/setupuser', function (req, res) {

    // create a sample user
    var nick = new User({
        name: 'testuser',
        password: 'test',
        admin: true
    });

    // save the sample user
    nick.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// route to return all users (GET http://localhost:8080/api/users)
app.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
app.post('/authenticate', function (req, res) {

    // find the user
    User.findOne({
        name: req.body.name
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'),{});
                    //{ expiresInMinutes: 1440 // expires in 24 hours }


                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});


app.listen(port, function () {
    console.log('application is running on port: ' + port);
});

module.exports = app;