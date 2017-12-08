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
        group: ['name','surname', 'pc_from_deal'],
        include: [
            {model: models.Soldout, attributes: [[sequelize.fn('SUM',sequelize.literal(`${sequelize.col('price_of_realty').col} * ${Profile.sequelize.col('pc_from_deal').col}*0.01`)),'sum_soldout_deals']],
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
            result = result.map(item => {
                return Object.assign(
                    {},
                    {
                        name: item.name,
                        surname: item.surname,
                        pc_from_deal: item.pc_from_deal,
                        sum_soldout_deals: item.Soldouts? Math.floor(Number(item.Soldouts[0].get('sum_soldout_deals'))) : 'empty'
                    }
                )
            });
            let resul = JSON.stringify(result);
            res.json(resul)
        },
        err => {
            res.send({})
        }

    )
};