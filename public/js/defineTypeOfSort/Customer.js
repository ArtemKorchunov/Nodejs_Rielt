let assignCustomer =  require('../assignModel/Customer');
let dateConvert = require("../../../lib/dateConvert");

module.exports = (models,options = {}) => {
    options = [[options.name,options.type]];
    return models.Customer.findAll(
        {
            order: options
            ,raw : true
        }
    ).then(
        customers => {
            return assignCustomer(dateConvert(customers));
        }
    )
};