var express = require('express');

var routes = function (Category) {
    var categoryRouter = express.Router();

    var categoryController = require('./../controllers/categoryController')(Category);

    categoryRouter.route('/')
        .post(categoryController.post)
        .get(categoryController.get);

    return categoryRouter;
};

module.exports = routes;