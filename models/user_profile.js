module.exports = (sequelize, Datatypes) => {
    let User_profile = sequelize.define("Profile", {
        id_profile: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING
        },
        surname: {
            type: Datatypes.STRING
        },
        date_of_birth: {
            type: Datatypes.DATE
        },
        male: {
            type: Datatypes.STRING(10)
        },
        work_location: {
            type: Datatypes.STRING
        },
        pc_from_deal: {
            type: Datatypes.FLOAT(10)
        }
    }, {
        classMethods: {
            date_convert : function (date) {
                return date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
            }
        },
        instanceMethods: {
            createUserProfile: (profile, user, cb) => {
                let username = user.username;
                User_profile.findOne({user_username: username}).then(item => {
                    if (!item || item.length === 0) {
                        User_profile.create(profile).then(
                            user_profile => {
                                console.log("profile was created!");
                                user.setProfile(user_profile);
                                cb(null, user_profile);
                            },
                            err => {
                                cb(null);
                            }
                        );
                    }
                    else {
                        item.update(profile).then(
                            item => {
                                cb(null, item);
                            },
                            err => {
                                cb(null);
                            }//data
                        )
                    }


                });
            }
        }
    });

    return User_profile;
};