var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Category = require('./categoryModel');

var blogpostModel = new Schema({
    title: String,
    body: String,
    date: { type: Schema.Types.Date, default: new Date() },
    author: String,
    categories: [{ type: Schema.Types.ObjectId, ref: Category }]
});

module.exports = mongoose.model("Blogpost", blogpostModel);