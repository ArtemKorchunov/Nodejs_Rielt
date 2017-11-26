exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/addSoldOut',
        {
            ColumnName: ['Price of realty','Term of lease','Deposit money','Сustomer', 'Agent','Flat']
        }
    );
};