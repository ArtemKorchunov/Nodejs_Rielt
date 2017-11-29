
module.exports = (req, res, next) => {
    let models  = req.app.get('models');
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
        },
        err => {
            res.locals.Cols = null;
            next();
        }
    );

};
