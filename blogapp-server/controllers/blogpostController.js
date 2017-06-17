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

    return {
        post: post,
        get: get
    };

};

module.exports = blogpostController;