let define_sort = require('../../../public/js/defineTypeOfSort/index');

exports.post = (req, res, next) => {
    let column = req.params.column_name.replace(/\s/ig,'_');
    let model = req.params.table_name;
    let type = req.params.sort_type;
    let models  = req.app.get('models');
    let this_model = models[model];
    let options = {name: column, type: type};
    define_sort(models,model,options).then(
        result => {
            res.send({result});
        },
        err => {
            res.send({});
        }
    )
};