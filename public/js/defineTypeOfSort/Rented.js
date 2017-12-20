let findRented =  require('../joinModelsFindAll/joinRented');

module.exports = (models,options = {}) => {
    let type = options.type;
    let name = options.name;
    name = name === 'agent'? 'profile' : name;
    if (name === 'customer'){
        options = [
            [models.Customer, 'surname', type],
            [models.Customer, 'name', type],
            [models.Customer, 'last_name', type],
        ];
    }
    else if(name === 'flat') {
        options = [
            [models.Flat, 'city', type],
            [models.Flat, 'street', type],
            [models.Flat, 'flat', type]
        ];
    }
    else if (name === 'profile'){
        options = [
            [models.Profile, 'name', type],
            [models.Profile, 'surname', type]
        ];
    }
    else {
        options = [[name,type]];
    }
    return findRented(models, options).then(
        res => {
            return res;
        }
    )
};