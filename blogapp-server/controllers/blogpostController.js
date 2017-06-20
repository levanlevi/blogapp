var blogpostController = function (Blogpost) {

    var post = function (req, res) {
        var blogpost = new Blogpost(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {
            blogpost.save();
            res.status(201);
            res.send(blogpost);
        }
    };

    var get = function (req, res) {
        var query = {};
        if (req.query.genre) {
            query = req.query.genre;
        }
        Blogpost.find(query, function (err, blogposts) {
            if (err)
                res.status(500).send(err);
            else
                res.json(blogposts);
        });
    }


    // Middleware attached blogpost object. 
    // It is defined in blogspotRoutes.js
    var getById = function (req, res) {
        res.send(req.blogpost);
    };

    /**
     * Replaces object with fields provided in request
     */
    var putById = function (req, res) {
        req.blogpost.title = req.body.title;
        req.blogpost.body = req.body.body;
        req.blogpost.author = req.body.author;
        req.blogpost.date = req.body.date;
        req.blogpost.categories = req.body.categories;
        req.blogpost.save();
        res.json(req.blogpost);
    }
    /**
     * Updates by id. Maintains field value not included in request
     */
    var patchById = function (req, res) {
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
    }

    var deleteById = function (req, res) {
        req.blogpost.remove(function (err) {
            if (err)
                res.status(500).send();
            else
                res.status(204).send('Removed');
        });
    }


    return {
        post: post,
        get: get,
        getById: getById,
        putById: putById,
        patchById: patchById,
        deleteById: deleteById
    };

};

module.exports = blogpostController;