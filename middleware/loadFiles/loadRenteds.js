module.exports = (req,res,next) => {
    let models  = req.app.get('models');
    models.Rented.findAll({limit: 10}).then(
        items => {
            //todo refactor this
            res.locals.Cols = items;
            next();
        },
        err => {
            res.locals.Cols =  [];
            next()
        }
    );

};