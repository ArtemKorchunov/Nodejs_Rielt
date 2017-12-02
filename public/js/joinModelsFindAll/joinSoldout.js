let assignSoldout = require('../assignModel/joinSoldout');
let dateConvert = require("../../../lib/dateConvert");

module.exports = (models, options = []) => {
    return models.Soldout.findAll(
        {
            order: options,
            include: [
                {model: models.Customer, attributes: ['surname', 'name', 'last_name']},
                {model: models.Flat, attributes: ['city', 'street', 'flat']},
                {model: models.Profile, attributes: ['name', 'surname']}
            ]
            ,raw : true
        }
    ).then(
        res => {
            return assignSoldout(dateConvert(res));
        }
    )
};