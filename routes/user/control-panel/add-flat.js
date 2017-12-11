exports.get = function(req, res, next) {
    if (req.url === "/user/control-panel" || req.url === "/user/control-panel/"){
        res.redirect("/user/control-panel/add-flat");
    } else {
        res.render('user/control-panel/forms/add-flat',
            {
                ColumnName: [['City','text'], ['Street','text'],['Building','text'], ['Flat','text'], ['Room amount','number'], ['Stage','number'], ['Total_floors','number'], ['Size','number'],['Service'],['Owner']],
                tableName: req.tableName
            }
        );
    }
};
exports.post = (req, res, next) => {
    let models  = req.app.get('models');
    if (req.all_filled){
        models.Flat.create(req.validate_obj).then(
            item => {
                res.send({message:"Flat has been created successful!" ,redir_to: "add-flat"});
            },
            err => {
                let path = err.errors[0].path;
                let message = err.errors[0].message;
                res.status(403).send({message: message, path: path});
            }
        )
    } else {
        res.status(403).send({message: 'All fields must be completed!'});
    }
};