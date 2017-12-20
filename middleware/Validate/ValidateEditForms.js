module.exports = function(req, res, next) {
    let info = req.body;
    let validate_obj = {};
    for (let key in info){
        if (info[key] === "") {
            delete req.body[key];
        } else {
            validate_obj[key] = String(info[key]) !== "null" ? info[key] : null;
        }
    }
    req['notall_filled'] = true;
    req.body['validate_obj'] = validate_obj;
    next();
};