var models  = require('../models');

module.exports = (req,res,next) => {
    models.Profile.findAll({
        where: {
            right_level: 1
        }
    }).then(
        items => {
            //todo refactor this
                res.locals.Profiles = items;

            next();
        },
        err => {
            res.locals.Cols =  [];
            next()
        }
    );

};