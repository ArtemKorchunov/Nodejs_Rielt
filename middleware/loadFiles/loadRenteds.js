var dateConvert = require("../../lib/dateConvert");
module.exports = (req,res,next) => {
    let models  = req.app.get('models');
    let this_model = models.Rented;
    this_model.findAll({limit: 10, raw: true}).then(
        items => {
            //todo refactor this
            req.tableName = this_model.name;
            res.locals.Cols = dateConvert(items);
            next();
        },
        err => {
            res.locals.Cols =  [];
            next()
        }
    );

};