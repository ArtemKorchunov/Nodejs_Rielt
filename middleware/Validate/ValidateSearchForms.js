module.exports = function(req, res, next) {
    var info = req.body;
    var profile_id = info['profile id'];
    delete info['profile id'];
    info['profile_id'] = profile_id;
    var validate_obj = {};
    let index_val;
    for (let key in info){
        index_val = key.split(" ");
        let purp = index_val[0];
        let direction = index_val[1];
        if (purp === 'term_of_contract' || purp === 'term_of_rented'){
            if (info[key] != '' && direction === 'from') {
                validate_obj[purp] = {
                    '$gte': info[key]
                }
            }
            else if (info[key] != '' && direction === 'to'){
                validate_obj[purp] = validate_obj[purp] === undefined ? {} : validate_obj[purp];
                validate_obj[purp]['$lte'] = info[key];
            }
        }
        else if (Array.isArray(index_val) && index_val.length > 1) {
            if (direction === "from") {
                info[key] = info[key] === "" ? 0 :  Number(info[key]);
                validate_obj[purp] = {
                    '$gte': Number(info[key])
                }
            }
            else if (info[key] !== ""){
                validate_obj[purp] = validate_obj[purp] === undefined ? {} : validate_obj[purp];
                validate_obj[purp]['$lte'] =  Number(info[key]);
            }
        }
        else {
            if (info[key] !== "") {
                validate_obj[key] = {$like: `%${info[key]}%`};
            }else {
                validate_obj[key] = {$like: '%'}
            }
        }
    }
    req.body['validate_obj'] = validate_obj;
    next();
};