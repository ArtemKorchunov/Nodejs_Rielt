module.exports = function (req, res, next) {
    if (!req.session.id_user || !req.user_profile) return next();
    req.user_profile.getUser(function (err, user) {
        if (err) next(err);
        req.user = res.locals.user = user;
        next();
    });
};