exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/add-soldout',
        {
            ColumnName: [['Price of realty','number'],['Term of lease', 'date'],['Deposit money','number']]
        }
    );
};
exports.post = (req, res, next) => {
    let models  = req.app.get('models');
    if (req.all_filled){
        models.Soldout.create(req.validate_obj).then(
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