exports.get = (req, res, next) => {
    res.render('user/control-panel/forms/add-rented',
        {
            ColumnName: [['Price for month','text'],['Term of rented','text'],['Full time','text'],['Customer'],['Flat'],['Seller']],
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
                res.status(403).send({message: 'All fields must be completed!'});
            }
        )
    } else {
        res.status(403).send({message: 'All fields must be completed!'});
    }
};