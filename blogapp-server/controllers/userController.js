var userController = function (User) {

    var post = function (req, res) {
        var newUser = new User(req.body);

        if (!req.body.name || !req.body.password) {
            res.status(400);
            res.send('name and passwrod are required');
        } else {
            newUser.save();
            res.status(201);
            res.send(newUser);
        }
    };

    var get = function (req, res) {
        User.find({}, function (err, users) {
            res.json(users);
        });
    }

    return {
        post: post,
        get: get
    };

};

module.exports = userController;