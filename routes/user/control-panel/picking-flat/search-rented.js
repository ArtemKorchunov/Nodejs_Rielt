

exports.get = function(req, res, next) {
    res.render('user/control-panel/search-forms/search-rented.ejs',
        {
            ColumnName: [ ['PassportId','text'],['Name','text'],['Surname','text'],['Last name','text'], ['Birthday','date'],['Price for month'],['Full time'],['Term of rented'] ,['City'], ['Street'],['Building'],['Room amount'],['Stage'],['Total floors'],['Size'],['Agent']],
            tableName: 'Rented'
        }
    );
};

