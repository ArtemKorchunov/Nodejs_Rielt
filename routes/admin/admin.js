exports.get = function(req, res, next) {
    res.render('index');
};
exports.post = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var User = req.models.User;

    User.createUser(username,password, function (err, user) {
        if (user === undefined) {res.status(403).send(err);}
        else {
            res.send({})
        }
    });
};
