module.exports = (models, obj = {}, offset = 0) => {
    return models.Soldout.findAll(
        {
            offset: offset,
            where: {
                'customer_id': null,
                'deposit_money': obj['deposit_money'] ? obj['deposit_money'] : {$gte: 0},
                'price_of_realty': obj['price_of_realty'] ? obj['price_of_realty'] : {$gte: 0},
                'term_of_contract': obj['term_of_contract'] ? obj['term_of_contract'] : {$gte: '2017-01-01'}
            },
            include: [
                {
                    model: models.Flat,
                    where: {
                        'city': obj['city'] ? obj['city'] : {$like: "%"},
                        'street': obj['street'] ? obj['street'] : {$like: "%"},
                        'room_amount': obj['room_amount'] ? obj['room_amount'] : {$gte: 0},
                        'stage': obj['stage'] ? obj['stage'] : {$gte: 0},
                        'total_floors': obj['total_floors'] ? obj['total_floors'] : {$gte: 0},
                        'size': obj['size'] ? obj['size'] : {$gte: 0}
                    }
                },
                {
                    model: models.Profile, attributes: ['name', 'surname'],
                    where: {
                        'profile_id': obj['profile_id'] ? obj['profile_id'] : {$like: "%"}
                    }
                }
            ]
            , raw: true
        }
    )
};