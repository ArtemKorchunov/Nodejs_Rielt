module.exports = function User_profile(db, models, enforce) {
    var User_profile = models.User.extendsTo("profile", {
        //username: {type: 'text',unique: true, key: true},
        name: {type:'text', size: 10},
        surname: {type:'text', size: 10},
        date_of_birth: {type:'date'},
        male : {type: "enum", values: ["M","F"]},
        work_location: {type:'text', size: 20},
        pc_from_deal: Number //todo don't see type="number"
    }, {
        methods : {
                date_convert: function(date) {
                    return date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
                }
            }
        }
    );
    User_profile.createUserProfile = function (profile,user, cb) {
        var username = user.username;
        User_profile.find({ user_username: username }, 1, function (err, item){
            if (item === undefined || item.length === 0) {
                User_profile.create(profile, function (err, user_profile) {
                    if (err) throw err;
                    //console.log("profile was created!");
                    user_profile.setUser(user, function () {});
                    cb(null,user_profile);
                });
            }
            else {
                User_profile.get(username, function (err, user_profile) {
                    for (var key in profile){
                        user_profile[key] = profile[key];
                    }
                    user_profile.save(function (err) {
                        if (err) {
                            var err = new Error('Somth went wrong with updating profile');
                            err.status = 401;
                            cb(err);
                        }
                    });
                    // user_profile.getUser(function (err, user) {
                    //     var d = arguments;
                    // });
                    //console.log("profile was changed!");
                    cb(null,user_profile);
                });
            }

        });
    };
    return User_profile;
};