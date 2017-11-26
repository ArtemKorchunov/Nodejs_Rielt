let bcrypt = require('bcrypt');
let async = require('async');
const saltRounds = 10;
module.exports = (sequelize, Datatypes) => {
    var Op = sequelize.Op;
    const User = sequelize.define("User", {
        username: {
            primaryKey: true,
            allowNull: false,
            type: Datatypes.STRING
        },
        hashPassword: {
            type:Datatypes.STRING
        },
        right_level: {
            defaultValue: 1,
            type: Datatypes.INTEGER
        }
    } , {
        classMethods: {
            checkPassword: (other_pass, this_pass) => {
                return bcrypt.compareSync(other_pass, this_pass);
            }
        },
        instanceMethods: {
            password: (password, cb) => {
                bcrypt.hash(password, saltRounds,  (err, hash) => {
                    cb(hash);
                })
            },
            createUser : (User1,username, password, right_level = 1, cb) => {
                User.findById(username).then(
                    item => {
                        if (!item|| item.length === 0) {
                            User1.password(password, function (hash) {
                                let user = {username: username, hashPassword: hash, right_level: right_level ? right_level : 1};
                                User.create(user).then(
                                    item => {
                                        console.log("create successful!");
                                        cb(null, item);
                                    },
                                    error => {
                                        if (error) throw error;
                                    }
                                );
                            });
                        }
                    },
                    error => {
                        cb("Username already exist");
                    }
                )
            },
            authorize : (username, password, callback) => {
                async.waterfall([
                    (callback) => {
                        User.findById(username).then(
                            item => {
                                console.log('checked username');
                                callback(null, item);
                            },
                            error => {
                                if (error) throw error;
                            }
                        );
                    },
                    (user, callback) =>{
                        if (user) {
                            let solve = User.checkPassword(password,user.hashPassword);
                            if (solve) {
                                callback(null, user);
                            } else {
                                callback(null);
                            }
                        }
                        else {callback(null)}
                    }
                ], callback);
            }
        }
    });
    User.associate = (models) => {
        models.User.hasOne(models.Profile, {foreignKey: "user_username"})
    };

    return User;
};
