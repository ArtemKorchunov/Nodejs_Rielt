let assignSeller =  require('../assignModel/Seller');
let dateConvert = require("../../../lib/dateConvert");
//todo make seller and customer without duplication like flat...
module.exports = (models,options = {}) => {
    options = [[options.name,options.type]];
    return models.Seller.findAll(
        {
            order: options
            ,raw : true
        }
    ).then(
        sellers => {
            return assignSeller(dateConvert(sellers));
        }
    )
};