exports.post = (req, res, next) => {
    let model = req.params.table_name;
    let models  = req.app.get('models');
    let this_model = models[model];
    this_model.findAll({where : req.body.validate_obj, raw: true, attributes: [model.toLowerCase()+ "_id"]}).then(
        (item) =>{
            let arr = {};
            let table_name = req.params.table_name.toLowerCase();
            let id_name = table_name + "_id";
            item.forEach(function (item) {
                item_id = item[id_name];
                arr['tr-column-id-'+ item_id] = item_id;
            });

            res.send({message: 'Something was found!', type : 'search', arr, from: `add-${table_name}`});
        },
        err => {
            res.status(403).send({message: 'Nothing was found!'});
        }
    );
//
};