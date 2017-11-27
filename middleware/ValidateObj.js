var replace = require('../public/js/replace.js').replace_objPurpes_PlusToLower;

module.exports = function(req, res, next) {
    let info = req.body;
    let validate_obj = {};
    req['all_filled'] = true;
    for (let key in info){
        if (info[key] === "") {
            req['all_filled'] = false;
            break
        } else {
            validate_obj[key] = info[key];
        }
    }
    if (req['all_filled']) {
        validate_obj = replace(validate_obj);
    }
    req['validate_obj'] = validate_obj;
    next();
};