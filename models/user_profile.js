module.exports = (sequelize, Datatypes) => {
    let User_profile = sequelize.define("Profile", {
        profile_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,15}$",'i'],
                    msg:  'User name must be higher than 1 symbol and lower 16'
                }
            }
        },
        surname: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,15}$",'i'],
                    msg:  'User surname must be higher than 1 symbol and lower 16'
                }
            }
        },
        birthday: {
            type: Datatypes.DATEONLY,
            validate: {
                isAfter: {
                    args: '1910-01-01',
                    msg: 'Your age must be higher than 1910-01-01'
                },
                isBefore: {
                    args: '2000-01-01',
                    msg: 'Your age must be lower than 2000-01-01'
                }
            }
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
                date = new Date(date);
                let day = date.getDate();
                day = day > 9 ? day: "0" + day;
                let month = Number(date.getMonth()) + 1;
                month = month > 9 ? month: "0" + month;
                return day + "." + month + "." + date.getFullYear();
            }
        },
        instanceMethods: {
            createUserProfile: (profile, user,models, cb) => {
                let username = user.username;
                models.Profile.findOne({ where: {user_username: username}}).then(item => {
                    if (!item || item.length === 0) {
                        User_profile.create(profile).then(
                            user_profile => {
                                console.log("profile was created!");
                                user.setProfile(user_profile);
                                cb(null, user_profile);
                            },
                            err => {
                                cb(err);
                            }
                        );
                    }
                    else {
                        item.update(profile).then(
                            item => {
                                cb(null, item);
                            },
                            err => {
                                cb(err);
                            }//data
                        )
                    }


                });
            }
        }
    });
    User_profile.associate = (models) => {
        models.Profile.belongsTo(models.User, {foreignKey: { name: "user_username"}});
        models.Profile.hasMany(models.Soldout, {foreignKey: { name: "profile_id", allowNull: false}});
        models.Profile.hasMany(models.Rented, {foreignKey: { name: "profile_id", allowNull: false}});
    };

    return User_profile;
};