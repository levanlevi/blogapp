var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;
if (process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://127.0.0.1:27017/blogappDB_test');
else
    db = mongoose.connect('mongodb://127.0.0.1:27017/blogappDB');

var Blogpost = require('./models/blogpostModel');
var Category = require('./models/categoryModel');

var app = express();

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

app.listen(port, function () {
    console.log('application is running on port: ' + port);
});

module.exports = app;