module.exports = function(req, res, next) {
    var info = req.body;
    var validate_obj = {};
    for (var key in info){
        if (info[key] === ""&& key !== "cust id") {
            delete req.body[key];
        } else if (key !== "cust id") {
            validate_obj[key] = info[key];
        } else {
            validate_obj[key] = null;
        }
    }
    req['notall_filled'] = true;
    req.body['validate_obj'] = validate_obj;
    next();
};