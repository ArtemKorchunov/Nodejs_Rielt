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
    var Profile = req.models.User_profile;
    /*User.createUser(username,password, function (err, user) {

        if (user === undefined) {res.status(403).send(err);}
        else {
            req.session.id_user = user.username;
            /!*var profile = {name: "fadfas", surname:"Sfakovich"};
            Profile.create(profile, function (err) {
            var d = arguments;
            //0 - null, 1 - obj с свойствами setUser getUser
            });*!/
            res.send("Вы вошли")
        }
    });*/
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
