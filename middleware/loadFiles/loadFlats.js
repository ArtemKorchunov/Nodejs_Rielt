module.exports = (req, res, next) => {
    let type_service = (req.url.indexOf('add-soldout') + 1)? '1': '0';
    let models  = req.app.get('models');
    let this_model = models.Flat;
    this_model.findAll({limit: 20, where: {service: type_service}, raw: true}).then(
        items => {
            res.locals.Flats = items;
            next();
        }
    );

};
