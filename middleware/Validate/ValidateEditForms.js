module.exports = function(req, res, next) {
    var info = req.body;
    var validate_obj = {};
    for (var key in info){
        if (info[key] === "" && key !== "customer id") {
            delete req.body[key];
        } else if (key !== "customer id") {
            validate_obj[key] = info[key];
        } else {
            if (!info['customer id']) {
                validate_obj[key] = null;
            } else {
                validate_obj[key] = info[key]
            }

        }
    }
    req['notall_filled'] = true;
    req.body['validate_obj'] = validate_obj;
    next();
};