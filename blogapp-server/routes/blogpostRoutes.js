var express = require('express');

var routes = function (Blogpost) {
    var blogpostRouter = express.Router();

    var blogpostController = require('./../controllers/blogpostController')(Blogpost);

    blogpostRouter.route('/')
        .post(blogpostController.post)
        .get(blogpostController.get);

    blogpostRouter.use('/:blogpostId', function (req, res, next) {
        Blogpost.findById(req.params.blogpostId, function (err, blogpost) {
            if (err)
                res.status(500).send(err);
            else if (blogpost) {
                req.blogpost = blogpost;
                next();
            }
            else
                res.status(404).send('no blogpost found');
        });
    });

    blogpostRouter.route('/:blogpostId')
        .get(function (req, res) {
            res.send(req.blogpost);
        })
        .put(function (req, res) { // replace with id
            req.blogpost.title = req.body.title;
            req.blogpost.body = req.body.body;
            req.blogpost.author = req.body.author;
            req.blogpost.date = req.body.date;
            req.blogpost.categories = req.body.categories;
            req.blogpost.save();
            res.json(req.blogpost);
        })
        .patch(function (req, res) { // update with id. maintains field value not included in request
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.blogpost[p] = req.body[p];
            }

            req.blogpost.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.blogpost);
            })
        })
        .delete(function (req, res) {
            req.blogpost.remove(function (err) {
                if (err)
                    res.status(500).send();
                else
                    res.status(204).send('Removed');
            });
        });


    return blogpostRouter;
};

module.exports = routes;