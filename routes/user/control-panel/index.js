exports.get = function(req, res, next) {
    if (req.url === "/user/control-panel" || req.url === "/user/control-panel/"){
        res.redirect("/user/control-panel/add-flat");
    }
    res.render('user/control-panel/forms/addFlat',
        {
            addFlat: ['City','Street','Flat','Room amount','Stage','Total floors','Size','Owner']
        }
    );
};