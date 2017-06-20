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
        .get(blogpostController.getById)
        .put(blogpostController.putById)
        .patch(blogpostController.patchById)
        .delete(blogpostController.deleteById);

    return blogpostRouter;
};

module.exports = routes;