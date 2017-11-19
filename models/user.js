var bcrypt = require('bcrypt');
var async = require('async');
const saltRounds = 10;
module.exports = function User(db) {
    var User = db.define("user", {
        username: {type: 'text', key: true},
        hashPassword: String,
        right_level: { type: "integer", defaultValue: 1 }
    }, {
        methods: {
            checkPassword: function (other_pass) {
                return bcrypt.compareSync(other_pass, this.hashPassword);
            }

        }
    });
    User.password = function(password, cb) {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                cb(hash);
            });
    };
    User.createUser = function (username, password, cb) {
        User.find({ username: username }, 1, function (err, item){
            if (item === undefined || item.length === 0) {
                User.password(password, function (hash) {
                    var user = {username: username, hashPassword: hash};
                    User.create(user, function (err) {
                        if (err) throw err;
                        console.log("create successful!");
                        cb(null,user);
                    });
                });
            }
            else {
                cb("Username already exist");
            }
        });
    };
    User.authorize = function (username, password, callback) {
        async.waterfall([
            function(callback) {
                User.find({ username: username }, 1, function (err, item) {
                    if(err) throw err;
                    console.log('checked username');
                    callback(null, item[0]);
                });
            },
            function(user, callback) {
                if (user) {
                    var solve = user.checkPassword(password);
                    if (solve) {
                        callback(null, user);
                    } else {
                        callback(null);
                    }
                }
                else {callback(null)}
            }
        ], callback);
    };
    return User;
};
