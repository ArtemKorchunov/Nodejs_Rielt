module.exports = function(req, res, next) {
    if(!Object.keys(req.query).length){
        return next()
    }
    let info = req.query;
    let profile_id = info['profile id'];
    delete info['profile id'];
    info['profile_id'] = profile_id;
    let validate_obj = {};
    let index_val;
    let models = req.app.get('models');
    let ket_models = Object.keys(models.Profile.attributes);
    for (let key in info){
        index_val = key.split(" ");
        let purp = index_val[0];
        let direction = index_val[1];
        if (info[key]) {
            if (purp === 'term_of_contract' || purp === 'term_of_rented') {
                if (direction === 'from') {
                    validate_obj[purp] = {
                        '$gte': info[key]
                    }
                }
                else if (direction === 'to') {
                    validate_obj[purp] = validate_obj[purp] === undefined ? {} : validate_obj[purp];
                    validate_obj[purp]['$lte'] = info[key];
                }
            }
            else if (Array.isArray(index_val) && index_val.length > 1) {
                info[key] = Number(info[key]);
                if (direction === "from") {
                    validate_obj[purp] = {
                        '$gte': info[key]
                    }
                }
                else {
                    validate_obj[purp] = validate_obj[purp] === undefined ? {} : validate_obj[purp];
                    validate_obj[purp]['$lte'] = info[key];
                }
            }
            else {
                validate_obj[key] = {$like: `%${info[key]}%`};
            }
        }
    }
    req.query['validate_obj'] = validate_obj;
    next();
};