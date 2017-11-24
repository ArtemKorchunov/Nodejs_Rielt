exports.get = function(req, res, next) {
    if (req.url === "/admin/control-panel" || req.url === "/admin/control-panel/"){
        res.redirect("/admin/control-panel/add-user");
    }
    res.render('admin/control-panel/add-user');
};
//TODO create add-admin