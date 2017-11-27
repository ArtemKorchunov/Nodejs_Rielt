var profile_convert = require('../../../lib/profile_convert');

exports.get = function(req, res, next) {
    let converted;
    if ( req.user_profile && req.user_profile.$modelOptions) {
        let date_convert = req.user_profile.$modelOptions.classMethods.date_convert;
        converted = profile_convert(req.user_profile.dataValues, date_convert);
    } else { converted = { empty: "Profile is empty,"} }

    res.render('user/settings/profile', { converted } );
};