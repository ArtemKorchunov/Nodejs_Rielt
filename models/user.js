var bcrypt = require('bcrypt');
var async = require('async');
const uuidv4 = require('uuid/v4');
const saltRounds = 10;
module.exports = function User(db) {
    var Person = db.define("person", {
        id: String,
        username: String,
        hashPassword: String
    }, {
        methods: {
            checkPassword: function (other_pass) {
                return bcrypt.compareSync(other_pass, this.hashPassword);
            }

        }
    });
    Person.password = function(password, cb) {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                cb(hash);
            });
    };
    Person.createUser = function (username, password, cb) {
        Person.find({ username: username }, 1, function (err, item){
            if (item.length === 0) {
                Person.password(password, function (hash) {
                    var user = {id: uuidv4(), username: username, hashPassword: hash}
                    Person.create(user, function (err) {
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
    Person.authorize = function (username, password, callback) {
        async.waterfall([
            function(callback) {
                Person.find({ username: username }, 1, function (err, item) {
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
    return Person;
};
