exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/add-seller',
        {
            ColumnName: [ ['PassportId','text'],['Name','text'],['Surname','text'],['Last name','text'], ['Birthday','date']],
            tableName: req.tableName
        }
    );
};
exports.post = (req, res, next) => {
    let models  = req.app.get('models');
    if (req.all_filled){
        models.Seller.create(req.validate_obj).then(
            item => {
                res.send({message:"Seller has been created successful!" ,redir_to: "add-seller"});
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