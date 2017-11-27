module.exports = function(req, res, next) {
    var info = req.body;
    var validate_obj = {};
    for (var key in info){
        if (info[key] === "") {
            delete req.body[key];
        } else {
            validate_obj[key] = info[key];
        }
    }
    validate_obj['user_username'] = req.user.username;
    req.body['validate_obj'] = validate_obj;
    next();
};