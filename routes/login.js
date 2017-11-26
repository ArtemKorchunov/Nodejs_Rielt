var orm  = require('orm');
var config = require('../config');
var models  = require('../models');

exports.get = function(req, res, next) {
    if (req.session.id_user){
        res.redirect('/');
    }
    models.User.findById('admin').then( user => {
        if (!user || user.length === 0){
            var exampleA =  models.User.build();
            exampleA.createUser(exampleA,'admin','04061974', 5, function () {});
            var exampleU =  models.User.build();
            exampleU.createUser(exampleU,'user','04061974',1 , function (err) {})
        }
    });

    res.render('login', { title: 'Express' });
};
exports.post = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let User = models.User.build();
    let Profile = models.Profile.build();
    //TODO change session.id_user to .primary_key or .username
    User.authorize(username,password, function (err, user) {
        if (user === undefined) {res.status(403).send('Incorrect password');}
        else {
            req.session.id_user = user.username;
            if (user.right_level >= 5 ){
                res.send({reply : "Вы успешно вошли", admin: true })
            }
            else {
                res.send({reply : "Вы успешно вошли", user: true })
            }

        }
    })
};
