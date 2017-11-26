exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/addRented',
        {
            ColumnName: ['Price for month','Term of lease','Full time', 'Сustomer', 'Agent','Flat']
        }
    );
};