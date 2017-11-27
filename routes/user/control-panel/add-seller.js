var models = require('../../../models');
exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/add-seller',
        {
            ColumnName: [ ['PassportId'],['Name'],['Surname'],['Last name'], ['Birthday','date']]
        }
    );
};
exports.post = (req, res, next) => {
    if (req.all_filled){
        models.Seller.create(req.validate_obj).then(
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