var models  = require('../models');

module.exports = (req, res, next) => {
    models.Soldout.findAll({limit: 10}).then(
        items => {
            res.locals.Cols = items;
            next();
        },
        err => {

        }
    );

};