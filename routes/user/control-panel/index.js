exports.get = function(req, res, next) {
    if (req.url === "/user/control-panel"){
        res.redirect("/user/control-panel/add-flat");
    }
    res.render('user/control-panel/index');
};