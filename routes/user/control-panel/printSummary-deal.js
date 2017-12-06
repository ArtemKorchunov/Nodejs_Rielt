exports.post = (req,res,next) => {
    let models = req.app.get('models');
    let sequelize = models.sequelize;
    let Profile = models.Profile;
    models.Profile.findAll({
        where : {
            pc_from_deal: {
                $ne: null
            }
        }, attributes: ['name','surname','pc_from_deal'],
        include: [
            {model: models.Soldout, attributes: [[sequelize.fn('SUM',sequelize.literal(`${sequelize.col('price_of_realty').col} * ${Profile.sequelize.col('pc_from_deal').col}*0.01`)),'sum_soldout_deals']],
                group: 'profile_id',
                where:{
                    'customer_id': {
                        $ne: null
                    }
                }
            },
            {model: models.Rented, attributes: [[sequelize.fn('SUM',sequelize.literal(`${sequelize.col('price_for_month').col} * 0.5`)),'sum_soldout_deals']],
                group: 'profile_id',
                where:{
                    'customer_id': {
                        $ne: null
                    }
                }
            }
        ]
    }).then(
        result => {
            res.send({})
        },
        err => {
            res.send({})
        }

    )
};