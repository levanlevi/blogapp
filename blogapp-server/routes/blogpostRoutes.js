var express = require('express');

var routes = function (Blogpost) {
    var blogpostRouter = express.Router();

    var blogpostController = require('./../controllers/blogpostController')(Blogpost);

    blogpostRouter.route('/')
        .post(blogpostController.post)
        .get(blogpostController.get);

    blogpostRouter.use('/:blogpostId', function (req, res, next) {
        Book.findById(req.params.blogpostId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else if (book) {
                req.book = book;
                next();
            }
            else
                res.status(404).send('no book found');
        });
    });
    
    blogpostRouter.route('/:blogpostId')
        .get(function (req, res) {
            res.send(req.book);
        })
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.read = req.body.read;
            req.book.genre = req.body.genre;
            req.book.save();
            res.json(req.book);
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.book);
            })
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err)
                    res.status(500).send();
                else
                    res.status(204).send('Removed');
            });
        });


    return blogpostRouter;
};

module.exports = routes;