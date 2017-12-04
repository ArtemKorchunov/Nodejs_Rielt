var replace = require('../../public/js/replace.js').replace_objPurpes_PlusToLower;


module.exports = function(req, res, next) {
    if (req['all_filled']) {
        req['validate_obj'] = replace(req['validate_obj']);
    } else if (req['notall_filled']) {
        req.body['validate_obj'] = replace(req.body['validate_obj']);
    }
     next();
};