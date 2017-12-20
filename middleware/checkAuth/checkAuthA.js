module.exports = function(req, res, next) {
    if (!req.session.id_user || req.user.right_level < 5) {
        let err = new Error('You don\'t have enough permissions.');
        err.status = 401;
        next(err);
    }

    next();
};