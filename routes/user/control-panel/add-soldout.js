exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/add-soldout',
        {
            ColumnName: [['Price of realty','number'],['Term of lease', 'date'],['Deposit money','number'],['Customer'],['Flat'],['Agent']],
            tableName: req.tableName
        }
    );
};
exports.post = (req, res, next) => {
    let models  = req.app.get('models');
    if (req.all_filled){
        models.Soldout.create(req.validate_obj).then(
            item => {
                res.send({message:"Soldout has been created successful!" ,redir_to: "add-soldout"});
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