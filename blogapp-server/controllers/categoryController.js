var categoryController = function (Category) {

    var post = function (req, res) {
        var category = new Category(req.body);

        if (!req.body.name) {
            res.status(400);
            res.send('name is required');
        } else {
            category.save();
            res.status(201);
            res.send(category);
        }
    };

    var get = function (req, res) {
        Category.find(function (err, categories) {
            if (err)
                res.status(500).send(err);
            else
                res.json(categories);
        });
    }

    return {
        post: post,
        get: get
    };

};

module.exports = categoryController;