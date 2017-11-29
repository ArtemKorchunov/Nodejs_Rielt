module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    models.Flat.findAll({limit: 20}).then(
        items => {
            if(req.url.indexOf('add-soldout') + 1) {
                res.locals.Flats = items;
            } else if (req.url.indexOf('add-rented') + 1) {
                res.locals.Flats = items;
            }
            else {
                res.locals.Cols = items;
                var dsagfdsa= items[0].attributes[0];
            }
            next();
        }
    );

};
