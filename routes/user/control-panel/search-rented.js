let assignSearchRented =  require('../../../public/js/assignModel/searchRented');
let dateConvert = require("../../../lib/dateConvert");

exports.get = function(req, res, next) {
    res.render('user/control-panel/search-forms/search-rented.ejs',
        {
            ColumnName: [ ['PassportId','text'],['Name','text'],['Surname','text'],['Last name','text'], ['Birthday','date'],['Price for month'],['Full time'],['Term of rented'] ,['City'], ['Street'],['Building'],['Room amount'],['Stage'],['Total floors'],['Size'],['Agent']],
            tableName: 'Rented'
        }
    );
};

exports.post = function (req, res, next) {
    let models = req.app.get('models');
    let obj = req.body['validate_obj'];
    if (obj['full_time'].$like == "%1%"){
        obj['term_of_rented'] = {
            $eq : null
        }
    }
    models.Rented.findAll(
        {
            where: {
                'customer_id': null,
                'price_for_month': obj['price_for_month'] ? obj['price_for_month'] : {$gte: 0},
                'full_time': obj['full_time'] ? obj['full_time'] : {$gte: 0},
                'term_of_rented': obj['term_of_rented'] ? obj['term_of_rented'] : {$gte: '2017-01-01'}
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
                        'profile_id': obj['profile_id'] ? obj['profile_id'] : {$like: "%"},
                    }
                }
            ]
            , raw: true
        }
    ).then(
        matches => {
            let items = assignSearchRented(dateConvert(matches));
            res.send({result: items, type: 'rented'})
        },
        err => {
            res.status('403').send({message:"Something went wrong."});
        }
    );
};