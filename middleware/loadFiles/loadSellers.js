var dateConvert = require("../../lib/dateConvert");
module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Seller;
    this_model.findAll({limit: 10}).then(
        items => {
            if(req.url.indexOf('add-flat') + 1) {
                req.seller = res.locals.Sellers = items;
            } else {
                req.tableName = this_model.name;
                res.locals.Cols = dateConvert(items);
            }
            next();
        },
        err => {
            next();
        }
    );

};
