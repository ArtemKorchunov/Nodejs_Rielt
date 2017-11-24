module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    req.user_profile = res.locals.user_profile = null;
    var User = req.models.User;
    var Profile = req.models.User_profile;
    if (!req.session.id_user) return next();
    User.find({ right_level: 1 }, function (err, users) {
        if (err) return next(err);

        res.locals.Users =  users;
    });
    User.find({username: req.session.id_user}, 1 , function (err, user) {
        if (err) return next(err);

        req.user = res.locals.user = user[0];

    });
    Profile.find({ user_username: req.session.id_user }, 1, function (err, user_profile) {
        if (err) return next(err);

        req.user_profile = res.locals.user_profile = user_profile[0];
        next();
    });
};