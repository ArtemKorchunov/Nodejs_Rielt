var dateConvert = require("../../lib/dateConvert");
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
            res.locals.Cols = dateConvert(soldouts).map(soldout => {
                return Object.assign(
                    {},
                    {
                        _id: soldout.soldout_id,
                        price_of_realty: soldout.price_of_realty,
                        term_of_lease: soldout.term_of_lease,
                        deposit_money: soldout.deposit_money,
                        'cust id' : `${soldout['Customer.surname']} ${soldout['Customer.name']} ${soldout['Customer.last_name']}`,
                        'flat id' : `${soldout['Flat.city']} ${soldout['Flat.street']} ${soldout['Flat.flat']}`,
                        'profile id':`${soldout['Profile.name']} ${soldout['Profile.surname']}`
                    }
                )
            });
            next();
        }
    );

};