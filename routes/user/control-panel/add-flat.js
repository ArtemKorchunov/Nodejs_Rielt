exports.get = function(req, res, next) {
    if (req.url === "/user/control-panel" || req.url === "/user/control-panel/"){
        res.redirect("/user/control-panel/add-flat");
    } else {
        res.render('user/control-panel/forms/addFlat',
            {
                ColumnName: ['City', 'Street', 'Flat', 'Room amount', 'Stage', 'Total floors', 'Size', 'Owner']
            }
        );
    }
};