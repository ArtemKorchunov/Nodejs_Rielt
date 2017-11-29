
module.exports = function(req, res, next) {
    let models  = req.app.get('models');
    req.user_profile = res.locals.user_profile = null;
    var Profile = models.Profile;
    Profile.findOne({ where: {user_username: req.session.id_user}}).then(
        profile1 => {
            req.user_profile = res.locals.user_profile = profile1;
            next();
        },
        err => {
            next();
        }
    );
};