exports.get = (req, res, next) => {
    res.render('user/control-panel/forms/add-rented',
        {
            ColumnName: [['Price for month'],['Term of lease'],['Full time']]
        }
    );
};
exports.post = (req, res, next) => {
    let models  = req.app.get('models');
    if (req.all_filled){
        models.Rented.create(req.validate_obj).then(
            item => {
                res.send({text: "Rented "});
            },
            err => {
                res.status(403).send('All fields must be completed!');
            }
        )
    } else {
        res.status(403).send('All fields must be completed!');
    }
};