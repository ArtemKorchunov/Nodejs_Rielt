exports.get = (req, res, next) => {
    res.render('user/control-panel/forms/add-rented',
        {
            ColumnName: [['Price for month','text'],['Full time','text'],['Term of rented','text'],['Customer'],['Flat'],['Agent']],
            tableName: req.tableName
        }
    );
};
exports.post = (req, res, next) => {
    let models  = req.app.get('models');
    if (req.all_filled){
        models.Rented.create(req.validate_obj).then(
            item => {
                res.send({message:"Rented has been created successful!" ,redir_to: "add-rented"});
            },
            err => {
                let path = err.errors[0].path;
                let message = err.errors[0].message;
                res.status(403).send({message: message, path: path});
            }
        )
    } else {
        res.status(403).send({message: 'All fields except customer must be completed!'});
    }
};