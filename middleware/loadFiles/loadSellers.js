var dateConvert = require("../../lib/dateConvert");
module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Seller;
    this_model.findAll({limit: 10, raw: true}).then(
        sellers => {
            if(req.url.indexOf('add-flat') + 1) {
                req.seller = res.locals.Sellers = sellers;
            } else {
                req.tableName = this_model.name;
                res.locals.Cols  = dateConvert(sellers).map(seller => {
                    return Object.assign(
                        {},
                        {
                            _id: seller.seller_id,
                            passportid: seller.passportid,
                            name: seller.name,
                            surname: seller.surname,
                            last_name: seller.last_name,
                            birthday: seller.birthday,
                        }
                    )
                });
            }
            next();
        }
    );

};
