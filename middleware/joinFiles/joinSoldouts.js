let findSoldout =  require('../../public/js/joinModelsFindAll/joinSoldout');

module.exports = (req,res,next) => {
    let models  = req.app.get('models');
    let this_model = models.Soldout;
    findSoldout(models).then(
        soldouts => {
            //todo refactor this
            req.tableName = this_model.name;
            res.locals.Cols = soldouts;
            next();
        }
    );

};