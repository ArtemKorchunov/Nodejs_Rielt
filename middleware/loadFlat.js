var models  = require('../models');

module.exports = (req, res, next) => {
    res.locals.Cols = null;
    models.Flat.findAll({limit: 20}).then(
        items => {
            if(req.url.indexOf('add-soldout') + 1) {
                res.locals.Flats = items;
            } else if (req.url.indexOf('add-rented') + 1) {
                res.locals.Flats = items;
            }
            else {
                res.locals.Cols = items;
            }
            next();
        }
    );

};
