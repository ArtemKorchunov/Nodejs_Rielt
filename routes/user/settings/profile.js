let profile_convert = require('../../../lib/profile_convert');

exports.get = function(req, res, next) {
    let converted;
    if ( req.user_profile.length !== 0) {
        converted = profile_convert(req.user_profile[0]);
    } else { converted = { empty: "Profile is empty,"} }

    res.render('user/settings/profile', { converted } );
};