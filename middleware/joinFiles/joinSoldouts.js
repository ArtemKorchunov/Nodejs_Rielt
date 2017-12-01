let dateConvert = require("../../lib/dateConvert");
let assignSoldout = require('../../public/js/assignModel/joinSoldout');
module.exports = (req,res,next) => {
    let models  = req.app.get('models');
    let this_model = models.Soldout;
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
        soldouts => {
            //todo refactor this
            req.tableName = this_model.name;
            res.locals.Cols = assignSoldout(dateConvert(soldouts));
            next();
        }
    );

};