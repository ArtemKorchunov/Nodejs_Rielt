exports.get = function(req, res, next) {
    if (req.url === "/user/settings" || req.url === "/user/settings/") {
        res.redirect("/user/settings/change-profile");
    }
    else {
        res.render('user/settings/change-profile');
    }
};
exports.post = function (req, res, next) {
    req.body.validate_obj['user_username'] = req.user.username;
    let models  = req.app.get('models');
    var Profile = models.Profile.build();
    var current_user = req.user;
    Profile.createUserProfile(req.body.validate_obj,current_user, function (err, profile) {
        if (profile === undefined) {
            let message = err.errors[0].message;
            res.status(403).send({message: message});
        }
        else {
            res.send('Your profile was changed!')
        }
    })
};