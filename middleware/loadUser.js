module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    var person = req.models.person;
    if (!req.session.id_user) return next();

    person.find({ id: req.session.id_user }, 1, function (err, user) {
        if (err) return next(err);

        // все что допступно в res.local - доступно всем шаблонам

        req.user = res.locals.user = user[0];
        next();
    });
};