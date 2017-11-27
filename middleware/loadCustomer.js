var models  = require('../models');

module.exports = (req, res, next) => {
    res.locals.Cols = null;
    models.Customer.findAll({limit: 10}).then(
        items => {
            if(req.url.indexOf('add-soldout') + 1) {
                res.locals.Customers = items;
            } else if (req.url.indexOf('add-rented') + 1) {
                res.locals.Customers = items;
            }
            else {
                res.locals.Cols = items;
            }

            next();
        }
    );

};
