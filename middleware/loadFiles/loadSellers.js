module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    models.Seller.findAll({limit: 10}).then(
        items => {
            if(req.url.indexOf('add-flat') + 1) {
                req.seller = res.locals.Sellers = items;
            } else {
                res.locals.Cols = items;
            }
            next();
        },
        err => {
            next();
        }
    );

};
