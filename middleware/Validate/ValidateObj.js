let replace = require('../../public/js/replace.js').replace_objPurpes_PlusToLower;

module.exports = function(req, res, next) {
    let info = req.body;

    let validate_obj = {};
    req['all_filled'] = true;
    if ((req.url.indexOf('add-rented') + 1) || (req.url.indexOf('add-soldout') + 1)){
        for (let key in info){
            if (info[key] === "") {
                req['all_filled'] = false;
                break;
            } else {
                validate_obj[key] = String(info[key]) !== "null" ? info[key] : null;
            }
        }
    }
    else {
        for (let key in info) {
            if (info[key] === "" && key !== 'deal_id' && key !== 'solve_deal') {
                req['all_filled'] = false;
                break;
            } else if (key !== 'deal_id' && key !== 'solve_deal'){
                validate_obj[key] = info[key];
            }
        }
    }
    req['validate_obj'] = validate_obj;
    next();
};