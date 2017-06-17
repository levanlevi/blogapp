var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var categoryModel = new Schema({
    name: { type: String },
    order: { type: Schema.Types.Number }
});

module.exports = mongoose.model('Category', categoryModel);