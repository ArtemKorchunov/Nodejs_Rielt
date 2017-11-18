module.exports = function(req, res, next) {
    if (!req.session.id_user) {
        return next(error);
    }

    next();
};