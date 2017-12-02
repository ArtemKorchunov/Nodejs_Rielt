

let findRented =  require('../../public/js/joinModelsFindAll/joinRented');

module.exports = (req,res,next) => {
    let models  = req.app.get('models');
    let this_model = models.Rented;
    findRented(models).then(
        renteds => {
            //todo refactor this
            req.tableName = this_model.name;
            res.locals.Cols = renteds;
            next();
        }
    );

};