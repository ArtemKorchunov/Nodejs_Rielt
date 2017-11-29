module.exports = (req, res, next) => {
    let models  = req.app.get('models');
    models.Soldout.findAll({limit: 10}).then(
        items => {
            res.locals.Cols = items;
            next();
        },
        err => {

        }
    );

};