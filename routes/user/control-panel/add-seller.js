exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/addSeller',
        {
            ColumnName: ['Name','Surname','Last name', 'Passport id', 'Birthday']
        }
    );
};