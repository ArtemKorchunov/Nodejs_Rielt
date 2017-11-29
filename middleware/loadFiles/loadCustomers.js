var dateConvert = require("../../lib/dateConvert");
module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Customer;
    this_model.findAll({limit: 10}).then(
        items => {
            if(req.url.indexOf('add-soldout') + 1) {
                res.locals.Customers = items;
            } else if (req.url.indexOf('add-rented') + 1) {
                res.locals.Customers = items;
            }
            else {
                req.tableName = this_model.name;
                res.locals.Cols = dateConvert(items);
            }

            next();
        },
        err => {
            res.locals.Cols = null;
            next();
        }
    );

};
