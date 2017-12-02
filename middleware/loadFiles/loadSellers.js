var dateConvert = require("../../lib/dateConvert");
let assignSeller = require('../../public/js/assignModel/Seller');
module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Seller;
    this_model.findAll({limit: 10, raw: true}).then(
        sellers => {
            if(req.url.indexOf('add-flat') + 1) {
                req.seller = res.locals.Sellers = sellers;
            } else {
                req.tableName = this_model.name;
                res.locals.Cols  = assignSeller(dateConvert(sellers));
            }
            next();
        }
    );

};
