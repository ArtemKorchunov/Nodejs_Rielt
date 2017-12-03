let assignFlat = require('../assignModel/joinFlat');

module.exports = (models, options = []) => {
    return models.Flat.findAll(
        {
            order: options,
            include: [{model: models.Owner, attributes: ['surname', 'name', 'last_name','owner_id']}]
            ,raw : true
        }
    ).then(
        res => {
            return assignFlat(res);
        }
    )
};