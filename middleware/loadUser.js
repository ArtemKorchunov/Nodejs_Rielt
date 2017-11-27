var models  = require('../models');

module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    req.user_profile = res.locals.user_profile = null;
    var User = models.User;
    var Profile = models.Profile;
    if (!req.session.id_user) return next();
    User.findById(req.session.id_user).then(user => {
        req.user = res.locals.user = user;
    });
    Profile.findOne({ where: {user_username: req.session.id_user}}).then(profile => {
        req.user_profile = res.locals.user_profile = profile;
        next();
    });
};