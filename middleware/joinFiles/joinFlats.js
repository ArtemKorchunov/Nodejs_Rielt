let assignFlat = require('../../public/js/assignModel/joinFlat');
module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Flat;
    this_model.findAll(
        {
            include: [{model: models.Seller, attributes: ['name', 'surname', 'last_name']}]
            ,raw : true
        }
    ).then(flats => {
        req.tableName = this_model.name;
        res.locals.Cols = assignFlat(flats);
        next()
    });

};
