exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/addCustomer',
        {
            ColumnName: ['Name','Surname','Last name', 'Passport id', 'Birthday']
        }
    );
};