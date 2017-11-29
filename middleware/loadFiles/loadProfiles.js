module.exports = (req,res,next) => {
    let models  = req.app.get('models');
    models.Profile.findAll({limit: 10}).then(
        items => {
            //todo refactor this
                res.locals.Profiles = items;

            next();
        },
        err => {
            res.locals.Cols =  [];
            next()
        }
    );

};