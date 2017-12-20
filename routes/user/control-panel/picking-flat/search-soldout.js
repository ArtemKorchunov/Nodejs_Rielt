

exports.get = function(req, res, next) {
    res.render('user/control-panel/search-forms/search-soldout.ejs', {
        ColumnName: [['PassportId','text'],['Name','text'],['Surname','text'],['Last name','text'], ['Birthday','date'],['Price of realty'], ['Term of contract'], ['Deposit money'], ['City'], ['Street'],['Building'], ['Room amount'], ['Stage'], ['Total floors'], ['Size'], ['Agent']],
        tableName: 'Soldout'
    });
};
