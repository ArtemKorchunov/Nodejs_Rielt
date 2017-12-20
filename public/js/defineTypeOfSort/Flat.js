let findFlat =  require('../joinModelsFindAll/joinFlat');

module.exports = (models,options = {}) => {
    let type = options.type;
    let name = options.name;
    if (name === 'owner'){
        options = [
            [models.Owner, 'surname', type],
            [models.Owner, 'name', type],
            [models.Owner, 'last_name', type]
        ]
    }else {
        options = [[name,type]]
    }

    return findFlat(models, options).then(
        res => {
            return res;
        }
    )
};