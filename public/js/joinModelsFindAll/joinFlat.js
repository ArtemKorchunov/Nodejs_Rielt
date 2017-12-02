let assignFlat = require('../assignModel/joinFlat');

module.exports = (models, options = []) => {
    return models.Flat.findAll(
        {
            order: options,
            include: [{model: models.Seller, attributes: ['surname', 'name', 'last_name']}]
            ,raw : true
        }
    ).then(
        res => {
            return assignFlat(res);
        }
    )
};