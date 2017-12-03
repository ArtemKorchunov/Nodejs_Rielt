let assignOwner =  require('../assignModel/Owner');
let dateConvert = require("../../../lib/dateConvert");
//todo make owner and customer without duplication like flat...
module.exports = (models,options = {}) => {
    options = [[options.name,options.type]];
    return models.Owner.findAll(
        {
            order: options
            ,raw : true
        }
    ).then(
        owners => {
            return assignOwner(dateConvert(owners));
        }
    )
};