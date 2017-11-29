var dateConvert = require("../../lib/dateConvert");
module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Soldout;
    this_model.findAll({limit: 10}).then(
        items => {
            req.tableName = this_model.name;
            res.locals.Cols = dateConvert(items);
            next();
        },
        err => {

        }
    );

};