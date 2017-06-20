var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config'); // get our config file

var app = express();

var db;
if (process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://127.0.0.1:27017/blogappDB_test');
else
    db = mongoose.connect('mongodb://127.0.0.1:27017/blogappDB'); //mongoose.connect(config.database); // connect to database

app.set('superSecret', config.secret); // secret variable

// use morgan to log requests to the console
app.use(morgan('dev'));


var User = require('./models/userModel'); // get our mongoose model
var Blogpost = require('./models/blogpostModel');
var Category = require('./models/categoryModel');

var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var secureRouter = require('./routes/secureRoutes')(app);
var blogpostRouter = require('./routes/blogpostRoutes')(Blogpost);
var categoryRouter = require('./routes/categoryRoutes')(Category);
var userRouter = require('./routes/userRoutes')(User);

app.use('/api/users', secureRouter);
//app.use('/api/posts', secureRouter);

app.use('/api/posts', blogpostRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);

app.get('/', function (req, res) {
    res.send('welcome to blogapp api!');
});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
app.post('/api/authenticate', function (req, res) {

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
                var token = jwt.sign(user, app.get('superSecret'), {});
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