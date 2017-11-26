var profile_convert = require('../../../lib/profile_convert');

exports.get = function(req, res, next) {
    var date_convert = req.user_profile.$modelOptions.classMethods.date_convert;
    var converted = profile_convert(req.user_profile.dataValues,date_convert);
    var d = converted;
    res.render('user/settings/profile', { converted } );
};