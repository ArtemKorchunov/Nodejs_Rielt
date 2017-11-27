var models = require('../../../models');
exports.get = function(req, res, next) {
    if (req.url === "/user/control-panel" || req.url === "/user/control-panel/"){
        res.redirect("/user/control-panel/add-flat");
    } else {
        res.render('user/control-panel/forms/add-flat',
            {
                ColumnName: [['City'], ['Street'], ['Flat'], ['Room amount','number'], ['Stage','number'], ['Total_floors','number'], ['Size','number']]
            }
        );
    }
};
exports.post = (req, res, next) => {
    if (req.all_filled){
        models.Flat.create(req.validate_obj).then(
            item => {

                res.send({});
            },
            err => {
                res.status(403).send('All fields must be completed!');
            }
        )
    } else {
        res.status(403).send('All fields must be completed!');
    }
};