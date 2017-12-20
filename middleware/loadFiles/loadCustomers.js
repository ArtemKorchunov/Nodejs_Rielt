let dateConvert = require("../../lib/dateConvert");
let assignCustomer = require('../../public/js/assignModel/Customer');

module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Customer;
    this_model.findAll({limit: 10, raw: true}).then(
        customers => {
            if (req.url.indexOf('add-customer') + 1){
                req.tableName = this_model.name;
                res.locals.Cols  = assignCustomer(dateConvert(customers))
            }else {
                res.locals.Customers = customers;
            }
            next();
        },
        err => {
            res.locals.Cols = null;
            next();
        }
    );

};
