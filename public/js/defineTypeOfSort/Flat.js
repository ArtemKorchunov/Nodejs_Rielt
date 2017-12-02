let findFlat =  require('../joinModelsFindAll/joinFlat');

module.exports = (models,options = {}) => {
    let type = options.type;
    let name = options.name;
    if (name === 'seller'){
        options = [
            [models.Seller, 'surname', type],
            [models.Seller, 'name', type],
            [models.Seller, 'last_name', type]
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