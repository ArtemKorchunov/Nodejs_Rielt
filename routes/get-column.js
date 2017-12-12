let joinSoldout = require('../public/js/joinModelsFindAll/joinSoldout');
let joinRented = require('../public/js/joinModelsFindAll/joinRented');

let assignObj = {};
assignObj['Soldout'] = require('../public/js/assignModel/getColumnSoldout');
assignObj['Rented'] = require('../public/js/assignModel/getColumnRented');

let dateConvert = require("../lib/dateConvert");

exports.get = function (req, res, next) {
    let model = req.params.table_name;
    let id = req.params.id;
    let id_name = model.toLowerCase() + '_id';
    let searchId = {};
    searchId[id_name] = id;
    let models  = req.app.get('models');
    let this_model = models[model];
    this_model.findAll(
        {
            where: searchId,
            include: [
                {model: models.Customer},
                {model: models.Flat ,include:{model: models.Owner, attributes:['name','surname','last_name']}},
                {model: models.Profile},
            ],
            raw: true
        }
    ).then(
        result => {
            result = assignObj[model](dateConvert(result));
            res.send({obj: result, type: model});
        }
    );

};