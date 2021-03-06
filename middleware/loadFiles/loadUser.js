
module.exports = function(req, res, next) {
    let models  = req.app.get('models');
    req.user = res.locals.user = null;
    req.user_profile = res.locals.user_profile = null;
    let User = models.User;
    if (!req.session.id_user) return next();
    User.findById(req.session.id_user).then(user => {
        req.user = res.locals.user = user;
        next();
    });

};