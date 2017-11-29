module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Flat;
    this_model.findAll({limit: 20}).then(
        items => {
            if(req.url.indexOf('add-soldout') + 1) {
                res.locals.Flats = items;
            } else if (req.url.indexOf('add-rented') + 1) {
                res.locals.Flats = items;
            }
            else {
                req.tableName = this_model.name;
                res.locals.Cols = items;
            }
            next();
        }
    );

};
