module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    var User = req.models.User;
    if (!req.session.id_user) return next();
    User.find({ right_level: 1 }, function (err, users) {
        if (err) return next(err);
        res.locals.Users =  users;
    });
    User.find({ username: req.session.id_user }, 1, function (err, user) {
        if (err) return next(err);

        // все что допступно в res.local - доступно всем шаблонам

        req.user = res.locals.user = user[0];

        next();
    });
};