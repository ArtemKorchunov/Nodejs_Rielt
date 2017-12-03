exports.get = (req, res, next) => {
    res.render('admin/control-panel/sql');
};
exports.post =  (req,res,next) => {
    let sql = req.app.get('models').sequelize;
    let query = req.body.query;
    if (query.toLowerCase().indexOf('select') + 1){
        sql.query(query, { type: sql.QueryTypes.SELECT}).then(
            items => {
                if (items.length === 0){
                    res.status('403').send({message:"Nothing was found!"});
                }
                else {
                    res.send({result: items});
                }
            })
    }else {
        if (query.length == 0){
            res.status('403').send({message:"Please write something."});
        }else {
            res.status('403').send({message: "You don't have enough permission"});
        }
    }

};