let assignRented = require('../assignModel/joinRented');
let dateConvert = require("../../../lib/dateConvert");

module.exports = (models,options = []) => {
     return models.Rented.findAll(
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
            return assignRented(dateConvert(res));
        }
     )

};