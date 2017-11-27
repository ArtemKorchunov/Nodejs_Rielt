exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/add-soldout',
        {
            ColumnName: [['Price of realty','number'],['Term of lease', 'date'],['Deposit money','number']]
        }
    );
};
exports.post = function(req, res, next) {
    res.render('user/control-panel/forms/add-soldout',
        {
            ColumnName: [['Price of realty','number'],['Term of lease', 'date'],['Deposit money','number']]
        }
    );
};