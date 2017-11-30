var dateConvert = require("../../lib/dateConvert");
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
            res.locals.Cols = dateConvert(renteds).map(rented => {
                return Object.assign(
                    {},
                    {
                        _id: rented.rented_id,
                        price_for_month: rented.price_for_month,
                        term_of_rented: rented.term_of_rented,
                        full_time: rented.full_time,
                        'cust id' : `${rented['Customer.surname']} ${rented['Customer.name']} ${rented['Customer.last_name']}`,
                        'flat id' : `${rented['Flat.city']} ${rented['Flat.street']} ${rented['Flat.flat']}`,
                        'profile id':`${rented['Profile.name']} ${rented['Profile.surname']}`
                    }
                )
            });
            next();
        }
    );

};