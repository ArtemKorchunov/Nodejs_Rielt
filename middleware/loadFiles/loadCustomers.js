var dateConvert = require("../../lib/dateConvert");
module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Customer;
    this_model.findAll({limit: 10, raw: true}).then(
        customers => {
            if(req.url.indexOf('add-soldout') + 1) {
                res.locals.Customers = customers;
            } else if (req.url.indexOf('add-rented') + 1) {
                res.locals.Customers = customers;
            }
            else {
                req.tableName = this_model.name;
                res.locals.Cols  = dateConvert(customers).map(customer => {
                    return Object.assign(
                        {},
                        {
                            _id: customer.cust_id,
                            passportid: customer.passportid,
                            name: customer.name,
                            surname: customer.surname,
                            last_name: customer.last_name,
                            birthday: customer.birthday,
                        }
                    )
                });
            }
            next();
        },
        err => {
            res.locals.Cols = null;
            next();
        }
    );

};
