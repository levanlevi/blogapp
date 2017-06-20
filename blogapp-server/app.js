var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config'); // get our config file

var app = express();
const cors = require('cors');
app.use(cors());
app.options('*', cors());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



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
app.use('/api/categories', secureRouter);
app.post('/api/posts', secureRouter);
app.put('/api/posts/:blogpostId', secureRouter);
app.patch('/api/posts/:blogpostId', secureRouter);
app.delete('/api/posts/:blogpostId', secureRouter);

app.use('/api/posts', blogpostRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);

app.get('/', function (req, res) {
    res.send('welcome to blogapp api!');
});


app.listen(port, function () {
    console.log('application is running on port: ' + port);
});

module.exports = app;