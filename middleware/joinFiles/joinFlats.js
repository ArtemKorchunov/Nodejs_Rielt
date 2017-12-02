let findFlat =  require('../../public/js/joinModelsFindAll/joinFlat');

module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Flat;
    findFlat(models).then(flats => {
        req.tableName = this_model.name;
        res.locals.Cols = flats;
        next()
    });

};
