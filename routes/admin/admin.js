var models  = require('../../models');

exports.get = function(req, res, next) {
    res.render('index');
};
exports.post = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let Agent = models.User.build();
    Agent.createUser(Agent,username,password,1, function (err, user) {
        if (user === undefined) {res.status(403).send(err);}
        else {
            res.send({})
        }
    });
};
