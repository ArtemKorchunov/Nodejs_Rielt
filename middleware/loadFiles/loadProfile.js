var dateConvert = require("../../lib/dateConvert");
module.exports = function(req, res, next) {
    let models  = req.app.get('models');
    req.user_profile = res.locals.user_profile = null;
    let this_model = models.Profile;
    this_model.findAll({ where: {user_username: req.session.id_user}, limit : 1}).then(
        profile1 => {

            req.user_profile = res.locals.user_profile = dateConvert(profile1);
            next();
        },
        err => {
            next();
        }
    );
};