let dateConvert = require("../../lib/dateConvert");
module.exports = function(req, res, next) {
    let models  = req.app.get('models');
    //todo why do i need profile-null ???
    req.user_profile = res.locals.user_profile = null;
    let this_model = models.Profile;
    this_model.findAll({ where: {user_username: req.session.id_user}, limit : 1, raw: true}).then(
        profile => {
            req.user_profile = res.locals.user_profile = dateConvert(profile);
            next();
        },
        err => {
            next();
        }
    );
};