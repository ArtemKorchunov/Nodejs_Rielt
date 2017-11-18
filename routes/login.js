var orm  = require('orm');
var config = require('../config');
exports.get = function(req, res, next) {
    if (req.session.id_user){
        res.redirect('/');
    }
    res.render('login', { title: 'Express' });
};
exports.post = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var User = req.models.User;

    /*User.createUser(username,password, function (err, user) {

        if (user === undefined) {res.status(403).send(err);}
        else {
            req.session.id_user = user.id;
            res.send("Вы вошли")
        }
    });*/
    User.authorize(username,password, function (err, user) {
        if (user === undefined) {res.status(403).send('Incorrect password');}
        else {
            req.session.id_user = user.id;
            res.send("Вы успешно вошли")
        }
    })
};
