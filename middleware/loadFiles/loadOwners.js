var dateConvert = require("../../lib/dateConvert");
let assignOwner = require('../../public/js/assignModel/Owner');
module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Owner;
    this_model.findAll({limit: 10, raw: true}).then(
        owners => {
            if(req.url.indexOf('add-flat') + 1) {
                req.owner = res.locals.Owners = owners;
            } else {
                req.tableName = this_model.name;
                res.locals.Cols  = assignOwner(dateConvert(owners));
            }
            next();
        }
    );

};
