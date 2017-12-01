var dateConvert = require("../../lib/dateConvert");
let assignRented = require('../../public/js/assignModel/joinRented');
module.exports = (req,res,next) => {
    let models  = req.app.get('models');
    let this_model = models.Rented;
    this_model.findAll(
        {
            limit: 10,
            include: [
                {model: models.Customer, attributes: ['name', 'surname', 'last_name']},
                {model: models.Flat, attributes: ['city', 'street', 'flat']},
                {model: models.Profile, attributes: ['name', 'surname']}
            ]
            ,raw : true
        }
    ).then(
        renteds => {
            //todo refactor this
            req.tableName = this_model.name;
            res.locals.Cols = assignRented(dateConvert(renteds));
            next();
        }
    );

};