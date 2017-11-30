module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    let this_model = models.Flat;
    this_model.findAll(
        {
            include: [{model: models.Seller, attributes: ['name', 'surname', 'last_name']}]
            ,raw : true
        }
    ).then(flats => {
        req.tableName = this_model.name;
        res.locals.Cols = flats.map(flat => {
            return Object.assign(
                {},
                {
                    _id: flat.flat_id,
                    city: flat.city,
                    street: flat.street,
                    flat: flat.flat,
                    room_amount: flat.room_amount,
                    stage: flat.stage,
                    total_floors: flat.total_floors,
                    size: flat.size,
                    seller : `${flat['Seller.surname']} ${flat['Seller.name']} ${flat['Seller.last_name']}`
                }
            )
        });
        next()
    });

};
